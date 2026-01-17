// packages/lib/auth.ts

import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Resend } from "resend";

import { prisma } from "./db";
import { magicLinkHtml, magicLinkText } from "./email";

/**
 * Lazily create Resend.
 * This MUST NOT run at import time.
 */
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
  },

  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        const resend = getResend();

        // Build-safe: email is optional
        if (!resend) {
          console.warn(
            "[Auth] Email disabled — RESEND_API_KEY not set"
          );
          return;
        }

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: "Enter the Sanctum · Mystiquill",
          html: magicLinkHtml(url),
          text: magicLinkText(url),
          replyTo: "Ma’yá <mayasvisions@pm.me>",
        });
      },

      /**
       * Required by NextAuth types but unused
       * when sendVerificationRequest is overridden.
       */
      server: {
        host: "unused",
        port: 587,
        auth: { user: "unused", pass: "unused" },
      },

      from: process.env.EMAIL_FROM!,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      (session as any).role = (user as any).role ?? "USER";
      return session;
    },
  },
};

export const mystiquillAuthOptions = authOptions;