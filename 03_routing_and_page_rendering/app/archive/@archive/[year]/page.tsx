import NewsList from "@/components/NewsList";
import { getNewsForYear } from "@/lib/news";

export default function FilteredNewsPage({
  params: { year },
}: {
  params: { year: string };
}) {
  const news = getNewsForYear(year);
  return <NewsList news={news} />;
}
