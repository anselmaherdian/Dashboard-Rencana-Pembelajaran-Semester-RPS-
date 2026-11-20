import { unstable_cache } from "next/cache";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { RpsData } from "./types";

// Data dibaca async dari JSON lalu di-cache; revalidate tiap 1 jam (RPS jarang berubah).
export const getRps = unstable_cache(
  async (): Promise<RpsData> => {
    const raw = await readFile(path.join(process.cwd(), "data", "rps.json"), "utf-8");
    return JSON.parse(raw) as RpsData;
  },
  ["rps-data"],
  { revalidate: 3600 }
);
