import { useRouter } from "next/router";
import { getEventById } from "../../../dummy_data";
import EventSummary from "../../../components/event-detail/EventSummary";
import EventContent from "../../../components/event-detail/EventContent";
import EventLogistics from "../../../components/event-detail/EventLogistics";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const event = getEventById(id);
  if (!event) {
    return <p>No Event Found!</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
