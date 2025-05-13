import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    token?: string;
    user?: {
      id?: string;
      roles?: string;
      access?: string;
      accessTokenExpiresIn?: string;
      email?: string;
      avatar?: string;
      full_name?: string;
      refresh?: string;
      permissions?: string[];
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
        roles: {},
        username: {},
        password: {},
        id: {},
        access: {},
        accessTokenExpiresIn: {},
        email: {},
        avatar: {},
        full_name: {},
        refresh: {},
        permissions: {}
      },
      async authorize(credentials) {

        const user = {
          id: credentials?.id ?? '',
          roles: credentials?.roles ?? '',
          access: credentials?.access ?? '',
          accessTokenExpiresIn: credentials?.accessTokenExpiresIn ?? '',
          email: credentials?.email ?? '',
          avatar: credentials?.avatar ?? '',
          full_name: credentials?.full_name ?? '',
          refresh: credentials?.refresh ?? '',
          permissions: credentials?.permissions ?? []
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