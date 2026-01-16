// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { Resend } from "resend";
import { magicLinkHtml, magicLinkText } from "./email";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      // We’ll use Resend API instead of SMTP:
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // identifier = recipient email
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,          // e.g. "Mystiquill <no-reply@mystiquill.xyz>"
          to: identifier,
          subject: "Enter the Sanctum · Mystiquill",
          html: magicLinkHtml(url),
          text: magicLinkText(url),
          replyTo: "Ma’yá <mayasvisions@pm.me>"
        });
      },
      // These fields are still required by the type—but unused with API send:
      server: { host: "unused", port: 587, auth: { user: "unused", pass: "unused" } },
      from: process.env.EMAIL_FROM!
    })
  ],
  callbacks: {
    async session({ session, user }) {
      (session as any).role = (user as any).role ?? "USER";
      return session;
    }
  }
};

export const mystiquillAuthOptions = authOptions;
