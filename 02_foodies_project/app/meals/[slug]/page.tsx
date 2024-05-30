import Image from "next/image";
import styles from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const meal = getMeal(params.slug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal?.title,
    description: meal?.summary,
  };
}

export default function MealDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const meal = getMeal(params.slug);
  if (!meal) {
    notFound();
  }
  const { title, image, creator, summary, instructions, creator_email } = meal;
  const updated_instructions = instructions.replace(/\n/g, "<br>");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image fill src={image} alt={title} />
        </div>
        <div className={styles.headerText}>
          <h1>{title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={styles.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: updated_instructions,
          }}
        />
      </main>
    </>
  );
}
