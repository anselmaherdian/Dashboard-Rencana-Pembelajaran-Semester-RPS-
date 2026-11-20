import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { RpsProvider } from "@/lib/store";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard RPS | Pengembangan Aplikasi Berbasis Web",
  description: "Pantau rencana pembelajaran 16 minggu, keterkaitan CPMK, status pelaksanaan, dan bobot penilaian.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <a href="#isi" className="skip">Lewati ke konten utama</a>
        <RpsProvider>
          <header className="topbar">
            <Link href="/" className="brand">RPS Monitor</Link>
            <ThemeToggle />
          </header>
          <main id="isi">{children}</main>
        </RpsProvider>
      </body>
    </html>
  );
}
