"use client";
import { useState } from "react";
import type { Catatan } from "@/lib/types";

const KOSONG = { tanggal: "", realisasi: "", persen: "", kendala: "" };
type Isi = typeof KOSONG;

function validasi(v: Isi) {
  const e: Partial<Record<keyof Isi, string>> = {};
  if (!v.tanggal) e.tanggal = "Tanggal pertemuan wajib diisi.";
  if (v.realisasi.trim().length < 20) e.realisasi = "Realisasi minimal 20 karakter.";
  const p = Number(v.persen);
  if (v.persen === "" || Number.isNaN(p) || p < 0 || p > 100) e.persen = "Isi angka 0–100.";
  return e;
}

export function CatatanForm({ onSubmit }: { onSubmit: (c: Catatan) => void }) {
  const [v, setV] = useState<Isi>(KOSONG);
  const [sentuh, setSentuh] = useState<Partial<Record<keyof Isi, boolean>>>({});
  const [pesan, setPesan] = useState<{ ok: boolean; teks: string } | null>(null);
  const err = validasi(v);

  const ubah = (k: keyof Isi) => (e: { target: { value: string } }) => {
    setV({ ...v, [k]: e.target.value });
    setSentuh({ ...sentuh, [k]: true });
    setPesan(null);
  };
  const galat = (k: keyof Isi) => (sentuh[k] && err[k] ? <p className="error" id={`err-${k}`}>{err[k]}</p> : null);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(err).length > 0) {
      setSentuh({ tanggal: true, realisasi: true, persen: true });
      setPesan({ ok: false, teks: "Catatan belum tersimpan. Periksa isian yang bertanda merah." });
      return;
    }
    onSubmit({ tanggal: v.tanggal, realisasi: v.realisasi.trim(), persen: Number(v.persen), kendala: v.kendala.trim() });
    setV(KOSONG); setSentuh({});
    setPesan({ ok: true, teks: "Catatan realisasi berhasil disimpan." });
  };

  return (
    <form onSubmit={kirim} noValidate className="form">
      <label>Tanggal pertemuan
        <input type="date" value={v.tanggal} onChange={ubah("tanggal")} aria-invalid={!!(sentuh.tanggal && err.tanggal)} aria-describedby="err-tanggal" />
      </label>
      {galat("tanggal")}
      <label>Realisasi pembelajaran
        <textarea rows={3} value={v.realisasi} onChange={ubah("realisasi")} aria-invalid={!!(sentuh.realisasi && err.realisasi)} aria-describedby="err-realisasi" />
      </label>
      {galat("realisasi")}
      <label>Ketercapaian materi (%)
        <input type="number" value={v.persen} onChange={ubah("persen")} aria-invalid={!!(sentuh.persen && err.persen)} aria-describedby="err-persen" />
      </label>
      {galat("persen")}
      <label>Kendala (opsional)
        <textarea rows={2} value={v.kendala} onChange={ubah("kendala")} />
      </label>
      <button className="btn btn-primary" type="submit">Simpan catatan</button>
      <p role="status" className={pesan?.ok ? "success" : "error"}>{pesan?.teks}</p>
    </form>
  );
}
