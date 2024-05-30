"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (
    !meal.title ||
    !meal.summary ||
    !meal.instructions ||
    !meal.image ||
    !meal.creator ||
    !meal.creator_email
  ) {
    throw new Error("A field is missing");
  }
  await saveMeal(meal);
  redirect("/meals");
}
