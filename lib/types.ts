export type Status = "Selesai" | "Berjalan" | "Belum";
export interface Minggu { minggu: number; topik: string; cpmk: number; metode: string; status: Status }
export interface Bobot { komponen: string; bobot: number; cpmk: string }
export interface RpsData { minggu: Minggu[]; bobot: Bobot[] }
export interface Catatan { tanggal: string; realisasi: string; persen: number; kendala: string }
export const DAFTAR_STATUS: Status[] = ["Selesai", "Berjalan", "Belum"];
