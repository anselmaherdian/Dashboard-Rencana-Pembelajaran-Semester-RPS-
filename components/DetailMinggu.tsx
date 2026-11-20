"use client";
import { useState } from "react";
import Link from "next/link";
import { DAFTAR_STATUS, type Minggu, type Status } from "@/lib/types";
import { useRpsStore } from "@/lib/store";
import { fmtTanggal } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import { CatatanForm } from "./CatatanForm";

export function DetailMinggu({ minggu }: { minggu: Minggu }) {
  const { overrides, setStatus, addCatatan } = useRpsStore();
  const [pesan, setPesan] = useState("");
  const status = overrides.status[minggu.minggu] ?? minggu.status;
  const daftar = overrides.catatan[minggu.minggu] ?? [];

  const ubahStatus = (s: Status) => {
    setStatus(minggu.minggu, s);
    setPesan(`Status minggu ${minggu.minggu} berhasil diubah menjadi ${s}.`);
  };

  return (
    <>
      <p><Link href="/">← Kembali ke dashboard</Link></p>
      <h1>Minggu {minggu.minggu}: {minggu.topik}</h1>
      <section className="card" aria-labelledby="h-info">
        <h2 id="h-info">Informasi</h2>
        <dl>
          <dt>CPMK</dt><dd>CPMK {minggu.cpmk}</dd>
          <dt>Metode</dt><dd>{minggu.metode}</dd>
          <dt>Status</dt><dd><StatusBadge status={status} /></dd>
        </dl>
        <label>Ubah status
          <select value={status} onChange={(e) => ubahStatus(e.target.value as Status)}>
            {DAFTAR_STATUS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <p role="status" className="success">{pesan}</p>
      </section>
      <section className="card" aria-labelledby="h-form">
        <h2 id="h-form">Catatan realisasi pertemuan</h2>
        <CatatanForm onSubmit={(c) => addCatatan(minggu.minggu, c)} />
      </section>
      <section aria-labelledby="h-riwayat">
        <h2 id="h-riwayat">Riwayat catatan</h2>
        {daftar.length === 0 && <p className="muted">Belum ada catatan untuk minggu ini.</p>}
        {daftar.map((c, i) => (
          <article key={i} className="card">
            <h3>{fmtTanggal(c.tanggal)}, ketercapaian {c.persen}%</h3>
            <p>{c.realisasi}</p>
            {c.kendala && <p className="muted">Kendala: {c.kendala}</p>}
          </article>
        ))}
      </section>
    </>
  );
}
