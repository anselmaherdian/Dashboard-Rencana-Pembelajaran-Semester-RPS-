"use client";
import { useMemo, useState } from "react";
import type { RpsData, Status } from "@/lib/types";
import { terapkanStatus, useRpsStore } from "@/lib/store";
import { fmtPersen } from "@/lib/format";
import { KpiCard } from "./KpiCard";
import { FilterBar } from "./FilterBar";
import { DataTable } from "./DataTable";
import { ChartCard } from "./ChartCard";

export function Dashboard({ data }: { data: RpsData }) {
  const { overrides } = useRpsStore();
  const [q, setQ] = useState("");
  const [cpmk, setCpmk] = useState("semua");
  const [status, setStatus] = useState("semua");

  const minggu = useMemo(() => terapkanStatus(data.minggu, overrides), [data.minggu, overrides]);
  const rows = useMemo(() => {
    const kata = q.trim().toLowerCase();
    return minggu.filter((w) =>
      (cpmk === "semua" || String(w.cpmk) === cpmk) &&
      (status === "semua" || w.status === status) &&
      `${w.topik} ${w.metode}`.toLowerCase().includes(kata));
  }, [minggu, q, cpmk, status]);

  const hitung = (s: Status) => minggu.filter((w) => w.status === s).length;

  return (
    <>
      <h1>Dashboard RPS: Pengembangan Aplikasi Berbasis Web</h1>
      <section aria-labelledby="h-kpi">
        <h2 id="h-kpi">Ringkasan pelaksanaan</h2>
        <div className="grid kpis">
          <KpiCard label="Total pertemuan" value={String(minggu.length)} />
          <KpiCard label="Selesai" value={String(hitung("Selesai"))} />
          <KpiCard label="Berjalan" value={String(hitung("Berjalan"))} />
          <KpiCard label="Belum" value={String(hitung("Belum"))} />
          <KpiCard label="Kemajuan" value={fmtPersen(hitung("Selesai") / minggu.length)} />
        </div>
      </section>
      <section aria-labelledby="h-tabel">
        <h2 id="h-tabel">Rencana mingguan</h2>
        <FilterBar q={q} cpmk={cpmk} status={status} onQ={setQ} onCpmk={setCpmk} onStatus={setStatus} />
        <DataTable rows={rows} />
      </section>
      <section aria-labelledby="h-bobot">
        <h2 id="h-bobot">Distribusi bobot penilaian</h2>
        <ChartCard bobot={data.bobot} />
      </section>
    </>
  );
}
