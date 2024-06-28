import { IPost } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), "posts");

export function getPostFiles() {
  return fs.readdirSync(postsDir);
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const fileContent = fs.readFileSync(
    path.join(postsDir, `${postSlug}.md`),
    "utf8",
  );
  const { data, content } = matter(fileContent);
  return {
    slug: postSlug,
    ...data,
    content,
  } as IPost;
}

export function getAllPosts() {
  return getPostFiles()
    .map((f) => getPostData(f))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getFeaturedPosts() {
  return getPostFiles()
    .reduce<IPost[]>((featuredPosts, fileName) => {
      const postData = getPostData(fileName);
      if (postData.isFeatured) {
        featuredPosts.push(postData);
      }
      return featuredPosts;
    }, [])
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
