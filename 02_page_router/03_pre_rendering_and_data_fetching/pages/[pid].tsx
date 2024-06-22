import fs from "fs/promises";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import path from "path";
import { IProduct } from "../data/types";

export default function ProductDetailPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export const getStaticProps = (async ({ params: { pid } }) => {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), "data", "dummy-backend.json"),
    "utf8",
  );
  const data = JSON.parse(jsonData) as { products: IProduct[] };
  if (!data || !data.products.length) {
    return {
      notFound: true,
    };
  }
  const product = data.products.find((p) => p.id === pid);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
    },
  };
}) satisfies GetStaticProps<{
  product: IProduct;
}>;

export const getStaticPaths = (async () => {
  // TODO: generate paths dynamically
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}) satisfies GetStaticPaths;
