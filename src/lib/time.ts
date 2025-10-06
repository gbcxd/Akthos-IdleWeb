let serverOffsetMs = 0;

export function setServerTimeOffset(offsetMs: number) {
  serverOffsetMs = offsetMs;
}
export function nowMs() {
  return Date.now() + serverOffsetMs;
}

// convenience to fetch offset at app load
export async function syncServerTime() {
  const res = await fetch('/api/now', { cache: 'no-store' });
  const { now } = await res.json();
  setServerTimeOffset(now - Date.now());
}
