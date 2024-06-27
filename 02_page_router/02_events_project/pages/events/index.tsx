import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import supabase from "@/services/supabase";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Events({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const handleSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events | NextEvents</title>
        <meta
          name="description"
          content="find related events to improve your life as a developer"
        />
      </Head>
      <EventsSearch onSearch={handleSearch} />
      <EventList items={events} />
    </>
  );
}

export const getStaticProps = (async () => {
  const { data, error } = await supabase.from("events").select("*");
  if (error || !data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      events: data,
    },
    revalidate: 5 * 60, // every 5 minutes
  };
}) satisfies GetStaticProps;
