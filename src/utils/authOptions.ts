import { prisma } from "@/config/dbConfig";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/authenticate",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );
        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
};
