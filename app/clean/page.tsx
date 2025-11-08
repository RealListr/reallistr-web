import MainFeederCard from "@/components/MainFeederCard";

export default function Clean() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Clean</h1>
      <MainFeederCard defaultSource="EN" defaultTarget="ZH" />
    </main>
  );
}
