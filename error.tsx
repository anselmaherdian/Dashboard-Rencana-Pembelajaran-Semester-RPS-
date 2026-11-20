"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="card">
      <h1>Terjadi kesalahan</h1>
      <p>Data RPS gagal dimuat.</p>
      <button className="btn btn-primary" onClick={reset}>Coba lagi</button>
    </div>
  );
}
