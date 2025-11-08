// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>RealListr</h1>
      <p><Link href="/connection-centre">Go to Connection Centre</Link></p>
    </main>
  );
}
