export function isExternalUrl(value: string | undefined): value is string {
  return Boolean(value && /^https?:\/\//i.test(value));
}
