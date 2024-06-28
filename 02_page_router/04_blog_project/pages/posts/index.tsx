import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function AllPostsPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AllPosts posts={posts} />;
}

export const getStaticProps = async function () {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
} satisfies GetStaticProps;
