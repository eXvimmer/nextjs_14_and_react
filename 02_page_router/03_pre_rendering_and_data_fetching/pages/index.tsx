import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IProduct } from "../data/types";

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
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}) satisfies GetStaticProps<{
  products: IProduct[];
}>;
