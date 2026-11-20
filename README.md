# Dashboard-Rencana-Pembelajaran-Semester-RPS-

Aplikasi Next.js 15 (App Router) + React 19 + TypeScript untuk memantau RPS 16 minggu: KPI, tabel interaktif, distribusi bobot, detail minggu, ubah status, dan catatan realisasi.

## Cara menjalankan
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Fitur
- KPI (total, selesai, berjalan, belum, % kemajuan) dihitung dari data.
- Tabel minggu: cari, filter CPMK/status, urut, paginasi.
- Diagram donat bobot penilaian (Recharts) + tabel pendamping.
- Halaman detail `/minggu/[id]`, ubah status dengan umpan balik, formulir catatan dengan validasi real-time.
- Mode gelap, tata letak responsif, label form, fokus keyboard terlihat.
- Perubahan status dan catatan disimpan di LocalStorage (data dummy non-sensitif).

## User story
1. Sebagai dosen, saya ingin melihat kemajuan RPS sekilas agar tahu sisa materi.
2. Sebagai koordinator prodi, saya ingin memfilter minggu per CPMK agar ketercapaian CPMK terpantau.
3. Sebagai dosen, saya ingin mengubah status minggu agar dashboard selalu terkini.
4. Sebagai dosen, saya ingin mencatat realisasi dan kendala pertemuan sebagai bahan evaluasi.

**Alur utama:** buka dashboard → lihat KPI → filter/cari minggu → buka detail → ubah status → isi catatan.

## Strategi rendering
- `/` (dashboard): **ISR** (`revalidate = 3600`). RPS jarang berubah, tetapi perlu cukup segar.
- `/minggu/[id]`: **SSG** (`generateStaticParams`). Isi per minggu tetap, jadi cepat dan murah.
- Data dibaca async dari `data/rps.json` dan di-cache (`unstable_cache`, revalidate 1 jam). Status dan catatan di sisi klien (data pengguna, bukan data RPS dasar).

## Struktur
`app/` (layout, page, `minggu/[id]`, loading, error) · `components/` (KpiCard, StatusBadge, FilterBar, DataTable, ChartCard, CatatanForm, DetailMinggu, ThemeToggle) · `lib/` (types, format Intl, data, store context, custom hook `useLocalStorage`).

## Tangkapan layar
(tempel di sini: dashboard terang, dashboard gelap, detail minggu, tampilan ponsel)

## Pernyataan penggunaan AI
Saya menggunakan Claude (Anthropic) sebagai asisten untuk membuat kerangka awal proyek. Saya telah mempelajari, menjalankan, dan memodifikasi seluruh kode serta mampu menjelaskannya.
