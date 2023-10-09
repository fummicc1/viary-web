import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { cert } from "firebase-admin/app";

export default function AuthOptions(): NextAuthOptions {
  return {
    session: { strategy: "jwt" },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    adapter: FirestoreAdapter({
      namingStrategy: "snake_case",
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    }),
    callbacks: {
      jwt: async ({ token, user, account, profile, isNewUser }) => {
        console.log("in jwt", { token, user, account, profile });
        if (user) {
          token.user = user;
          const u = user as any;
          token.role = u.role;
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
    },
  };
}
