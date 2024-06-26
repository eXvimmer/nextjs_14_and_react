import { GetStaticProps, InferGetStaticPropsType } from "next";
import EventsList from "../components/events/EventsList";
import { getFeaturedEvents, IEvent } from "../helpers/api-utils";

// NOTE: firebase is not available in my country,so I couldn't test any of
// these paths
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
    revalidate: 1800, // 30 mins
  };
} satisfies GetStaticProps<{ events: IEvent[] }>;
