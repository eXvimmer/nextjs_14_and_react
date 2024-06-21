import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <Link href="/about">About</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/clients">Clients</Link>
      </ul>
    </div>
  );
}
