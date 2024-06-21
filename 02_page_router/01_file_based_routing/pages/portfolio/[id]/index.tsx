import { useRouter } from "next/router";

export default function PortfolioProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>The portfolio project page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
