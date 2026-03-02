"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { gameScenarios, shuffleScenarios, GameScenario } from "@/data/game-scenarios";
import { GameStats } from "./game-stats";
import { GameTimer } from "./game-timer";
import { SituationCard } from "./situation-card";
import { GameOver } from "./game-over";

const TIMER_DURATION = 5;
const INITIAL_HEALTH = 3;
const POINTS_PER_CORRECT = 10;

export function GameBoard() {
  const [gameState, setGameState] = useState<"playing" | "gameover">("playing");
  const [scenarios, setScenarios] = useState<GameScenario[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [health, setHealth] = useState(INITIAL_HEALTH);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Initialize game
  useEffect(() => {
    const shuffled = shuffleScenarios(gameScenarios);
    setScenarios(shuffled);
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState !== "playing" || isAnswering) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - wrong answer
          handleTimeout();
          return TIMER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isAnswering]);

  const handleTimeout = () => {
    if (isAnswering) return;
    setIsAnswering(true);
    setCombo(1);
    setHealth((prev) => {
      const newHealth = Math.max(0, prev - 1);
      if (newHealth === 0) {
        setTimeout(endGame, 1500);
      }
      return newHealth;
    });
    toast.error("Hết giờ!", {
      description: "Bạn đã mất 1 máu và combo reset",
      style: { background: "#fee2e2", color: "#991b1b" },
    });
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswering || gameState !== "playing") return;

    setIsAnswering(true);
    setSelectedOption(index);

    const currentScenario = scenarios[currentScenarioIndex];
    const isCorrect = index === currentScenario.correctAnswerIndex;

    if (isCorrect) {
      const points = POINTS_PER_CORRECT * combo;
      const newScore = score + points;
      const newCombo = combo + 1;

      setScore(newScore);
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));

      toast.success("Chính xác!", {
        description: `+${points} điểm (Combo ${newCombo}x)`,
        style: { background: "#dcfce7", color: "#166534" },
      });

      // Move to next scenario after a delay
      setTimeout(() => {
        setCurrentScenarioIndex((prev) => {
          const next = prev + 1;
          if (next >= scenarios.length) {
            // Reshuffle and restart
            const newScenarios = shuffleScenarios(gameScenarios);
            setScenarios(newScenarios);
            return 0;
          }
          return next;
        });
        setTimeRemaining(TIMER_DURATION);
        setIsAnswering(false);
        setSelectedOption(null);
      }, 1500);
    } else {
      setCombo(1);
      setHealth((prev) => {
        const newHealth = Math.max(0, prev - 1);
        if (newHealth === 0) {
          setTimeout(endGame, 1500);
        }
        return newHealth;
      });

      toast.error("Sai rồi!", {
        description: `Đáp án đúng: ${currentScenario.options[currentScenario.correctAnswerIndex].text}`,
        style: { background: "#fee2e2", color: "#991b1b" },
      });

      setTimeout(() => {
        setCurrentScenarioIndex((prev) => {
          const next = prev + 1;
          if (next >= scenarios.length) {
            const newScenarios = shuffleScenarios(gameScenarios);
            setScenarios(newScenarios);
            return 0;
          }
          return next;
        });
        setTimeRemaining(TIMER_DURATION);
        setIsAnswering(false);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const endGame = () => {
    setGameState("gameover");
  };

  const handleRestart = () => {
    setGameState("playing");
    setCurrentScenarioIndex(0);
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setHealth(INITIAL_HEALTH);
    setTimeRemaining(TIMER_DURATION);
    setIsAnswering(false);
    setSelectedOption(null);
    const shuffled = shuffleScenarios(gameScenarios);
    setScenarios(shuffled);
  };

  if (scenarios.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-900 mb-4">Đang Tải Game...</div>
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  const currentScenario = scenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with stats and timer */}
        <div className="mb-8">
          <GameStats score={score} combo={combo} health={health} maxHealth={INITIAL_HEALTH} />
          <div className="flex justify-center mb-8">
            <GameTimer timeRemaining={timeRemaining} totalTime={TIMER_DURATION} />
          </div>
        </div>

        {/* Main game content */}
        <AnimatePresence mode="wait">
          {currentScenario && (
            <SituationCard
              key={currentScenario.id}
              scenario={currentScenario}
              onOptionSelect={handleOptionSelect}
              isAnswering={isAnswering}
              selectedOption={selectedOption}
            />
          )}
        </AnimatePresence>

        {/* Game Over Modal */}
        <AnimatePresence>
          {gameState === "gameover" && (
            <GameOver score={score} combo={maxCombo} onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
