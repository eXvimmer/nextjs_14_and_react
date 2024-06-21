import styles from "./EventContent.module.css";

function EventContent({ children }: { children: React.ReactNode }) {
  return <section className={styles.content}>{children}</section>;
}

export default EventContent;
