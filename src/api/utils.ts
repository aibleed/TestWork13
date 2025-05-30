export function withQueryParams(url: string, params: Record<string, unknown>) {
  const u = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      u.searchParams.append(key, String(value));
    }
  }

  return u.toString();
}
