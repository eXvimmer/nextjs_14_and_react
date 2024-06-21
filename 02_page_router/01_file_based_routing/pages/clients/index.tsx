import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: 1, name: "Mustafa" },
    { id: 2, name: "Malena" },
    { id: 3, name: "Emi" },
  ];
  return (
    <div>
      <h1>Clients Page</h1>

      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            {/* <Link href={`/clients/${c.id}`}>{c.name}</Link> */}
            <Link
              href={{
                pathname: "/clients/[id]",
                query: {
                  id: c.id,
                },
              }}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
