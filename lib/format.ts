const persen = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 0 });
const tanggal = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" });

export const fmtPersen = (n: number) => persen.format(n);
export const fmtTanggal = (iso: string) => tanggal.format(new Date(`${iso}T00:00:00`));
