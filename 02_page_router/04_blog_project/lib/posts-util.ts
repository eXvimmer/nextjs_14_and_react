import { IPost } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), "posts");

function getPostData(fileName: string) {
  const fileContent = fs.readFileSync(path.join(postsDir, fileName), "utf8");
  const { data, content } = matter(fileContent);
  return {
    slug: fileName.replace(/\.md$/, ""),
    ...data,
    content,
  } as IPost;
}

export function getAllPosts() {
  return fs
    .readdirSync(postsDir)
    .map((f) => getPostData(f))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getFeaturedPosts() {
  return fs
    .readdirSync(postsDir)
    .reduce<IPost[]>((featuredPosts, fileName) => {
      const postData = getPostData(fileName);
      if (postData.isFeatured) {
        featuredPosts.push(postData);
      }
      return featuredPosts;
    }, [])
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
