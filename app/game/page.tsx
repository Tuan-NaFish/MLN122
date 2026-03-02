"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Toaster } from "sonner";
import {
  ArrowLeft,
  Heart,
  Zap,
  Trophy,
  RotateCcw,
  Timer,
  Sparkles,
  Crown,
  Coins,
  Eye,
  EyeOff,
  X,
  Check,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import {
  gameScenarios,
  shuffleScenarios,
  GameScenario,
} from "@/data/game-scenarios";
import { getRandomMessage } from "@/data/game-over-messages";

// --- Random toast messages ---
const correctMessages = [
  { title: "Xuất sắc!", desc: "Bạn nắm vững kiến thức!" },
  { title: "Chính xác!", desc: "Tuyệt vời, tiếp tục phát huy!" },
  { title: "Đúng rồi!", desc: "Bạn thật thông minh!" },
  { title: "Nổ não!", desc: "Kiến thức kinh tế vững chắc!" },
  { title: "Combo lên!", desc: "Không ai cản được bạn!" },
  { title: "Siêu nhân!", desc: "Đáp án hoàn hảo!" },
  { title: "Quá đỉnh!", desc: "Nhà kinh tế tương lai đây rồi!" },
  { title: "Chuẩn luôn!", desc: "Bạn hiểu rất rõ quy luật này!" },
];

const wrongMessages = [
  { title: "Sai rồi!", desc: "Đừng nản, thử lại nhé!" },
  { title: "Chưa đúng!", desc: "Hãy suy nghĩ kỹ hơn!" },
  { title: "Oops!", desc: "Lần sau sẽ tốt hơn!" },
  { title: "Tiếc quá!", desc: "Suýt nữa đúng rồi!" },
  { title: "Hụt!", desc: "Cố gắng lên bạn nhé!" },
  { title: "Trượt rồi!", desc: "Kiến thức cần ôn thêm!" },
  { title: "Ôi không!", desc: "Đáp án khác kìa!" },
];

const timeoutMessages = [
  { title: "Hết giờ!", desc: "Nhanh tay hơn nào!" },
  { title: "Quá chậm!", desc: "Thời gian không chờ đợi ai!" },
  { title: "Timeout!", desc: "Cần phản xạ nhanh hơn!" },
  { title: "Trễ rồi!", desc: "5 giây trôi qua nhanh quá!" },
  { title: "Lỡ mất!", desc: "Tập trung hơn nhé!" },
];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Constants ---
const TIMER_DURATION = 30;
const INITIAL_HEALTH = 3;
const POINTS_PER_CORRECT = 10;

export default function GamePage() {
  const [gameState, setGameState] = useState<"playing" | "gameover">(
    "playing"
  );
  const [scenarios, setScenarios] = useState<GameScenario[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [health, setHealth] = useState(INITIAL_HEALTH);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [topUpStep, setTopUpStep] = useState<
    "form" | "processing" | "success"
  >("form");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [gameOverMessage, setGameOverMessage] = useState("");

  // Initialize
  useEffect(() => {
    setScenarios(shuffleScenarios(gameScenarios));
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== "playing" || isAnswering || showTopUp) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return TIMER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, isAnswering, showTopUp]);

  const handleTimeout = () => {
    if (isAnswering) return;
    setIsAnswering(true);
    setCombo(1);
    setHealth((prev) => {
      const newHealth = Math.max(0, prev - 1);
      if (newHealth === 0) setTimeout(endGame, 1500);
      return newHealth;
    });
    const msg = randomPick(timeoutMessages);
    toast.error(msg.title, {
      description: `${msg.desc} Mất 1 máu, combo reset!`,
      style: { background: "#fee2e2", color: "#991b1b" },
    });
    advanceQuestion();
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswering || gameState !== "playing") return;
    setIsAnswering(true);
    setSelectedOption(index);
    setQuestionsAnswered((q) => q + 1);

    const currentScenario = scenarios[currentScenarioIndex];
    const isCorrect = index === currentScenario.correctAnswerIndex;

    if (isCorrect) {
      const points = POINTS_PER_CORRECT * combo;
      const newCombo = combo + 1;
      setScore((s) => s + points);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));

      const msg = randomPick(correctMessages);
      toast.success(msg.title, {
        description: `${msg.desc} +${points} điểm (Combo ${newCombo}x)`,
        style: { background: "#dcfce7", color: "#166534" },
      });
    } else {
      setCombo(1);
      setHealth((prev) => {
        const newHealth = Math.max(0, prev - 1);
        if (newHealth === 0) setTimeout(endGame, 1500);
        return newHealth;
      });

      const msg = randomPick(wrongMessages);
      toast.error(msg.title, {
        description: `${msg.desc} Đáp án: ${currentScenario.options[currentScenario.correctAnswerIndex].text}`,
        style: { background: "#fee2e2", color: "#991b1b" },
      });
    }

    advanceQuestion();
  };

  const advanceQuestion = () => {
    setTimeout(() => {
      setCurrentScenarioIndex((prev) => {
        const next = prev + 1;
        if (next >= scenarios.length) {
          setScenarios(shuffleScenarios(gameScenarios));
          return 0;
        }
        return next;
      });
      setTimeRemaining(TIMER_DURATION);
      setIsAnswering(false);
      setSelectedOption(null);
    }, 1500);
  };

  const endGame = () => {
    setGameOverMessage(getRandomMessage(score >= 150));
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
    setQuestionsAnswered(0);
    setShowAnswers(false);
    setScenarios(shuffleScenarios(gameScenarios));
  };

  const handleTopUp = () => {
    setShowTopUp(true);
    setTopUpStep("form");
    setSelectedAmount(0);
  };

  const handleTopUpSubmit = () => {
    setTopUpStep("processing");
    setTimeout(() => {
      setTopUpStep("success");
      setTimeout(() => {
        setShowTopUp(false);
        setShowAnswers(true);
        toast.success("Nạp tiền thành công!", {
          description: "Bạn đã mở khóa tất cả đáp án!",
          style: { background: "#dcfce7", color: "#166534" },
        });
      }, 1500);
    }, 2000);
  };

  // Loading
  if (scenarios.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full mx-auto mb-6"
          />
          <p className="text-emerald-300 text-xl font-medium">
            Đang tải trò chơi...
          </p>
        </motion.div>
      </div>
    );
  }

  const currentScenario = scenarios[currentScenarioIndex];
  const timerPercent = (timeRemaining / TIMER_DURATION) * 100;
  const isWarning = timeRemaining <= 2;

  const getLawLabel = (law: string) => {
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

  const getLawColor = (law: string) => {
    switch (law) {
      case "supply_demand":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "value":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "competition":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      default:
        return "";
    }
  };

  const getPerformance = (s: number) => {
    if (s >= 500)
      return {
        title: "Nổ Hũ!",
        message: "Bạn là nhà kinh tế tài ba!",
        emoji: "🏆",
        gradient: "from-yellow-400 to-amber-600",
      };
    if (s >= 300)
      return {
        title: "Thần Đồng!",
        message: "Bạn hiểu rất rõ quy luật kinh tế!",
        emoji: "⭐",
        gradient: "from-emerald-400 to-teal-600",
      };
    if (s >= 150)
      return {
        title: "Khá Lắm!",
        message: "Bạn đang tiến bộ rất tốt!",
        emoji: "💰",
        gradient: "from-blue-400 to-indigo-600",
      };
    return {
      title: "Cố Lên!",
      message: "Hãy thử lại và học thêm!",
      emoji: "📚",
      gradient: "from-slate-400 to-slate-600",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Top bar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium hidden sm:inline">
            Về Trang Chủ
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Top-up button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTopUp}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              showAnswers
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25"
            }`}
          >
            {showAnswers ? (
              <>
                <Eye className="w-4 h-4" />
                Đã Mở Khóa
              </>
            ) : (
              <>
                <Coins className="w-4 h-4" />
                Nạp Tiền
              </>
            )}
          </motion.button>

          {/* Toggle answers visibility */}
          {showAnswers && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAnswers(!showAnswers)}
              className="p-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
              title="Ẩn đáp án"
            >
              <EyeOff className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Stats bar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 mx-4 md:mx-8 mb-6"
      >
        <div className="flex items-center justify-between gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5">
          {/* Score */}
          <div className="flex-1 text-center">
            <p className="text-[10px] sm:text-xs text-emerald-400/80 font-medium uppercase tracking-wider mb-1">
              Điểm
            </p>
            <motion.p
              key={score}
              animate={{ scale: [1, 1.2, 1] }}
              className="text-2xl md:text-3xl font-black text-white"
            >
              {score}
            </motion.p>
          </div>

          <div className="w-px h-10 bg-white/10" />

          {/* Combo */}
          <div className="flex-1 text-center">
            <p className="text-[10px] sm:text-xs text-amber-400/80 font-medium uppercase tracking-wider mb-1">
              Combo
            </p>
            <motion.div
              key={combo}
              animate={
                combo > 1
                  ? { scale: [1, 1.3, 1], color: ["#fbbf24", "#f59e0b"] }
                  : {}
              }
              className="text-2xl md:text-3xl font-black text-amber-400 flex items-center justify-center gap-1"
            >
              {combo}x
              {combo > 2 && (
                <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
              )}
            </motion.div>
          </div>

          <div className="w-px h-10 bg-white/10" />

          {/* Health */}
          <div className="flex-1 text-center">
            <p className="text-[10px] sm:text-xs text-rose-400/80 font-medium uppercase tracking-wider mb-1">
              Máu
            </p>
            <div className="flex gap-1.5 justify-center">
              {Array.from({ length: INITIAL_HEALTH }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={
                    i >= health
                      ? { scale: [1, 0.5, 0], opacity: [1, 0.5, 0.3] }
                      : {}
                  }
                >
                  <Heart
                    className={`w-6 h-6 md:w-7 md:h-7 transition-all ${
                      i < health
                        ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                        : "text-white/10"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timer */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative z-10 flex justify-center mb-6"
      >
        <motion.div
          animate={isWarning ? { scale: [1, 1.1, 1] } : {}}
          transition={isWarning ? { repeat: Infinity, duration: 0.5 } : {}}
          className="relative"
        >
          <svg className="w-20 h-20 md:w-24 md:h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="6"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="6"
              stroke={isWarning ? "#ef4444" : "#34d399"}
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - timerPercent / 100)}`}
              style={{
                filter: isWarning
                  ? "drop-shadow(0 0 8px rgba(239,68,68,0.5))"
                  : "drop-shadow(0 0 8px rgba(52,211,153,0.3))",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-3xl md:text-4xl font-black ${
                isWarning ? "text-red-400" : "text-emerald-300"
              }`}
            >
              {timeRemaining}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Question card */}
      <div className="relative z-10 px-4 md:px-8 max-w-2xl mx-auto pb-8">
        <AnimatePresence mode="wait">
          {currentScenario && (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Situation */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      {currentScenario.situation}
                    </h2>
                  </div>
                </div>
                <p className="text-emerald-200/70 leading-relaxed ml-12">
                  {currentScenario.context}
                </p>

                {/* Show answer hint if top-up activated */}
                {showAnswers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 ml-12 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                  >
                    <p className="text-amber-400 text-sm font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Đáp án:{" "}
                      <span className="text-amber-300 font-bold">
                        {
                          currentScenario.options[
                            currentScenario.correctAnswerIndex
                          ].text
                        }
                      </span>
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Question prompt */}
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 mb-4 text-center">
                <p className="text-amber-300 font-semibold text-sm md:text-base">
                  Quy luật kinh tế nào giải thích tình huống này?
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentScenario.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect =
                    index === currentScenario.correctAnswerIndex;
                  const showResult = isAnswering;
                  const isHighlighted = showAnswers && isCorrect;

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => !isAnswering && handleOptionSelect(index)}
                      disabled={isAnswering}
                      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                        showResult && isSelected && isCorrect
                          ? "bg-emerald-500/20 border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                          : showResult && isSelected && !isCorrect
                            ? "bg-red-500/20 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-shake"
                            : showResult && isCorrect
                              ? "bg-emerald-500/10 border-emerald-400/30"
                              : isHighlighted
                                ? "bg-amber-500/10 border-amber-400/30 hover:bg-amber-500/20"
                                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                      } disabled:cursor-default`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            showResult && isCorrect
                              ? "bg-emerald-500 text-white"
                              : showResult && isSelected && !isCorrect
                                ? "bg-red-500 text-white"
                                : "bg-white/10 text-white/60"
                          }`}
                        >
                          {showResult && isSelected ? (
                            isCorrect ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )
                          ) : showResult && isCorrect ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm md:text-base">
                            {option.text}
                          </p>
                          <span
                            className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${getLawColor(option.law)}`}
                          >
                            {getLawLabel(option.law)}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation after answering */}
              <AnimatePresence>
                {isAnswering && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                      <p className="text-blue-300 text-sm leading-relaxed">
                        <span className="font-bold text-blue-400">
                          Giải thích:{" "}
                        </span>
                        {currentScenario.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Over */}
      <AnimatePresence>
        {gameState === "gameover" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl"
            >
              {(() => {
                const perf = getPerformance(score);
                return (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-7xl mb-4"
                    >
                      {perf.emoji}
                    </motion.div>

                    <h2
                      className={`text-4xl font-black bg-gradient-to-r ${perf.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      {perf.title}
                    </h2>
                    <p className="text-white/60 text-lg mb-4">{perf.message}</p>
                    <p className="text-white/40 text-sm italic mb-8">
                      &ldquo;{gameOverMessage}&rdquo;
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      <div className="bg-white/5 rounded-xl p-4">
                        <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                        <p className="text-2xl font-black text-white">
                          {score}
                        </p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                          Điểm
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                        <p className="text-2xl font-black text-white">
                          {maxCombo}x
                        </p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                          Max Combo
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <Timer className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                        <p className="text-2xl font-black text-white">
                          {questionsAnswered}
                        </p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                          Câu Hỏi
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <Crown
                            className={`w-7 h-7 ${
                              i < Math.min(5, Math.ceil(score / 100))
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                                : "text-white/10"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRestart}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Chơi Lại
                      </motion.button>
                      <Link
                        href="/"
                        className="block w-full bg-white/5 border border-white/10 text-white/70 font-medium py-3.5 rounded-xl hover:bg-white/10 transition-all text-center"
                      >
                        Về Trang Chủ
                      </Link>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-up Modal */}
      <AnimatePresence>
        {showTopUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl"
            >
              {topUpStep === "form" && (
                <>
                  <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl w-fit mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Nạp Tiền VIP
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    Nạp để xem toàn bộ đáp án các câu hỏi
                  </p>

                  {/* Amount options */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {["50,000đ", "100,000đ", "200,000đ", "500,000đ"].map(
                      (amount, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedAmount(i)}
                          className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                            selectedAmount === i
                              ? "bg-amber-500/20 border-amber-400/50 text-amber-400"
                              : "bg-white/5 border-white/10 text-white/60 hover:border-amber-400/30"
                          }`}
                        >
                          {amount}
                        </button>
                      )
                    )}
                  </div>

                  {/* Fake card input */}
                  <div className="space-y-3 mb-6 text-left">
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                        Số thẻ
                      </label>
                      <div className="mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm">
                        **** **** **** 1234
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                          Hết hạn
                        </label>
                        <div className="mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm">
                          12/28
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider font-medium">
                          CVV
                        </label>
                        <div className="mt-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm">
                          ***
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleTopUpSubmit}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all mb-3"
                  >
                    Nạp Ngay
                  </motion.button>
                  <button
                    onClick={() => setShowTopUp(false)}
                    className="w-full text-white/40 text-sm py-2 hover:text-white/60 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                </>
              )}

              {topUpStep === "processing" && (
                <div className="py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-400 rounded-full mx-auto mb-6"
                  />
                  <p className="text-white text-lg font-medium">
                    Đang xử lý...
                  </p>
                  <p className="text-white/40 text-sm mt-2">
                    Vui lòng chờ trong giây lát
                  </p>
                </div>
              )}

              {topUpStep === "success" && (
                <div className="py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-2">
                    Thành Công!
                  </h3>
                  <p className="text-white/50 text-sm">
                    Đáp án đã được mở khóa
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster
        position="top-center"
        theme="dark"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}
