import EventsList from "../../components/events/EventsList";
import { getAllEvents } from "../../dummy_data";

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <div>
      <EventsList events={events} />
    </div>
  );
}
