import EventsList from "../components/events/EventsList";
import { getFeaturedEvents } from "../dummy_data";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventsList events={featuredEvents} />
    </div>
  );
}
