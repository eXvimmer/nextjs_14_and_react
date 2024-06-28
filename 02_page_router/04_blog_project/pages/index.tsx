import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { IPost } from "@/types";
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

// TODO: fetch posts from database
export const getStaticProps = async function () {
  const posts: IPost[] = [
    {
      slug: "getting-started-with-nextjs",
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt: "NextJS is the react framework for production",
      date: "2024-02-10",
    },
    {
      slug: "getting-started-with-nextjs2",
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt: "NextJS is the react framework for production",
      date: "2024-02-10",
    },
    {
      slug: "getting-started-with-nextjs3",
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt: "NextJS is the react framework for production",
      date: "2024-02-10",
    },
    {
      slug: "getting-started-with-nextjs4",
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt: "NextJS is the react framework for production",
      date: "2024-02-10",
    },
  ];
  return {
    props: {
      posts,
    },
  };
} satisfies GetStaticProps;
