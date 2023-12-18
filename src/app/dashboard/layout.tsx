import "~/styles/globals.css";

import Sidebar from "../components/sidebar/sidebar";

export const metadata = {
  title: "Dashboard | BetterExams Points",
  description: "A grade tracking app and points calculator.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
