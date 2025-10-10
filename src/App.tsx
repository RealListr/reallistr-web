import "./index.css";
import AuthGate from "@/auth/AuthGate";
import RealListrDashboardDarkPreview from "@/components/dashboard/RealListrDashboardDarkPreview";

export default function App() {
  return (
    <AuthGate>
      <RealListrDashboardDarkPreview />
    </AuthGate>
  );
}
