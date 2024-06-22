import fs from "fs/promises";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IProduct } from "../data/types";
import path from "path";
import Link from "next/link";

export default function HomePage({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={`/${p.id}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = (async (/* context */) => {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), "data", "dummy-backend.json"),
    "utf8",
  );
  const data = JSON.parse(jsonData) as { products: IProduct[] };
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
