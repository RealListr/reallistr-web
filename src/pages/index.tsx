import Rail from "@/components/rail/Rail";
import FloorPlanOverlay from "@/components/rail/FloorPlanOverlay";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>RealListr</h1>
      <p>Stable homepage + Floor Plan overlay.</p>

      <Rail />
      <FloorPlanOverlay />
    </main>
  );
}
