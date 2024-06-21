import styles from "./ErrorAlert.module.css";

function ErrorAlert({ children }: { children: React.ReactNode }) {
  return <div className={styles.alert}>{children}</div>;
}

export default ErrorAlert;
