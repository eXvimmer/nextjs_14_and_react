import NewsList from "@/components/NewsList";
import {
  INews,
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

function FilterHeader({ year, month }: { year?: string; month?: string }) {
  const availableYears = getAvailableNewsYears();
  if (
    (year && !availableYears.includes(year)) ||
    (year && month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid filter");
  }
  let links = availableYears;
  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = [];
  }
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({
  year,
  month,
}: {
  year?: string;
  month?: string;
}) {
  let newsContent = <p>No news found for the selected period.</p>;
  if (!year && !month) {
    return newsContent;
  }
  let news: INews[] = [];
  if (year && !month) {
    news = getNewsForYear(year);
  } else if (year && month) {
    news = getNewsForYearAndMonth(year, month);
  }
  if (news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
  return newsContent;
}

export default async function FilteredNewsPage({
  params: { filter },
}: {
  params: { filter?: string[] };
}) {
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  return (
    <>
      <Suspense fallback={<p>Loading....</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
