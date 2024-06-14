"use server";

import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export async function createPost(
  _prevState: { errors: string[] },
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;
  const errors: string[] = [];
  if (!title.trim()) {
    errors.push("title is requried");
  }
  if (!content.trim()) {
    errors.push("content is required");
  }
  if (!image || !image.size) {
    errors.push("image is required");
  }
  if (errors.length) {
    return { errors };
  }
  await storePost({
    imageUrl: "", // TODO: fix this
    title,
    content,
    userId: 1, // TODO: fix the user id
  });
  redirect("/feed");
}
