import { IEvent } from "@/types";
import styles from "./event-item.module.css";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Image from "next/image";

interface EventItemProps {
  event: IEvent;
}

function EventItem({ event }: EventItemProps) {
  const readableDate = new Date(event.date || new Date()).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
  const address = event?.location?.replace(", ", "\n");

  return (
    <li className={styles.item}>
      <Image
        src={"/" + event.image}
        alt={event.title}
        width={250}
        height={160}
      />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{event.title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`/events/${event.id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
