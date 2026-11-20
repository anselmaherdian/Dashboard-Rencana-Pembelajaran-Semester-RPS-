"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Catatan, Minggu, Status } from "./types";

interface Overrides { status: Record<number, Status>; catatan: Record<number, Catatan[]> }
interface Store {
  overrides: Overrides;
  setStatus: (minggu: number, status: Status) => void;
  addCatatan: (minggu: number, catatan: Catatan) => void;
}

const StoreContext = createContext<Store | null>(null);

export function RpsProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useLocalStorage<Overrides>("rps-overrides", { status: {}, catatan: {} });
  const setStatus = (m: number, s: Status) =>
    setOverrides((o) => ({ ...o, status: { ...o.status, [m]: s } }));
  const addCatatan = (m: number, c: Catatan) =>
    setOverrides((o) => ({ ...o, catatan: { ...o.catatan, [m]: [c, ...(o.catatan[m] ?? [])] } }));
  return <StoreContext value={{ overrides, setStatus, addCatatan }}>{children}</StoreContext>;
}

export function useRpsStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useRpsStore harus dipakai di dalam RpsProvider");
  return ctx;
}

export const terapkanStatus = (weeks: Minggu[], o: Overrides): Minggu[] =>
  weeks.map((w) => ({ ...w, status: o.status[w.minggu] ?? w.status }));
