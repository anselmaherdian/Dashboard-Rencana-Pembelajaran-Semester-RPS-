"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Bobot } from "@/lib/types";

const WARNA = ["#2563eb", "#16a34a", "#d97706", "#9333ea", "#dc2626"];

export function ChartCard({ bobot }: { bobot: Bobot[] }) {
  const data = bobot.map((b) => ({ name: b.komponen, value: b.bobot }));
  return (
    <article className="card">
      <div style={{ height: 260 }} role="img" aria-label="Diagram donat distribusi bobot penilaian">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
              {data.map((_, i) => <Cell key={i} fill={WARNA[i % WARNA.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <table>
        <thead><tr><th scope="col">Komponen</th><th scope="col">Bobot</th><th scope="col">CPMK</th></tr></thead>
        <tbody>
          {bobot.map((b) => <tr key={b.komponen}><td>{b.komponen}</td><td>{b.bobot}%</td><td>{b.cpmk}</td></tr>)}
        </tbody>
      </table>
    </article>
  );
}
