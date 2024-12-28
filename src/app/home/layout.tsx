import UserDataProvider from "@/providers/userDataProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen flex-col bg-white">
      <UserDataProvider>{children}</UserDataProvider>
    </section>
  );
}
