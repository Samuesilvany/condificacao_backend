import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MOTOS_FILE = path.join(__dirname, "../data/motos.json");

export const readMotos = () => JSON.parse(readFileSync(MOTOS_FILE, "utf8"));

export const writeMotos = (motos) => writeFileSync(MOTOS_FILE, JSON.stringify(motos, null, 2));

export const generateId = () => uuidv4();

export const fuzzySearch = async (motos, query) => {
  const Fuse = (await import("fuse.js")).default;
  const fuse = new Fuse(motos, {
    keys: ["marca", "modelo"],
    threshold: 0.3
  });
  return fuse.search(query).map(r => r.item);
};
