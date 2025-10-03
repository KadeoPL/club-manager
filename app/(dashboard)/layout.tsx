export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
