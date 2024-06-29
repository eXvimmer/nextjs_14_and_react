import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function HomePage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Mustafa's blog</title>
        <meta
          name="description"
          content="I write articles about web and game development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps = async function () {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
    // revalidate: 1800, // 30 minutes
  };
} satisfies GetStaticProps;
