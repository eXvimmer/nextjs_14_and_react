export default function MealDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <h1>Meal: {params.slug}</h1>
    </>
  );
}
