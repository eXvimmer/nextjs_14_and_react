import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "@/lib/posts-util";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function PostDetailPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostContent post={post} />;
}

export const getStaticPaths = async function () {
  return {
    paths: getPostFiles().map((f) => {
      return {
        params: { slug: f.replace(/\.md$/, "") },
      };
    }),
    fallback: false,
  };
} satisfies GetStaticPaths;

export const getStaticProps = async function ({ params }) {
  if (!params || !params?.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: getPostData(params.slug),
    },
    revalidate: 600,
  };
} satisfies GetStaticProps;
