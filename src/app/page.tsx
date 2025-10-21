export default function Home() {
  // Minimal safe feed shell; real feed will replace this in Pass 1.
  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-semibold">RealListr</h1>
      <p className="text-muted-foreground">
        Feed is loading… (Map moved to /map)
      </p>
    </main>
  );
}
