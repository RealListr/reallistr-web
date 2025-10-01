type Facts = {
  headline?: string;
  description?: string;
  facts?: Array<{ label: string; value: string | number }>;
};

export default function PropertyFacts({ data }: { data: Facts }) {
  if (!data) return null;
  const { headline, description, facts = [] } = data;

  return (
    <section className="mt-10">
      <h2 className="mb-3 text-lg font-semibold">Property Information</h2>
      {headline && <p className="text-base font-medium">{headline}</p>}
      {description && <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>}

      {!!facts.length && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={`${f.label}-${i}`}
              className="rounded-lg border bg-card p-3 text-sm"
            >
              <p className="text-muted-foreground">{f.label}</p>
              <p className="font-medium">{f.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
