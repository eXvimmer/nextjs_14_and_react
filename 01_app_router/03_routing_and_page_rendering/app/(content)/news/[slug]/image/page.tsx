import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default function ImagePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const n = getNewsItem(slug);
  if (!n) {
    notFound();
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${n.image}`} alt={n.title} />
    </div>
  );
}
