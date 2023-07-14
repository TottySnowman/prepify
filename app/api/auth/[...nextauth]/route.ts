import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../db_client"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.users.findUnique({
        where: {
          email: session.user?.email?.toString(),
        },
      });

      if (sessionUser != null && session.user) {
        session.user.id = sessionUser?.ID;
        session.user.username = sessionUser.username;
      }
      await prisma.$disconnect();
      return session;
    },
    async signIn({ user, profile }) {
      const userExists = await prisma.users.findUnique({
        where: {
          email: profile?.email,
        },
      });
      if (!userExists && profile) {
        const username = profile.name as string;
        await prisma.users.create({
          data: {
            email: profile.email as string,
            username: username.replace(" ", "").toLowerCase(),
            profile_picture: user.image ?? null,
            servings: 5,
          },
        });

        await prisma.$disconnect();
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
