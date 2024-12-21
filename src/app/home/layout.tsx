import UserDataProvider from "@/providers/userDataProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-white">
      <UserDataProvider>{children}</UserDataProvider>
    </section>
  );
}
