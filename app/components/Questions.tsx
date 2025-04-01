"use client";

import React from "react";

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const Question = ({ question, options, onAnswer }: QuestionProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">{question}</h2>
      <div className="flex flex-col gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
