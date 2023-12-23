import { type DefaultSession } from "next-auth";
import { users } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: users &
      DefaultSession["user"] & {
        accessToken: string;
      };
  }
  interface User {
    ID: number;
    username: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: users & DefaultSession["user"];
  }
}
