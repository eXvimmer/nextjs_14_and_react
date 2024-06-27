import { IEvent } from "@/types";
import EventItem from "./EventItem";
import styles from "./event-list.module.css";

interface EventListProps {
  items: IEvent[];
}

function EventList({ items }: EventListProps) {
  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
