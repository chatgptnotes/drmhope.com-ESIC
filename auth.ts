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
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        try {
          console.log('Auth attempt started');
          console.log('Credentials received:', { email: credentials?.email });

          if (!credentials?.email || !credentials.password) {
            console.log('Missing credentials');
            return null;
          }

          console.log('Checking database for user:', credentials.email);
          
          const { data: user, error: dbError } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (dbError) {
            console.error('Database error:', dbError);
            return null;
          }

          if (!user) {
            console.log('User not found');
            return null;
          }

          console.log('User found:', { email: user.email, role: user.role });

          if (!user.password_hash) {
            console.log('No password hash found');
            return null;
          }

          const valid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          console.log('Password validation:', valid);

          if (valid) {
            return {
              id: String(user.id),
              email: user.email,
              role: user.role,
            };
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

// Export the handlers separately for route.ts
export const { handlers: { GET, POST } } = handler;

// Export the middleware and auth utilities
export const { auth: authMiddleware, signIn, signOut } = handler;