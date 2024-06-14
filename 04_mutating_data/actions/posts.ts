"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
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
  let imageUrl: string = "";
  try {
    imageUrl = await uploadImage(image);
  } catch {
    throw new Error(
      "Image upload failed. Post was not created. Please try again.",
    );
  }
  await storePost({
    imageUrl,
    title,
    content,
    userId: 1, // TODO: fix the user id
  });
  redirect("/feed");
}

export async function togglePostLikeStatus(postId: string) {
  updatePostLikeStatus(+postId, 2);
}
