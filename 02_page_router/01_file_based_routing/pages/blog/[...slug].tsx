import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>The Blog Posts Page</h1>
      {Array.isArray(slug) ? slug.join(" ") : slug}
    </div>
  );
}
