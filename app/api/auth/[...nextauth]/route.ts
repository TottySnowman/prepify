import NextAuth, { Account, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prismaClient } from "../../db_client";
import { SignJWT } from "jose";
import { getJwtSecretKey, signJWTAccessToken } from "@/utils/jwtFunctions";
import type { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

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
      /* const sessionUser = await prismaClient.users.findUnique({
        where: {
          email: session.user?.email?.toString(),
        },
      });
      if (sessionUser != null && session.user) {
        session.user.ID = sessionUser.ID;
        session.user.username = sessionUser.username;
      }
      await prismaClient.$disconnect(); */

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
async function createToken(userID: number, userName: string) {
  const tokenValue = await new SignJWT({
    id: userID,
    username: userName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getJwtSecretKey());

  return tokenValue;
}

export { handler as GET, handler as POST };

// Use it in server contexts
export async function auth(
  req: NextApiRequest,
  res: NextApiResponse,
  config: NextAuthOptions
) {
  return getServerSession(req, res, config);
}
