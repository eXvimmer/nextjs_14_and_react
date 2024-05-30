import { Meal } from "@/types";
import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  return db.prepare(`SELECT * FROM meals`).all() as Meal[];
}

export function getMeal(slug: Meal["slug"]): Meal | undefined {
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug) as Meal;
}

export async function saveMeal(meal: any) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const ext = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${Math.random()}.${ext}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("failed to save image!");
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    );
  `,
  ).run(meal);
}
