import DashboardNavigation from "@/components/dashboard-ui/dashboardNavigation";
import { SessionProvider } from "next-auth/react";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-screen">
      <SessionProvider>
        <DashboardNavigation />

        {children}
      </SessionProvider>
    </div>
  );
}
