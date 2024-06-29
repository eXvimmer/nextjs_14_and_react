// import ReactDOM from "react-dom";
import { INotification } from "@/types";
import styles from "./notification.module.css";

export default function Notification({
  title,
  message,
  status,
}: INotification) {
  const statusStyles =
    status === "success"
      ? styles.success
      : status === "error"
        ? styles.error
        : "";
  const cssStyles = `${styles.notification} ${statusStyles}`;

  return (
    <div className={cssStyles}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
