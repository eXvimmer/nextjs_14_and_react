import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function UserProfilePage({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <p>{username}</p>
    </div>
  );
}

export const getServerSideProps = async function () {
  return {
    props: {
      username: "Mustafa",
    },
  };
} satisfies GetServerSideProps<{ username: string }>;
