import { useRouter } from "next/router";
import EventsList from "../../components/events/EventsList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../dummy_data";

export default function EventsPage() {
  const router = useRouter();
  const events = getAllEvents();
  function findEventsHanlder(year: string, month: string) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHanlder} />
      <EventsList events={events} />
    </>
  );
}
