"use client";
import { useState } from "react";
import Link from "next/link";
import type { Minggu } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

type Kunci = keyof Minggu;
const KOLOM: { kunci: Kunci; judul: string }[] = [
  { kunci: "minggu", judul: "Minggu" }, { kunci: "topik", judul: "Topik" }, { kunci: "cpmk", judul: "CPMK" },
  { kunci: "metode", judul: "Metode" }, { kunci: "status", judul: "Status" },
];
const PER_HALAMAN = 6;

export function DataTable({ rows }: { rows: Minggu[] }) {
  const [kunci, setKunci] = useState<Kunci>("minggu");
  const [arah, setArah] = useState<"asc" | "desc">("asc");
  const [halaman, setHalaman] = useState(1);

  const urut = [...rows].sort((a, b) => {
    const x = a[kunci], y = b[kunci];
    const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), "id");
    return arah === "asc" ? c : -c;
  });
  const totalHalaman = Math.max(1, Math.ceil(urut.length / PER_HALAMAN));
  const aktif = Math.min(halaman, totalHalaman);
  const tampil = urut.slice((aktif - 1) * PER_HALAMAN, aktif * PER_HALAMAN);

  const ubahUrut = (k: Kunci) => {
    if (k === kunci) setArah(arah === "asc" ? "desc" : "asc");
    else { setKunci(k); setArah("asc"); }
  };

  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {KOLOM.map((k) => (
                <th key={k.kunci} scope="col" aria-sort={kunci === k.kunci ? (arah === "asc" ? "ascending" : "descending") : "none"}>
                  <button className="link-btn" onClick={() => ubahUrut(k.kunci)}>
                    {k.judul} {kunci === k.kunci ? (arah === "asc" ? "▲" : "▼") : ""}
                  </button>
                </th>
              ))}
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tampil.length === 0 && <tr><td colSpan={6} className="muted">Tidak ada minggu yang cocok dengan filter.</td></tr>}
            {tampil.map((m) => (
              <tr key={m.minggu}>
                <td>{m.minggu}</td><td>{m.topik}</td><td>CPMK {m.cpmk}</td><td>{m.metode}</td>
                <td><StatusBadge status={m.status} /></td>
                <td><Link href={`/minggu/${m.minggu}`}>Detail</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="pager" aria-label="Paginasi tabel">
        <button className="btn" disabled={aktif === 1} onClick={() => setHalaman(aktif - 1)}>Sebelumnya</button>
        <span>Halaman {aktif} dari {totalHalaman}</span>
        <button className="btn" disabled={aktif === totalHalaman} onClick={() => setHalaman(aktif + 1)}>Berikutnya</button>
      </nav>
    </>
  );
}
