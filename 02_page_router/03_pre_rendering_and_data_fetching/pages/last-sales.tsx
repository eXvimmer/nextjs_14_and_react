import { useEffect, useState } from "react";
import { ISalesItem } from "../data/types";

export default function LastSalesPage() {
  const [sales, setSales] = useState<ISalesItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://nextjs-course-9288e-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`,
    )
      .then((res) => res.json())
      .then((data) => {
        const transformedData: ISalesItem[] = [];
        for (const key in data) {
          transformedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setIsLoading(false);
        setSales(transformedData);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!sales.length) {
    return <p>No data yet.</p>;
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
