import { DAFTAR_STATUS } from "@/lib/types";

interface Props {
  q: string; cpmk: string; status: string;
  onQ: (v: string) => void; onCpmk: (v: string) => void; onStatus: (v: string) => void;
}

export function FilterBar({ q, cpmk, status, onQ, onCpmk, onStatus }: Props) {
  return (
    <form role="search" className="filters" onSubmit={(e) => e.preventDefault()}>
      <label>Cari topik / metode
        <input type="search" value={q} onChange={(e) => onQ(e.target.value)} placeholder="mis. React" />
      </label>
      <label>CPMK
        <select value={cpmk} onChange={(e) => onCpmk(e.target.value)}>
          <option value="semua">Semua</option>
          {[1, 2, 3, 4].map((n) => <option key={n} value={n}>CPMK {n}</option>)}
        </select>
      </label>
      <label>Status
        <select value={status} onChange={(e) => onStatus(e.target.value)}>
          <option value="semua">Semua</option>
          {DAFTAR_STATUS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
    </form>
  );
}
