"use server";

export async function shareMeal(formData: FormData) {
  "use server";

  // TODO: store the meal in DB
  console.log({
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"), // TODO: store the path to the DB
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  });
}
