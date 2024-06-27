import EventList from "@/components/events/EventList";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import supabase from "@/services/supabase";
import { IEvent } from "@/types";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function Home({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Home | NextEvents</title>
        <meta
          name="description"
          content="find related events to improve your life as a developer"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export const getStaticProps = (async (/* context */) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("isFeatured", true);
  if (error) {
    return {
      props: {
        events: [] as IEvent[],
      },
    };
  }
  return {
    props: {
      events: data,
    },
    revalidate: 30 * 60, // every 30 minutes
  };
}) satisfies GetStaticProps;
