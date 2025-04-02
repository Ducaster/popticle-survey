// ✅ app/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Result from "./components/Result";
import ResultExplain from "./components/ResultExplain";
import FollowUp from "./components/FollowUp";

// ✅ 애니어그램 질문 데이터
const quizData = {
  romance: {
    title: "연애 ❤️",
    questions: [
      {
        question: "연애를 시작할 때 나는?",
        options: [
          { text: "주도적으로 상대방에게 다가간다", types: [3, 8] },
          { text: "상대방의 신호를 기다리며 천천히 접근한다", types: [2, 6] },
          { text: "자연스럽게 상황이 흘러가길 기다린다", types: [9] },
        ],
      },
      {
        question: "갈등 상황에서 나는?",
        options: [
          { text: "직접적으로 문제를 해결하려 한다", types: [1, 8] },
          {
            text: "상대방을 배려하며 대화를 통해 해결한다",
            types: [2, 4],
          },
          { text: "시간이 해결해주길 기다린다", types: [5, 9] },
        ],
      },
      {
        question: "애정 표현 방식은?",
        options: [
          { text: "직접적이고 자주 표현한다", types: [3, 7] },
          { text: "상황에 맞게 조율하며 표현한다", types: [6, 9] },
          { text: "속마음을 드러내는 데 시간이 걸린다", types: [5, 4] },
        ],
      },
    ],
  },
  social: {
    title: "인간관계 👥",
    questions: [
      {
        question: "처음 만난 사람과의 거리감은?",
        options: [
          { text: "먼저 다가가며 친근하게 대한다", types: [2, 7] },
          { text: "상대방의 반응을 보며 조심스럽게 접근한다", types: [6, 9] },
          { text: "거리를 두고 관찰한다", types: [5, 1] },
        ],
      },
      {
        question: "친구들과의 문제 발생 시 나는?",
        options: [
          { text: "솔직하게 내 의견을 말한다", types: [8, 1] },
          { text: "상황을 분석하며 신중하게 대처한다", types: [5, 6] },
          { text: "분쟁을 피하며 조용히 넘어간다", types: [9] },
        ],
      },
      {
        question: "인간관계에서 가장 중요한 요소는?",
        options: [
          { text: "신뢰와 책임감", types: [1, 6] },
          { text: "공감과 소통", types: [2, 4] },
          { text: "자유롭고 편안한 분위기", types: [7, 9] },
        ],
      },
    ],
  },
  career: {
    title: "진로(취업) 💼",
    questions: [
      {
        question: "업무 계획 스타일은?",
        options: [
          { text: "목표를 빠르게 설정하고 추진한다", types: [3, 8] },
          { text: "여러 옵션을 검토하며 신중히 결정한다", types: [6, 5] },
          { text: "직관적으로 느긋하게 움직인다", types: [9] },
        ],
      },
      {
        question: "문제 해결 방식은?",
        options: [
          { text: "즉시 문제를 파악하고 해결한다", types: [1, 3] },
          { text: "조율하며 협력적인 해결책을 찾는다", types: [2, 6] },
          { text: "상황이 자연스럽게 풀리길 기다린다", types: [5, 9] },
        ],
      },
      {
        question: "업무에서 중요하게 여기는 건?",
        options: [
          { text: "성과와 인정", types: [3, 8] },
          { text: "안정감과 소통", types: [6, 2] },
          { text: "창의성과 유연함", types: [7, 4] },
        ],
      },
    ],
  },
};

// ✅ 애니어그램 유형 데이터
const enneagramMap = {
  1: {
    label: "1번 (완벽주의자)",
    image: "/result/1.png",
    description: "원칙과 책임을 중요시하며 질서를 추구합니다.",
  },
  2: {
    label: "2번 (조력자)",
    image: "/result/2.png",
    description: "따뜻하고 배려 깊으며 타인의 감정을 잘 살핍니다.",
  },
  3: {
    label: "3번 (성취자)",
    image: "/result/3.png",
    description: "목표지향적이며 성공을 위해 헌신하는 유형입니다.",
  },
  4: {
    label: "4번 (예술가)",
    image: "/result/4.png",
    description: "감성이 풍부하고 독창성을 중요하게 생각합니다.",
  },
  5: {
    label: "5번 (탐구자)",
    image: "/result/5.png",
    description: "분석적이고 깊이 있는 사고를 즐기는 스타일입니다.",
  },
  6: {
    label: "6번 (충성가)",
    image: "/result/6.png",
    description: "신뢰와 안전을 중시하며 체계적인 사고를 합니다.",
  },
  7: {
    label: "7번 (낙천가)",
    image: "/result/7.png",
    description: "유쾌하고 긍정적인 에너지로 다양한 경험을 추구합니다.",
  },
  8: {
    label: "8번 (도전자)",
    image: "/result/8.png",
    description:
      "강한 의지와 리더십을 발휘하며 어려운 상황에서도 대담하게 행동합니다.",
  },
  9: {
    label: "9번 (평화주의자)",
    image: "/result/9.png",
    description:
      "조화와 평화를 중시하며 갈등을 피하고 편안한 분위기를 선호합니다.",
  },
};

// Option 타입 정의 추가
type Option = {
  text: string;
  types: number[];
};

// TopicKey 타입 정의 추가
type TopicKey = keyof typeof quizData;

// ✅ 결과 분석 로직
const calculateEnneagramType = (
  answers: Option[]
): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 => {
  const typeScores = Array(9).fill(0);

  answers.forEach((answer) => {
    answer.types.forEach((type) => {
      typeScores[type - 1] += 1;
    });
  });

  const maxScore = Math.max(...typeScores);
  return (typeScores.indexOf(maxScore) + 1) as
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9;
};

export default function QuizPage() {
  const [step, setStep] = useState<number>(0);
  const [topic, setTopic] = useState<TopicKey | "">("");
  const [answers, setAnswers] = useState<Option[]>([]);
  const [showResultExplain, setShowResultExplain] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const quiz = topic ? quizData[topic] : null;

  const resultType = calculateEnneagramType(answers);
  const result = enneagramMap[resultType];

  const handleTopic = (value: TopicKey) => {
    setTopic(value);
    setStep(1);
  };

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (step < (quiz?.questions.length || 0)) {
      setStep(step + 1);
    } else {
      // 마지막 질문일 경우에도 step 증가시켜 결과 보여주도록
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      setTopic("");
      setStep(0);
      setAnswers([]);
    } else {
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c15] text-white flex flex-col items-center px-6 py-4 relative overflow-hidden">
      <header className="w-full max-w-4xl flex justify-between items-center py-4 px-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={24}
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        />
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
            className="w-full max-w-md text-center mt-4"
          >
            <Image
              src="/logo_character.png"
              alt="logo character"
              width={160}
              height={160}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-extrabold text-white mb-2">
              📌 애니어그램 유형 분석
            </h1>
            <p className="mb-4 text-sm text-gray-400">
              🎯 STEP 1. 관심 있는 주제를 선택하세요!
            </p>
            <div className="grid gap-3">
              {Object.entries(quizData).map(([key, q]) => (
                <button
                  key={key}
                  onClick={() => handleTopic(key as TopicKey)}
                  className="bg-[#e25a6e] text-white py-3 rounded-full shadow-md hover:brightness-110 transition"
                >
                  {q.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step > 0 && step <= (quiz?.questions.length || 0) && quiz && (
          <motion.div
            key={`question-${step}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-[#1a1a26] shadow-xl rounded-3xl p-8 text-center mt-8"
          >
            <div className="mb-4 text-sm text-gray-400">
              STEP {step}/{quiz.questions.length}
            </div>
            <h2 className="text-lg font-semibold mb-6 text-white">
              {quiz.questions[step - 1].question}
            </h2>
            <div className="flex flex-col gap-4">
              {quiz.questions[step - 1].options.map((opt, i) => (
                <button
                  key={i}
                  className="bg-[#e25a6e] text-white py-3 rounded-full shadow-md hover:scale-105 transition"
                  onClick={() => handleAnswer(opt)}
                >
                  {opt.text}
                </button>
              ))}
              <button
                onClick={handleBack}
                className="mt-6 text-sm text-gray-400 underline hover:text-white"
              >
                ← 이전 단계로 돌아가기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step > (quiz?.questions.length || 0) &&
        result &&
        !showResultExplain &&
        !showFollowUp && (
          <Result
            label={result.label}
            image={result.image}
            description={result.description}
            onNextStep={() => setShowResultExplain(true)}
          />
        )}

      {showResultExplain && !showFollowUp && (
        <ResultExplain onContinue={() => setShowFollowUp(true)} />
      )}

      {showFollowUp && <FollowUp />}
    </div>
  );
}
