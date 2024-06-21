import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy_data";
import EventsList from "../../../components/events/EventsList";
import ResultsTitle from "../../../components/events/ResultsTitle";
import Button from "../../../components/ui/Button";
import ErrorAlert from "../../../components/ui/ErrorAlert";

export default function FilteredEventsPage() {
  const router = useRouter();
  if (!router.query.slug) {
    return <p className="center">Loading...</p>;
  }
  let year: string, month: string;
  if (Array.isArray(router.query.slug)) {
    [year, month] = router.query.slug;
  }
  const numYear = parseInt(year);
  const numMonth = parseInt(month);
  if (
    !year ||
    !month ||
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2050 ||
    numYear < 2020 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please try again with a valid filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const events = getFilteredEvents(numYear, numMonth);
  if (!events || !events.length) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventsList events={events} />
    </>
  );
}
