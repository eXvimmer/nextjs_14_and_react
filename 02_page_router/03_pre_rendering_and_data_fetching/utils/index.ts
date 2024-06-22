import path from "path";
import fs from "fs/promises";
import { IProduct } from "../data/types";

export async function getData() {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), "data", "dummy-backend.json"),
    "utf8",
  );
  return JSON.parse(jsonData) as { products: IProduct[] };
}
