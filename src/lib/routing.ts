export function normalizePathname(path: string) {
  return path.replace(/(?:\/index)?\.html$/, '').replace(/\/+$/, '') || '/'
}
