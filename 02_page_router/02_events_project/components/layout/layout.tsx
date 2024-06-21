import MainHeader from "./MainHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
