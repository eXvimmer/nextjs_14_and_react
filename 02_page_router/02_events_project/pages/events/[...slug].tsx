import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import supabase from "@/services/supabase";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

export default function FilteredEventsPage({
  error,
  date,
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (error || !date) {
    return (
      <>
        <ErrorAlert>
          <p style={{ textTransform: "capitalize" }}>{error}</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!events.length) {
    return (
      <>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Filtered Events | NextEvents</title>
        <meta
          name="description"
          content={`All events for ${date?.month}/${date?.year}`}
        />
      </Head>
      <ResultsTitle date={new Date(date?.year, date?.month - 1)} />
      <EventList items={events} />
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const slug = context.params?.slug;
  if (!slug || !slug.length || typeof slug === "string") {
    return {
      notFound: true,
    };
  }
  const [year, month] = slug;
  const numYear = +year;
  const numMonth = +month;
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth < 1 ||
    numMonth > 12 ||
    slug.length !== 2
  ) {
    return {
      props: {
        error: "invalid filter. please adjust the filter values.",
        events: [],
      },
      // redirect: {
      //   destination: "/error"
      // }
    };
  }
  const startDate = new Date(numYear, numMonth - 1, 1);
  const endDate = new Date(numYear, numMonth, 0);
  const startDateString = startDate.toISOString().split("T")[0];
  const endDateString = endDate.toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("events")
    .select()
    .gte("date", startDateString)
    .lte("date", endDateString);
  if (error || !data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      error: "",
      events: data,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}) satisfies GetServerSideProps;
