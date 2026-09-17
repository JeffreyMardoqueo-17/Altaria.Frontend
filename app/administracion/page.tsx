import { headers } from "next/headers";
import AdminClient from "../admin-client";
import { apiClient } from "@/lib/api";

const sections = [
  "overview",
  "displays",
  "businesses",
  "batches",
  "stock",
] as const;

type AdminSection = (typeof sections)[number];

async function hasSession(): Promise<boolean> {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  if (!cookie) return false;

  try {
    // Uso apiClient centralizado, pasándole la cookie en los headers
    // y desactivando la caché para que siempre valide la sesión en tiempo real.
    await apiClient("/api/auth/me", {
      headers: { cookie },
      cache: "no-store",
    } as RequestInit);
    
    return true;
  } catch {
    return false;
  }
}

export default async function Administration({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const params = await searchParams;
  
  const initialSection: AdminSection = sections.includes(
    params.section as AdminSection
  )
    ? (params.section as AdminSection)
    : "overview";

  const isAuthenticated = await hasSession();

  return (
    <AdminClient
      initialSession={isAuthenticated}
      initialSection={initialSection}
    />
  );
}