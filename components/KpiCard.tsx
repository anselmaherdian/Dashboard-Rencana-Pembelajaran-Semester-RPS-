export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="card">
      <h3 className="kpi-label">{label}</h3>
      <p className="kpi-value">{value}</p>
    </article>
  );
}
