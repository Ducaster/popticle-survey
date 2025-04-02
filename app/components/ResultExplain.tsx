// ✅ app/components/ResultExplain.tsx
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultExplain({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="result-explain"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-screen bg-[#0c0c15] flex justify-center items-center px-4 py-12 absolute top-0 left-0 w-full z-50"
      >
        <div className="bg-[#1a1a26] text-white p-8 rounded-2xl text-center max-w-md shadow-lg w-full">
          <Image
            src="/spring_me.png" // 결과 설명용 이미지 (public에 있어야 함)
            alt="spring_me"
            width={400}
            height={400}
            className="mx-auto mb-6"
          />
          <h2 className="text-xl font-semibold mb-2">🤩스프링:미 프로젝트🤩</h2>
          <p className="text-sm text-gray-300 mb-6">
            🔸3단계에 걸친 구체화된 커리큘럼으로 실질적인 해결책을 제시합니다!
            <br></br>
            🔸협업 기간(4/1~4/13) 동안 참여해주신 분들께는 무료 퍼스널브랜딩의
            기회를 제공드립니다!
          </p>
          <button
            onClick={onContinue}
            className="mt-2 bg-[#f4e14c] text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-300"
          >
            다음
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
