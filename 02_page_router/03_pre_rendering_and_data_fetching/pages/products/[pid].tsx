import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getData } from "../../utils";
import { IProduct } from "../../data/types";

export default function ProductDetailPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export const getStaticProps = (async ({ params: { pid } }) => {
  const data = await getData();
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
  // NOTE: this might not be the best solution if there's a large number of
  // products
  const paths = (await getData()).products.map((p) => ({
    params: { pid: p.id },
  }));
  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;
