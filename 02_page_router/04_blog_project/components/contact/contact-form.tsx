import { FormEvent, useEffect, useState } from "react";
import styles from "./contact-form.module.css";
import { INotification } from "@/types";
import Notification from "../ui/notification";

async function sendContactData(contactDetails: {
  email: string;
  name: string;
  message: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactDetails),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<
    INotification["status"] | null
  >(null);
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendContactInfo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData({ email, name, message });
      setRequestStatus("success");
      setEmail("");
      setMessage("");
      setName("");
    } catch (e) {
      setRequestError((e as Error).message);
      setRequestStatus("error");
    }
  }

  let notification: INotification | null;
  switch (requestStatus) {
    case "pending":
      notification = {
        status: "pending",
        title: "Sending message",
        message: "Your message is on its way...",
      };
      break;
    case "success":
      notification = {
        status: "success",
        title: "Success!",
        message: "Message sent successfully",
      };
      break;
    case "error":
      notification = {
        status: "error",
        title: "Error",
        message: requestError,
      };
      break;
    default:
      notification = null;
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={sendContactInfo}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
}

export default ContactForm;
