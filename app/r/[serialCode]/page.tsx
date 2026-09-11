import PublicDisplayPage from "../../display/page";

export default async function StableQrRoute({ params }: { params: Promise<{ serialCode: string }> }) {
  const { serialCode } = await params;
  return <PublicDisplayPage initialSerialCode={serialCode} />;
}