import { useEffect, useState } from "react";
import { ISalesItem } from "../data/types";
import useSWR from "swr";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function LastSalesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [sales, setSales] = useState<ISalesItem[]>(props.sales);
  const { data, error } = useSWR(
    `https://nextjs-course-9288e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`,
    (url) => fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      const transformedData: ISalesItem[] = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedData);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!data && !sales.length) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales.map((s) => (
        <li key={s.id}>
          {s.username} - ${s.volume}
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async function () {
  try {
    const res = await fetch(
      `https://nextjs-course-9288e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`,
    );
    const data = await res.json();
    const sales: ISalesItem[] = [];
    for (const key in data) {
      sales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    return { props: { sales } };
  } catch {
    return { props: { sales: [] } };
  }
} satisfies GetStaticProps<{
  sales: ISalesItem[];
}>;
