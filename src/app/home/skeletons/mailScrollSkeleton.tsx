export default function MailScrollSkeleton() {
  return (
    <section className="mb-[116px] flex flex-col gap-7">
      {[...Array(6)].fill(0).map(() => (
        <section
          key={`${Math.random()}`}
          className="relative mx-auto block h-[221px] w-[350px] animate-pulse rounded-lg bg-grey-600"
        />
      ))}
    </section>
  );
}
