import EventSummary from "../../../components/event-detail/EventSummary";
import EventContent from "../../../components/event-detail/EventContent";
import EventLogistics from "../../../components/event-detail/EventLogistics";
import {
  getFeaturedEvents,
  getEventById,
  IEvent,
} from "../../../helpers/api-utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function EventDetailPage({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
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

export const getStaticProps = async function ({ params: { id } }) {
  const event = await getEventById(id);
  return {
    props: {
      event: event || null,
    },
    revalidate: 30, // seconds
  };
} satisfies GetStaticProps<{ event: IEvent | null }>;

export const getStaticPaths = async function () {
  const paths = (await getFeaturedEvents())?.map((e) => ({
    params: { id: e.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
} satisfies GetStaticPaths;
