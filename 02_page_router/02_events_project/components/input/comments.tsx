import { useContext, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "./comments.module.css";
import { IComment } from "@/types";
import NotificationContext from "@/store/notification-context";

function Comments({ eventId }: { eventId: string }) {
  const [showComments, setShowComments] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((s) => !s);
  }

  function addCommentHandler(comment: Partial<IComment>) {
    showNotification({
      title: "Saving your comment",
      message: "Please wait",
      status: "pending",
    });
    setShowComments(false);
    fetch(`/api/events/${eventId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showNotification({
            title: "Success!",
            message: data.message || "Comment created",
            status: "success",
          });
        } else {
          showNotification({
            title: "Error!",
            message: data.message || "Something went wrong",
            status: "error",
          });
        }
      })
      .catch((error) => {
        showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      })
      .finally(() => setShowComments(true));
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
