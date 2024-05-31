import Link from "next/link";

const news = [
  { id: 1, title: "First news item" },
  { id: 2, title: "second news item" },
  { id: 3, title: "third news item" },
];

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <Link href={`/news/${n.id}`}>{n.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
