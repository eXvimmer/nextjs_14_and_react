import { FormEventHandler, useContext, useRef } from "react";
import styles from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { showNotification, notification } = useContext(NotificationContext);

  const registrationHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    showNotification({
      title: "Signing Up",
      message: "Registering for newsletter",
      status: "pending",
    });
    if (!emailInputRef.current?.value) {
      showNotification({
        title: "Error!",
        message: "Please provide an email address",
        status: "error",
      });

      return;
    }
    fetch(`/api/newsletter`, {
      method: "POST",
      body: JSON.stringify({ email: emailInputRef.current?.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      })
      .then((data) => {
        if (!data.success) {
          showNotification({
            title: "Error!",
            message: data.message || "Something went wrong",
            status: "error",
          });
        } else {
          if (emailInputRef.current) {
            emailInputRef.current.value = "";
          }
          showNotification({
            title: "Success!",
            message:
              data.message || "Thank you for subscribing to our newsletter!",
            status: "success",
          });
        }
      })
      .catch((error) => {
        showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button
            disabled={!!notification && notification.status === "pending"}
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
