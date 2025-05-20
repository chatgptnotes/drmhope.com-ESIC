import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseAdmin";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (user && user.password_hash && credentials.password) {
            const valid = await bcrypt.compare(
              credentials.password,
              user.password_hash
            );
            if (valid) {
              return {
                id: String(user.id),
                email: user.email,
                role: user.role,
              };
            }
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "IMQYhPXxOTOgU90xDPS0zhpPWHiQvsmj6vR29cPLmUU=",
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

const handler = NextAuth(authConfig);
export const { auth, signIn, signOut } = handler;