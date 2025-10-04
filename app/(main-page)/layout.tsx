import Navbar from "@/components/main-page-layout/Navbar";
import { SessionProvider } from "next-auth/react";
export default function MainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      {" "}
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
