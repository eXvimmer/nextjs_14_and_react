import Link from "next/link";
import styles from "./button.module.css";

function Button({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: string;
}) {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  }

  return <button className={styles.btn}>{children}</button>;
}

export default Button;
