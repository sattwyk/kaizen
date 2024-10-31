import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import "dotenv/config";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/google",
    },
  },
});
