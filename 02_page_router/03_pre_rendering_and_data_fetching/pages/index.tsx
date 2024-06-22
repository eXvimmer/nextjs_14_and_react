import fs from "fs/promises";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IProduct } from "../data/types";
import path from "path";

export default function HomePage({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
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
  return {
    props: {
      products: data.products,
    },
  };
}) satisfies GetStaticProps<{
  products: IProduct[];
}>;
