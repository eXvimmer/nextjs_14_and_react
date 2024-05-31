import { notFound } from "next/navigation";

const news = [
  { id: 1, title: "First news item" },
  { id: 2, title: "second news item" },
  { id: 3, title: "third news item" },
];

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const n = news.find((n) => n.id.toString() === params.id);
  if (!n) {
    return notFound();
  }
  return <h1>{n.title}</h1>;
}
