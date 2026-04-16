export function hasDisplayValue(value?: string | null): boolean {
  if (!value) return false;

  const normalized = value.trim().toLowerCase();
  return normalized !== "" && normalized !== "n/a" && normalized !== "na";
}
