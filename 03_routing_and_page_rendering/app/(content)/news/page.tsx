"use client";

import { INews } from "@/dummy_news";
import NewsList from "@/components/NewsList";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const res = await fetch("http://localhost:8080/news");
      if (!res.ok) {
        setError("Failed to fetch news.");
      }
      setIsLoading(false);
      const fetchedNews: INews[] = await res.json();
      setNews(fetchedNews);
    }

    fetchNews();
  }, []);

  return (
    <>
      <h1>News Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : news ? (
        <NewsList news={news} />
      ) : null}
    </>
  );
}
