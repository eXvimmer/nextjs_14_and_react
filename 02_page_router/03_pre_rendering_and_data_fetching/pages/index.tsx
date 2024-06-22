import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IProduct } from "../data/types";
import Link from "next/link";
import { getData } from "../utils";

export default function HomePage({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={`/products/${p.id}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = (async (/* context */) => {
  const data = await getData();
  if (!data) {
    return {
      props: {
        products: [] as IProduct[],
      },
      redirect: {
        destination: "/somewhere", // NOTE: this route doesn't exist
      },
    };
  }
  if (!data.products.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 60, // re-generate every 60 seconds
  };
}) satisfies GetStaticProps<{
  products: IProduct[];
}>;
