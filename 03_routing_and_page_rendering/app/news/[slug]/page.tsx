import { DUMMY_NEWS } from "@/dummy_news";
import { notFound } from "next/navigation";

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const n = DUMMY_NEWS.find((n) => n.slug === params.slug);
  if (!n) {
    return notFound();
  }
  return (
    <article className="news-article">
      <header>
        <img src={`/images/news/${n.image}`} alt={n.title} />
        <h1>{n.title}</h1>
        <time dateTime={n.date}>{n.date}</time>
      </header>
      <p>{n.content}</p>
    </article>
  );
}
