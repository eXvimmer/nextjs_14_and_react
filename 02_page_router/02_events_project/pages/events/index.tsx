import { useRouter } from "next/router";
import EventsList from "../../components/events/EventsList";
import EventsSearch from "../../components/events/EventsSearch";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllEvents, IEvent } from "../../helpers/api-utils";

export default function EventsPage({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
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

export const getStaticProps = async function () {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
} satisfies GetStaticProps<{ events: IEvent[] }>;
