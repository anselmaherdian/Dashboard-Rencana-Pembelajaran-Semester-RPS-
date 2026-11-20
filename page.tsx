import { Dashboard } from "@/components/Dashboard";
import { getRps } from "@/lib/data";

// ISR: halaman dibuat statis, diperbarui ulang tiap 1 jam.
export const revalidate = 3600;

export default async function HomePage() {
  const data = await getRps();
  return <Dashboard data={data} />;
}
