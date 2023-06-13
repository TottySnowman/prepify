import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: Number;
        email: String;
  username: String;
  image?: String;
  mealprep: string
    } & DefaultSession['user'];
  }
}