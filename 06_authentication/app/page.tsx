import AuthForm, { IFormMode } from "@/components/auth-form";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let formMode = searchParams.mode ?? "login";
  if (formMode !== "login" && formMode !== "signup") {
    formMode = "login";
  }
  return <AuthForm mode={formMode as IFormMode} />;
}
