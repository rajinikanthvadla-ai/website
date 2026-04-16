/** Encode each path segment so spaces and reserved chars work in URLs (e.g. `/assets/foo bar.jpg`). */
export function encodePublicPath(path: string): string {
  if (!path.startsWith("/")) return path;
  const tail = path
    .slice(1)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/${tail}`;
}
