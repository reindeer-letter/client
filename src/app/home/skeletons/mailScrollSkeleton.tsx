export default function MailScrollSkeleton() {
  return (
    <section className="flex flex-col gap-5 pb-[208px]">
      {[...Array(5)]
        .fill(0)
        .map((v, i) => i + 1)
        .map((v) => (
          <section
            key={v}
            className="relative mx-auto block h-[221px] w-[350px] animate-pulse rounded-lg bg-grey-200"
          />
        ))}
    </section>
  );
}
