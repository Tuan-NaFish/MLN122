"use client";

import { motion } from "framer-motion";
import { Heart, Zap } from "lucide-react";

interface GameStatsProps {
  score: number;
  combo: number;
  health: number;
  maxHealth: number;
}

export function GameStats({ score, combo, health, maxHealth }: GameStatsProps) {
  return (
    <div className="flex items-center justify-between gap-6 mb-8 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl p-6">
      {/* Score */}
      <div className="flex-1">
        <p className="text-sm text-emerald-600 font-medium mb-1">Điểm Số</p>
        <motion.div
          key={score}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-emerald-900"
        >
          {score}
        </motion.div>
      </div>

      {/* Combo */}
      <div className="flex-1">
        <p className="text-sm text-amber-600 font-medium mb-1">Combo</p>
        <motion.div
          key={combo}
          animate={combo > 1 ? { scale: [1, 1.15, 1], color: "#f59e0b" } : {}}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-amber-600 flex items-center gap-2"
        >
          {combo}x
          {combo > 1 && <Zap className="w-6 h-6 text-amber-500 animate-pulse" />}
        </motion.div>
      </div>

      {/* Health */}
      <div className="flex-1">
        <p className="text-sm text-red-600 font-medium mb-2">Máu Sống</p>
        <div className="flex gap-2">
          {Array.from({ length: maxHealth }).map((_, index) => (
            <motion.div
              key={index}
              initial={index >= health ? { scale: 0 } : {}}
              animate={index >= health ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Heart
                className={`w-6 h-6 ${index < health ? "fill-red-500 text-red-500" : "text-red-200"}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
