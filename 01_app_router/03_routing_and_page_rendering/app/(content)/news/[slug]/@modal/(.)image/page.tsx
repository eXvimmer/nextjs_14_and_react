import ModalBackdrop from "@/components/ModalBackdrop";
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
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${n.image}`} alt={n.title} />
        </div>
      </dialog>
    </>
  );
}
