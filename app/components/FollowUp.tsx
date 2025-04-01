"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FollowUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    availability: "",
    contact: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("📤 제출할 데이터:", form);

    try {
      const query = new URLSearchParams(form).toString();
      const url = `https://script.google.com/macros/s/AKfycbwUSXVFtC79Y_buKOcAleRTaIxiR0iq01hMOzcSvBJBUoWyz6nZfLEBkQpokDN58wKTYA/exec?${query}`;

      const res = await fetch(url);

      console.log("📥 응답 상태:", res.status);
      const result = await res.text();
      console.log("📄 응답 내용:", result);

      if (res.ok) {
        setIsSubmitted(true);
        setForm({
          name: "",
          age: "",
          location: "",
          availability: "",
          contact: "",
        });
      } else {
        alert("제출에 실패했어요 😢 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("❌ 네트워크 오류 발생:", error);
      alert("네트워크 오류가 발생했어요. 콘솔 로그를 확인해보세요!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c15] text-white flex flex-col items-center px-4 pt-16 relative">
      <Image
        src="/next_step.png"
        alt="next"
        width={180}
        height={180}
        className="mb-4"
      />
      <h2 className="text-xl font-semibold mb-6 text-center">
        당신의 이야기를 더 들려주세요
      </h2>
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        {["name", "age", "location", "availability", "contact"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "age" ? "number" : "text"}
            placeholder={
              {
                name: "이름",
                age: "나이",
                location: "사는 곳",
                availability: "가능한 요일과 시간",
                contact: "연락처 (카카오톡/전화 등)",
              }[field]
            }
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
            required
          />
        ))}
        <button
          type="submit"
          className="mt-2 bg-[#f4e14c] text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 w-full disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "제출하는 중..." : "제출하기"}
        </button>
      </form>

      {/* ✅ 성공 모달 */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          >
            <div className="bg-[#1a1a26] p-6 rounded-2xl max-w-sm w-full text-center">
              <Image
                src="/popticle_qr.jpg"
                alt="success"
                width={300}
                height={300}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-[#f4e14c] mb-2">
                제출 완료!
              </h3>
              <p className="text-sm text-white mb-4">
                소중한 정보 감사합니다 🙏
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  window.location.reload();
                }}
                className="bg-[#f4e14c] text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-300"
              >
                새로 시작하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
