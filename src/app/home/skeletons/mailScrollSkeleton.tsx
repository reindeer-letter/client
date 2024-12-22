export default function MailScrollSkeleton() {
  return (
    <section className="flex flex-col gap-7 pb-[208px]">
      {[...Array(3)]
        .fill(0)
        .map((v, i) => i + 1)
        .map((v) => (
          <section
            key={v}
            className="relative mx-auto block h-[214px] w-[342px] animate-pulse rounded-lg bg-grey-200"
          />
        ))}
    </section>
  );
}
