import EventContent from "@/components/event-detail/EventContent";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventSummary from "@/components/event-detail/EventSummary";
import Comments from "@/components/input/comments";
import supabase from "@/services/supabase";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function EventDetailPage({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${event.title} | NextEvents`}</title>
        <meta
          name="description"
          content={event.description || "event details"}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date || ""}
        address={event.location || ""}
        image={event.image || ""}
        imageAlt={event.title || ""}
      />
      <EventContent content={""}>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export const getStaticPaths = (async () => {
  const { data, error } = await supabase.from("events").select("id");
  if (error || !data) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  return {
    paths: data.map((o) => ({ params: { id: o.id } })),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = context.params?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
  };
}) satisfies GetStaticProps;
