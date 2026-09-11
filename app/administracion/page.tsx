import { headers } from "next/headers";
import AdminClient from "../admin-client";

const API_INTERNAL_URL = process.env.API_INTERNAL_URL ?? "http://localhost:8080";
const sections = ["overview", "displays", "businesses", "batches", "stock"] as const;
type AdminSection = typeof sections[number];

async function hasSession() {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");
  if (!cookie) return false;
  try {
    const response = await fetch(`${API_INTERNAL_URL}/api/auth/me`, { headers: { cookie }, cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

export default async function Administration({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const params = await searchParams;
  const initialSection: AdminSection = sections.includes(params.section as AdminSection) ? params.section as AdminSection : "overview";
  return <AdminClient initialSession={await hasSession()} initialSection={initialSection} />;
}
