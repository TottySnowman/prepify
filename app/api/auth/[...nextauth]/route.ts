import NextAuth, { Account, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prismaClient } from "../../db_client";
import { signJWTAccessToken, verifyJwt } from "@/utils/jwtFunctions";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      if (!(await verifyJwt(token.accessToken as string))) {
        session.user = undefined;
        return session;
      }
      session.user = token as any;

      return session;
    },
    async signIn({ user, profile }) {
      const userExists = await prismaClient.users.findUnique({
        where: {
          email: profile?.email,
        },
      });

      if (!userExists && profile) {
        const username = profile.name;
        await prismaClient.users.create({
          data: {
            email: profile.email as string,
            username: username?.replace(" ", "").toLowerCase() as string,
            profile_picture: user.image ?? null,
            servings: 5,
          },
        });
        const newCreatedUser = await prismaClient.users.findUnique({
          where: {
            email: profile?.email,
          },
        });
        user.username = username?.replace(" ", "").toLowerCase() as string;
        user.accessToken = signJWTAccessToken(newCreatedUser!);
        user.image = newCreatedUser?.profile_picture;
      } else if (userExists && profile) {
        user.username = userExists.username;
        user.accessToken = signJWTAccessToken(userExists);
        user.image = userExists.profile_picture;
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
