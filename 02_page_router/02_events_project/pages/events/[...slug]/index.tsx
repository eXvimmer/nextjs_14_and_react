import EventsList from "../../../components/events/EventsList";
import ResultsTitle from "../../../components/events/ResultsTitle";
import Button from "../../../components/ui/Button";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { getFilteredEvents, IEvent } from "../../../helpers/api-utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function FilteredEventsPage({
  hasError,
  events,
  year,
  month,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (hasError) {
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
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventsList events={events} />
    </>
  );
}

export const getServerSideProps = async function ({ params: { slug } }) {
  let year: string, month: string;
  if (Array.isArray(slug)) {
    [year, month] = slug;
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
    return {
      notFound: true,
    };
  }

  const events = await getFilteredEvents(numYear, numMonth);
  if (!events || !events.length) {
    return {
      // notFound: true,
      props: { hasError: true, events: [], year: NaN, month: NaN },
    };
  }

  return {
    props: {
      events,
      hasError: false,
      year: numYear,
      month: numMonth,
    },
  };
} satisfies GetServerSideProps<{
  events: IEvent[];
  hasError: boolean;
  year: number;
  month: number;
}>;
