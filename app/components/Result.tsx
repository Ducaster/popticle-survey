// ✅ app/components/Result.tsx (계속 버튼으로 설명 컴포넌트로 연결)
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Result({
  label,
  image,
  description,
  onNextStep,
}: {
  label: string;
  image: string;
  description: string;
  onNextStep: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen bg-[#0c0c15] flex justify-center items-center px-4 py-12 absolute top-0 left-0 w-full z-50"
      >
        <div className="bg-[#1a1a26] text-white p-8 rounded-2xl text-center max-w-md shadow-lg w-full">
          <Image
            src={image}
            alt={label}
            width={160}
            height={160}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2 text-[#f4e14c]">{label}</h1>
          <p className="text-sm text-gray-300 mb-4">{description}</p>
          <button
            className="mt-4 bg-[#f4e14c] text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-300"
            onClick={onNextStep}
          >
            다음
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
