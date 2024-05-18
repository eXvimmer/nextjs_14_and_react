import React from "react";

function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1>Blog Post</h1>
      <p>{params.slug}</p>
    </main>
  );
}

export default BlogPostPage;
