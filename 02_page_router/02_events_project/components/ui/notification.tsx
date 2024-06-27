import { useContext } from "react";
import { INotification } from "@/types";
import styles from "./notification.module.css";
import NotificationContext from "@/store/notification-context";

function Notification({ title, message, status }: INotification) {
  const { hideNotification } = useContext(NotificationContext);

  let statusStyles = "";
  switch (status) {
    case "success":
      statusStyles = styles.success;
      break;
    case "error":
      statusStyles = styles.error;
      break;
    case "pending":
      statusStyles = styles.pending;
      break;
    default:
      statusStyles = "";
  }
  const activeStyles = `${styles.notification} ${statusStyles}`;

  return (
    <div className={activeStyles} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
