import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@company.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = (await prisma.user.findUnique({
          where: { email },
        })) as {
          id: string;
          name: string | null;
          email: string | null;
          password: string | null;
          emailVerified: Date | null;
        } | null;

        if (!user || !user.password) return null;

        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
