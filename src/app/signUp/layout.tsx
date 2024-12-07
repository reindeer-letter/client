export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto h-svh min-w-[375px] max-w-[600px]">{children}</div>
  );
}
