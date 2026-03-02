"use client";

import { motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";

interface GameOverProps {
  score: number;
  combo: number;
  onRestart: () => void;
}

export function GameOver({ score, combo, onRestart }: GameOverProps) {
  const getPerformanceMessage = (score: number): { title: string; message: string; emoji: string } => {
    if (score >= 500) {
      return { title: "Nổ Hũ!", message: "Bạn là nhà kinh tế tài ba!", emoji: "🏆" };
    }
    if (score >= 300) {
      return { title: "Thần Đồng Chốt Đơn!", message: "Bạn hiểu rất rõ quy luật kinh tế!", emoji: "⭐" };
    }
    if (score >= 150) {
      return { title: "Lũm Tiền!", message: "Bạn đang học được những điều tốt!", emoji: "💰" };
    }
    return { title: "Cất Poster Khóc!", message: "Hãy thử lại và học thêm!", emoji: "📚" };
  };

  const performance = getPerformanceMessage(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl"
      >
        {/* Performance Emoji */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl mb-6"
        >
          {performance.emoji}
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-emerald-900 mb-2">{performance.title}</h2>

        {/* Message */}
        <p className="text-lg text-emerald-700 mb-8">{performance.message}</p>

        {/* Stats */}
        <div className="bg-white/50 backdrop-blur-sm border border-emerald-200/50 rounded-2xl p-6 mb-8">
          <div className="flex justify-around items-center">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-1">Điểm Số</p>
              <p className="text-3xl font-bold text-emerald-900">{score}</p>
            </div>
            <div className="w-px h-12 bg-emerald-200" />
            <div>
              <p className="text-sm text-amber-600 font-medium mb-1">Combo Max</p>
              <p className="text-3xl font-bold text-amber-600">{combo}x</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Trophy
                className={`w-6 h-6 ${
                  i < Math.min(5, Math.ceil(score / 100))
                    ? "fill-amber-500 text-amber-500"
                    : "text-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-shadow duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Chơi Lại
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
