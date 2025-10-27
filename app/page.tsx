import { redirect } from "next/navigation";
export default function Home() {
  // CHANGE THIS to whatever route is your real homepage:
  // e.g. "/feed" or "/map" or "/p/info"
  redirect("/map");
}
