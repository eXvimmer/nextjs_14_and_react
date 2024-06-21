import MainHeader from "@/components/main-header/main-header";
import "./globals.css";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // TODO: remove suppressHydrationWarning in prod
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
