import styles from "./error-alert.module.css";

function ErrorAlert({ children }: { children: React.ReactNode }) {
  return <div className={styles.alert}>{children}</div>;
}

export default ErrorAlert;
