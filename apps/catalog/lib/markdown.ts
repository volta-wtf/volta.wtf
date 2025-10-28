import { promises as fs } from "node:fs";
import path from "node:path";

export async function readMD(relPath: string) {
  const abs = path.join(process.cwd(), "apps/web", relPath);
  return fs.readFile(abs, "utf8");
}
