export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="bg-grey-900 px-4">{children}</section>;
}
