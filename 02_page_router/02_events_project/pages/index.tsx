import { GetStaticProps, InferGetStaticPropsType } from "next";
import EventsList from "../components/events/EventsList";
import { getFeaturedEvents, IEvent } from "../helpers/api-utils";

export default function HomePage({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(events);
  return (
    <div>
      <EventsList events={events} />
    </div>
  );
}

export const getStaticProps = async function () {
  const events = await getFeaturedEvents();
  return {
    props: {
      events,
    },
  };
} satisfies GetStaticProps<{ events: IEvent[] }>;
