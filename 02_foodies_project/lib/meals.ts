import { Meal } from "@/types";
import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  return db.prepare(`SELECT * FROM meals`).all() as Meal[];
}

export function getMeal(slug: Meal["slug"]): Meal {
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug) as Meal;
}
