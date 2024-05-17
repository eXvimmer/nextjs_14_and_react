import { Outlet } from "react-router-dom";
import PostsList from "../components/PostsList";
import { IPost } from "../types";

function Posts() {
  return (
    <>
      {<Outlet />}
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const res = await fetch("http://localhost:8080/posts");
  const data: { posts: IPost[] } = await res.json();
  return data.posts;
}
