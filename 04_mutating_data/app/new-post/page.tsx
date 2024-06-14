import PostForm, { PostFormState } from "@/components/post-form";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(_prevState: PostFormState, formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const content = formData.get("content") as string;
    const errors: PostFormState["errors"] = [];
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

  return <PostForm action={createPost} />;
}
