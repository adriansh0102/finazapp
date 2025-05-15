import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    token?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      phone?: string;
      rol?: string;
      username?: string;
      status?: boolean;
      permissions?: string[];
      token?: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        
        id: {},
        name: {},
        email: {},
        phone: {},
        rol: {},
        username: {},
        status: {},
        permissions: {},
        token: {},
      },
      async authorize(credentials) {

        const user = {
          name: credentials?.name ?? '',
          id: credentials?.id ?? '',
          rol: credentials?.rol ?? '',
          email: credentials?.email ?? '',
          phone: credentials?.phone ?? '',
          username: credentials?.username ?? '',
          status: credentials?.status ?? '',
          permissions: credentials?.permissions ?? [],
          token: credentials?.token ?? ''
        }

        if (user) return user;
        else return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as object
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 10 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET
})
export { handler as GET, handler as POST }