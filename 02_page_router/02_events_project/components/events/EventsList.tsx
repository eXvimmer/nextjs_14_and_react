import { IEvent } from "../../helpers/api-utils";
import EventItem from "./EventItem";
import styles from "./EventList.module.css";

export default function EventsList({ events }: { events: IEvent[] }) {
  return (
    <ul className={styles.list}>
      {events.map((e) => (
        <EventItem key={e.id} event={e} />
      ))}
    </ul>
  );
}
