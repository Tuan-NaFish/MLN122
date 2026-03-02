"use client";

import { motion } from "framer-motion";

interface GameTimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function GameTimer({ timeRemaining, totalTime }: GameTimerProps) {
  const percentage = (timeRemaining / totalTime) * 100;
  const isWarning = timeRemaining <= 2;

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-20 h-20"
        animate={isWarning ? { scale: [1, 1.1, 1] } : {}}
        transition={isWarning ? { repeat: Infinity, duration: 0.6 } : {}}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(226, 232, 240, 0.3)" strokeWidth="4" />

          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            stroke={isWarning ? "#ef4444" : "#22c55e"}
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            transition={{ duration: 0.1 }}
          />
        </svg>

        {/* Time text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${isWarning ? "text-red-500" : "text-emerald-700"}`}>
            {timeRemaining}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
