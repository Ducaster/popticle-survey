"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const answers = searchParams.get("answers")?.split(",") ?? [];

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">설문 결과</h1>
      <ul className="list-disc text-left space-y-2">
        {answers.map((ans, idx) => (
          <li key={idx}>{ans}</li>
        ))}
      </ul>
    </main>
  );
}
