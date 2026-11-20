"use client";
import { useEffect } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

export function ThemeToggle() {
  const [tema, setTema] = useLocalStorage<"terang" | "gelap">("tema", "terang");
  useEffect(() => { document.documentElement.dataset.tema = tema; }, [tema]);
  return (
    <button className="btn" aria-pressed={tema === "gelap"} onClick={() => setTema(tema === "gelap" ? "terang" : "gelap")}>
      Mode {tema === "gelap" ? "terang" : "gelap"}
    </button>
  );
}
