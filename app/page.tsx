// ✅ app/page.tsx (Result 컴포넌트로 전환 렌더)
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Result from "./components/Result";

const quizData: Record<string, any> = {
  romance: {
    title: "연애 ❤️",
    q1: "연애를 시작할 때 나는?",
    options1: [
      "내가 먼저 다가간다",
      "천천히 접근한다",
      "누군가 다가와야 시작한다",
    ],
    q2: "연애 중 갈등이 생기면 나는?",
    options2: [
      "논리적으로 해결한다",
      "감정을 솔직히 표현한다",
      "갈등을 피한다",
    ],
  },
  social: {
    title: "인간관계 👥",
    q1: "처음 만난 사람과 대화할 때 나는?",
    options1: [
      "내가 먼저 말을 건다",
      "상대 말을 듣고 반응한다",
      "조용히 관찰한다",
    ],
    q2: "친구와 갈등이 생기면 나는?",
    options2: ["솔직히 말한다", "감정을 고려해 대화한다", "피하거나 기다린다"],
  },
  career: {
    title: "진로(취업) 💼",
    q1: "미래를 계획할 때 나는?",
    options1: [
      "목표를 세우고 실행한다",
      "여러 가능성을 고민한다",
      "편한 길을 찾는다",
    ],
    q2: "문제가 생기면 나는?",
    options2: ["즉시 해결책을 찾는다", "감정을 조절하며 대응", "흐름에 맡긴다"],
  },
};

const enneagramMap: Record<string, { label: string; image: string }> = {
  "1-1": { label: "3번 (성취자)", image: "/result/3.png" },
  "1-2": { label: "2번 (조력자)", image: "/result/2.png" },
  "1-3": { label: "4번 (예술가)", image: "/result/4.png" },
  "2-1": { label: "5번 (탐구자)", image: "/result/5.png" },
  "2-2": { label: "6번 (회의주의자)", image: "/result/6.png" },
  "2-3": { label: "7번 (낙천가)", image: "/result/7.png" },
  "3-1": { label: "1번 (완벽주의자)", image: "/result/1.png" },
  "3-2": { label: "8번 (도전자)", image: "/result/8.png" },
  "3-3": { label: "9번 (평화주의자)", image: "/result/9.png" },
};

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState<string>("");
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);

  const quiz = topic ? quizData[topic] : null;
  const result = q1 && q2 ? enneagramMap[`${q1}-${q2}`] : null;

  const handleTopic = (value: string) => {
    setTopic(value);
    setStep(1);
  };

  const handleAnswer = (index: number) => {
    if (step === 1) {
      setQ1(index + 1);
      setStep(2);
    } else if (step === 2) {
      setQ2(index + 1);
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c15] text-white flex flex-col items-center px-6 py-4 relative overflow-hidden">
      <header className="w-full max-w-4xl flex justify-between items-center py-4 px-2">
        <Image src="/logo.svg" alt="logo" width={100} height={30} />
        <nav className="text-sm text-gray-400">POPTICLE</nav>
      </header>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="topics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center mt-10"
          >
            <Image
              src="/logo_character.png"
              alt="logo character"
              width={180}
              height={180}
              className="mx-auto mb-6"
            />
            <h1 className="text-2xl font-extrabold text-white mb-3">
              📌 에니어그램 유형 분석
            </h1>
            <p className="mb-6 text-sm text-gray-400">
              🎯 STEP 1. 관심 있는 주제를 선택하세요!
            </p>
            <div className="grid gap-4">
              {Object.entries(quizData).map(([key, q]) => (
                <button
                  key={key}
                  onClick={() => handleTopic(key)}
                  className="bg-[#e25a6e] text-white py-3 rounded-full shadow-md hover:brightness-110 transition"
                >
                  {q.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step > 0 && step < 3 && quiz && (
          <motion.div
            key={`question-${step}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-[#1a1a26] shadow-xl rounded-3xl p-8 text-center mt-8"
          >
            <div className="mb-4 text-sm text-gray-400">STEP {step + 1}/3</div>
            <h2 className="text-lg font-semibold mb-6 text-white">
              {step === 1 ? quiz.q1 : quiz.q2}
            </h2>
            <div className="flex flex-col gap-4">
              {(step === 1 ? quiz.options1 : quiz.options2).map(
                (opt: string, i: number) => (
                  <button
                    key={i}
                    className="bg-[#e25a6e] text-white py-3 rounded-full shadow-md hover:scale-105 transition"
                    onClick={() => handleAnswer(i)}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step === 3 && result && (
        <Result
          label={result.label}
          image={result.image}
          onRestart={() => {
            setStep(0);
            setTopic("");
            setQ1(null);
            setQ2(null);
          }}
        />
      )}
    </div>
  );
}
