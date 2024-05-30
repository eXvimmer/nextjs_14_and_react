"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string | undefined) {
  return !text || text.trim() === "";
}

export async function shareMeal(
  _prevState: { message: string },
  formData: FormData,
) {
  const meal = {
    title: formData.get("title")?.toString(),
    summary: formData.get("summary")?.toString(),
    instructions: formData.get("instructions")?.toString(),
    image: formData.get("image") as File | undefined,
    creator: formData.get("name")?.toString(),
    creator_email: formData.get("email")?.toString(),
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email?.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Inalid Input",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
