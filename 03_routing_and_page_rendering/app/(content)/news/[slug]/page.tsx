import { DUMMY_NEWS } from "@/dummy_news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const n = DUMMY_NEWS.find((n) => n.slug === params.slug);
  if (!n) {
    notFound();
  }
  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${n.slug}/image`}>
          <img src={`/images/news/${n.image}`} alt={n.title} />
        </Link>
        <h1>{n.title}</h1>
        <time dateTime={n.date}>{n.date}</time>
      </header>
      <p>{n.content}</p>
    </article>
  );
}
