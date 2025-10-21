import { redirect } from 'next/navigation';
export default function Page() {
  // Hard kill: never render Map. Change target if you prefer '/'.
  redirect('/home-v2/dev');
}
