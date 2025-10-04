export function getSegment(path: string, index: number): string {
  const segment = path.split("/")[index]?.replace(/-/g, " ") || "";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
