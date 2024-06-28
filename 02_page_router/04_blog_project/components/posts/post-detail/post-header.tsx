import { IPost } from "@/types";
import styles from "./post-header.module.css";
import Image from "next/image";

export default function PostHeader({
  title,
  image,
}: {
  title: IPost["title"];
  image: IPost["image"];
}) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}
