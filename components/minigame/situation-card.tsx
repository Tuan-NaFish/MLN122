"use client";

import { motion } from "framer-motion";
import { GameScenario } from "@/data/game-scenarios";

interface SituationCardProps {
  scenario: GameScenario;
  onOptionSelect: (index: number) => void;
  isAnswering: boolean;
  selectedOption: number | null;
}

export function SituationCard({
  scenario,
  onOptionSelect,
  isAnswering,
  selectedOption,
}: SituationCardProps) {
  const getLawLabel = (law: string): string => {
    switch (law) {
      case "supply_demand":
        return "Cung - Cầu";
      case "value":
        return "Giá Trị";
      case "competition":
        return "Cạnh Tranh";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200/50 rounded-2xl p-8 backdrop-blur-sm"
    >
      {/* Situation Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-3 text-balance">{scenario.situation}</h3>
        <p className="text-emerald-700 leading-relaxed mb-6">{scenario.context}</p>
      </motion.div>

      {/* Question */}
      <div className="mb-8 p-4 bg-amber-100/50 border border-amber-200/50 rounded-lg">
        <p className="text-emerald-900 font-semibold">Quy luật kinh tế nào giải thích tình huống này?</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {scenario.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === scenario.correctAnswerIndex;
          const showResult = isSelected && !isAnswering;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => !isAnswering && onOptionSelect(index)}
              disabled={isAnswering}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 ${
                isSelected
                  ? showResult
                    ? isCorrect
                      ? "bg-green-100 border-green-500 shadow-lg"
                      : "bg-red-100 border-red-500 shadow-lg animate-shake"
                    : "bg-emerald-200 border-emerald-500"
                  : "bg-white/50 border-emerald-200/50 hover:border-emerald-400"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-emerald-900">{option.text}</p>
                  <p className="text-sm text-emerald-700 mt-1">Quy luật: {getLawLabel(option.law)}</p>
                </div>
                {showResult && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-2xl flex-shrink-0 ${isCorrect ? "text-green-500" : "text-red-500"}`}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
