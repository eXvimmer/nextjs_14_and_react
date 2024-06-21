"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { IPost } from "@/lib/posts";
import { togglePostLikeStatus } from "@/actions/posts";
import { useOptimistic } from "react";
import Image, { ImageLoader } from "next/image";

const imageLoader: ImageLoader = (config) => {
  const [urlStart, urlEnd] = config.src.split("/upload/");
  const transformations = `w_200,q_${config.quality}`;
  return `${urlStart}/upload/${transformations}/${urlEnd}`;
};

function Post({
  post,
  action,
}: {
  post: IPost;
  action: (postId: string) => Promise<void>;
}) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          width={200}
          height={120}
          loader={imageLoader}
          src={post.image}
          alt={post.title}
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: IPost[] }) {
  const [optimisticPosts, updatePostsOptimistically] = useOptimistic<
    IPost[],
    string
  >(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex((p) => p.id === updatedPostId);
    if (updatedPostIndex === -1) {
      return prevPosts;
    }
    const updatedPost = { ...prevPosts[updatedPostIndex] };
    updatedPost.likes += updatedPost.isLiked ? -1 : 1;
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  });

  async function updatePost(postId: string) {
    updatePostsOptimistically(postId);
    await togglePostLikeStatus(postId);
  }

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
