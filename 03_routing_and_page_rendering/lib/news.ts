import sql from "better-sqlite3";

export interface INews {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
}

const db = sql("data.db"); // path to db is relative to root

export function getAllNews() {
  return db.prepare(`SELECT * FROM news`).all() as INews[];
}

export function getNewsItem(slug: string) {
  return db.prepare("SELECT * FROM news WHERE slug = ?").get(slug) as INews;
}

export function getLatestNews() {
  return db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all() as INews[];
}

export function getAvailableNewsYears() {
  return (
    db
      .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
      .all() as { year: string }[]
  ).map((year) => year.year);
}

export function getAvailableNewsMonths(year: string) {
  return (
    db
      .prepare(
        "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?",
      )
      .all(year) as { month: string }[]
  ).map((month) => month.month);
}

export function getNewsForYear(year: string) {
  return db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC",
    )
    .all(year) as INews[];
}

export function getNewsForYearAndMonth(year: string, month: string) {
  return db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC",
    )
    .all(year, month) as INews[];
}
