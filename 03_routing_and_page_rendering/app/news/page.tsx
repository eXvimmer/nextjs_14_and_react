import Link from "next/link";
import { DUMMY_NEWS } from "@/dummy_news";

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        {DUMMY_NEWS.map((n) => (
          <li key={n.id}>
            <Link href={`/news/${n.slug}`}>
              <img src={`/images/news/${n.image}`} alt={n.title} />
              <span>{n.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
