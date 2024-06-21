import { useRouter } from "next/router";

export default function ClientPage() {
  const router = useRouter();

  function loadProject() {
    // router.push(`/clients/mustafa/the-secret-project`);
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: {
        id: "mustafa",
        clientprojectid: "some-secret-project",
      },
    });
  }

  return (
    <div>
      <h1>A specific client page</h1>
      <button onClick={loadProject}>Load the secret project</button>
    </div>
  );
}
