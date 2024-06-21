import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPosts();
  return {
    title: `Feed Page`,
    description: `See all ${posts.length} of our posts`,
  };
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
