import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function AllPostsPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta
          name="description"
          content="A list of all proramming related posts and articles"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export const getStaticProps = async function () {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
} satisfies GetStaticProps;
