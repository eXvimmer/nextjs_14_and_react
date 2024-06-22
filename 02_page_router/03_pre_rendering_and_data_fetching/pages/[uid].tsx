import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function UserIdPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{id}</h1>;
}

export const getServerSideProps = async function ({ params: { uid } }) {
  return {
    props: {
      id: "userid-" + uid,
    },
  };
} satisfies GetServerSideProps<{ id: string }>;
