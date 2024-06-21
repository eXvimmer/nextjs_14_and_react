import Link from "next/link";
import { UrlObject } from "url";
import styles from "./Button.module.css";

export default function Button({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string | UrlObject;
}) {
  return (
    <Link href={link} className={styles.btn}>
      {children}
    </Link>
  );
}
