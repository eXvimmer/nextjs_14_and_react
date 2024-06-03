import { DUMMY_NEWS } from "@/dummy_news";
import { notFound } from "next/navigation";

export default function ImagePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const n = DUMMY_NEWS.find((n) => n.slug === slug);
  if (!n) {
    notFound();
  }
  return (
    <>
      <div className="modal-backdrop" />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${n.image}`} alt={n.title} />
        </div>
      </dialog>
    </>
  );
}
