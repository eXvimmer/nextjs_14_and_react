import Link from "next/link";
import Image from "next/image";
import styles from "./post-item.module.css";
import { IPost } from "@/types";

export default function PostItem({
  post: { title, image, date, slug, excerpt },
}: {
  post: IPost;
}) {
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.image}>
          <Image
            src={`/images/posts/${slug}/${image}`}
            alt={title}
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <time>{readableDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
