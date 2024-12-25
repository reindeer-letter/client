import UserDataProvider from "@/providers/userDataProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserDataProvider>{children}</UserDataProvider>
    </>
  );
}
