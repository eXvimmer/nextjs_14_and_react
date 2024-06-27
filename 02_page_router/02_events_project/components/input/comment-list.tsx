import { IComment } from "@/types";
import styles from "./comment-list.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NotificationContext from "@/store/notification-context";

function CommentList() {
  const [comments, setComments] = useState<IComment[]>([]);
  const { notification, showNotification, hideNotification } =
    useContext(NotificationContext);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (!comments.length) {
      showNotification({
        title: "Loading comments!",
        message: "Please wait while loading comments",
        status: "pending",
      });
      fetch(`/api/events/${id}/comments`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setComments(data.comments);
            hideNotification();
          } else {
            showNotification({
              title: "Error!",
              message: data.message || "Something  went wrong",
              status: "error",
            });
          }
        })
        .catch((error) => {
          showNotification({
            title: "Error!",
            message: error.message || "Something  went wrong",
            status: "error",
          });
        });
    }
  }, [comments.length, hideNotification, id, showNotification]);

  if (notification && notification.status === "pending") {
    return <p>Loading...</p>;
  }

  if (!comments.length) {
    return <p>No comments available for this event.</p>;
  }

  return (
    <ul className={styles.comments}>
      {comments.map((c) => (
        <li key={c.id}>
          <p>{c.text}</p>
          <div>
            By{" "}
            <address>
              {c.username} ({c.email} at {c.created_at.split("T")[0]})
            </address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
