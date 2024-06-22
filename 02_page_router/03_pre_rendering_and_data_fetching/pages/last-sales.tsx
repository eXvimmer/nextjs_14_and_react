import { useEffect, useState } from "react";
import { ISalesItem } from "../data/types";
import useSWR from "swr";

export default function LastSalesPage() {
  const [sales, setSales] = useState<ISalesItem[]>([]);
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
  if (!data || !sales.length) {
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
