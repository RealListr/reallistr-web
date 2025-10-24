// Server redirect to stable feed while we triage the client error on "/"
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
export default function Page() {
  redirect('/clean');
}
