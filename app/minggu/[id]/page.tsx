import { notFound } from "next/navigation";
import { DetailMinggu } from "@/components/DetailMinggu";
import { getRps } from "@/lib/data";

// SSG: 16 halaman detail dibuat saat build.
export async function generateStaticParams() {
  const data = await getRps();
  return data.minggu.map((m) => ({ id: String(m.minggu) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: `Minggu ${id} | Dashboard RPS` };
}

export default async function MingguPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getRps();
  const minggu = data.minggu.find((m) => m.minggu === Number(id));
  if (!minggu) notFound();
  return <DetailMinggu minggu={minggu} />;
}
