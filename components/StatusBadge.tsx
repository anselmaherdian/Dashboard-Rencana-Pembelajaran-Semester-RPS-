import type { Status } from "@/lib/types";

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>;
}
