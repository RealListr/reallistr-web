import { redirect } from "next/navigation";
export default function Home() {
  redirect("/dash"); // CHANGE to your true feed route if different
}
