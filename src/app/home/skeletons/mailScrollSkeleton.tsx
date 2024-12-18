export default function MailScrollSkeleton() {
  return (
    <section className="mb-[116px] flex flex-col gap-7">
      {[...Array(6)]
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
