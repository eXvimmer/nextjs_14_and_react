import styles from "./event-content.module.css";

function EventContent({
  children,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return <section className={styles.content}>{children}</section>;
}

export default EventContent;
