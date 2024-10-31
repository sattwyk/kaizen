"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function useAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    isAuthenticated: session !== null,
  };
}
