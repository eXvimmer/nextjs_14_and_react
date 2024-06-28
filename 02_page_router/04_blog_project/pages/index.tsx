import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function HomePage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
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
