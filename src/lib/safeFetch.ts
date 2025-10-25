export async function safeJson<T=unknown>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const r = await fetch(url, { ...init, cache: 'no-store' });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}
