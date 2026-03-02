"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Star } from "lucide-react";

interface FlashCard {
  id: number;
  statement: string;
  type: "concrete" | "abstract";
  isTrue: boolean;
  explanation: string;
}

const CARDS: FlashCard[] = [
  {
    id: 1,
    statement: "Việc nông dân cày bừa, san phẳng ruộng trước khi gieo mạ là lao động cụ thể.",
    type: "concrete", isTrue: true,
    explanation: "Đúng. Cày bừa là công việc hữu hình, có kỹ thuật riêng, tạo ra kết quả cụ thể: đất ruộng được chuẩn bị để gieo trồng.",
  },
  {
    id: 2,
    statement: "Lao động trừu tượng phân biệt rõ giữa lao động nông nghiệp và công nghiệp.",
    type: "abstract", isTrue: false,
    explanation: "Sai. Lao động trừu tượng gạt bỏ mọi hình thức cụ thể, chỉ còn lại sự hao phí sức lao động (cơ bắp + thần kinh). Nó KHÔNG phân biệt loại công việc.",
  },
  {
    id: 3,
    statement: "Kỹ sư lai tạo giống lúa ST25 thực hiện lao động phức tạp — bằng bội số lao động giản đơn.",
    type: "abstract", isTrue: true,
    explanation: "Đúng. Lao động phức tạp = lao động giản đơn × hệ số nhân. Đây lý giải tại sao gạo ST25 có giá trị cao hơn gạo thường.",
  },
  {
    id: 4,
    statement: "Phun thuốc trừ sâu và bón phân là lao động trừu tượng vì chúng tạo ra giá trị hàng hóa.",
    type: "abstract", isTrue: false,
    explanation: "Sai. Phun thuốc & bón phân là lao động CỤ THỂ (có mục đích, phương tiện, kỹ thuật riêng). Lao động trừu tượng là khía cạnh xã hội ẩn sau đó.",
  },
  {
    id: 5,
    statement: "Lao động cụ thể tạo ra giá trị sử dụng của hàng hóa.",
    type: "concrete", isTrue: true,
    explanation: "Đúng. Lao động cụ thể tạo ra các công dụng thực tiễn: nông dân cày bừa, gieo mạ → hạt lúa có thể dùng để ăn (giá trị sử dụng).",
  },
  {
    id: 6,
    statement: "Thời gian lao động xã hội cần thiết được đo bằng thời gian làm việc của người nông dân giỏi nhất.",
    type: "abstract", isTrue: false,
    explanation: "Sai. Thời gian lao động xã hội cần thiết là thời gian TRUNG BÌNH của xã hội, không phải của cá nhân giỏi nhất hay kém nhất.",
  },
  {
    id: 7,
    statement: "Công nhân vận hành máy xay xát gạo thực hiện lao động cụ thể khác với lao động của nông dân.",
    type: "concrete", isTrue: true,
    explanation: "Đúng. Hai loại lao động cụ thể này hoàn toàn khác nhau về mục đích, kỹ thuật, phương tiện — nhưng cùng nằm trong chuỗi giá trị lúa gạo.",
  },
  {
    id: 8,
    statement: "Lao động trừu tượng là cơ sở để so sánh và trao đổi các hàng hóa khác loại với nhau.",
    type: "abstract", isTrue: true,
    explanation: "Đúng. Nhờ quy về cùng một thứ (hao phí sức lao động người), ta có thể đổi lúa lấy vải, lúa lấy dụng cụ... Đây là nền tảng của kinh tế hàng hóa.",
  },
];

export function GameLaborTrueFalse() {
  const [deck, setDeck] = useState<FlashCard[]>([...CARDS].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<Record<number, boolean | null>>({});
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(15);
  const [timerActive, setTimerActive] = useState(true);

  const card = deck[current];
  const score = Object.values(answered).filter(Boolean).length;

  const handleAnswer = useCallback((answer: boolean) => {
    if (answered[card.id] !== undefined) return;
    setTimerActive(false);
    const correct = answer === card.isTrue;
    setAnswered((prev) => ({ ...prev, [card.id]: correct }));
    setFlipped(true);
  }, [answered, card]);

  // Timer
  useEffect(() => {
    if (!timerActive || flipped) return;
    if (timer <= 0) { handleAnswer(false); return; }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, flipped, handleAnswer]);

  const handleNext = () => {
    if (current + 1 >= deck.length) {
      setDone(true);
    } else {
      setCurrent((p) => p + 1);
      setFlipped(false);
      setTimer(15);
      setTimerActive(true);
    }
  };

  const handleReset = () => {
    setDeck([...CARDS].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setAnswered({});
    setFlipped(false);
    setDone(false);
    setTimer(15);
    setTimerActive(true);
  };

  const pct = Math.round((score / CARDS.length) * 100);
  const progress = ((current + (flipped ? 1 : 0)) / deck.length) * 100;

  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-800/80 to-amber-950/40 border border-amber-500/20 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-500/15 to-emerald-500/10 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-xl">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-white font-black text-base">🎮 Mini-Game: Đúng hay Sai?</p>
            <p className="text-white/45 text-xs">Đọc mệnh đề · Bấm ĐÚNG hoặc SAI · 15 giây mỗi thẻ</p>
          </div>
        </div>
        <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-xs transition-all">
          <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/5">
        <motion.div
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
        />
      </div>

      <div className="p-5">
        {!done ? (
          <div className="space-y-4">
            {/* Card counter + timer */}
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-sm font-mono">
                {current + 1} / {deck.length}
              </span>
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black border transition-colors ${
                timer <= 5 ? "bg-rose-500/20 border-rose-500/40 text-rose-300" : "bg-white/5 border-white/10 text-white/60"
              }`}>
                ⏱ {timer}s
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                card.type === "concrete" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
              }`}>
                {card.type === "concrete" ? "Lao động cụ thể" : "Lao động trừu tượng"}
              </span>
            </div>

            {/* Statement card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[120px] flex items-center"
              >
                <p className="text-white text-base md:text-lg font-semibold leading-relaxed text-center w-full">
                  "{card.statement}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Answer buttons */}
            {!flipped ? (
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(true)}
                  className="py-4 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-black text-lg rounded-xl transition-all"
                >
                  ✅ ĐÚNG
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(false)}
                  className="py-4 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-black text-lg rounded-xl transition-all"
                >
                  ❌ SAI
                </motion.button>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Result */}
                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                    answered[card.id]
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-rose-500/10 border-rose-500/30"
                  }`}>
                    {answered[card.id]
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      : <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    }
                    <div>
                      <p className={`font-black text-sm ${answered[card.id] ? "text-emerald-300" : "text-rose-300"}`}>
                        {answered[card.id] ? "Chính xác!" : `Sai! Đáp án đúng là: ${card.isTrue ? "ĐÚNG ✅" : "SAI ❌"}`}
                      </p>
                      <p className="text-white/55 text-xs mt-1 leading-relaxed">{card.explanation}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-gradient-to-r from-amber-500/80 to-emerald-500/80 hover:from-amber-500 hover:to-emerald-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {current + 1 < deck.length ? "Thẻ tiếp theo" : "Xem kết quả"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Score tracker */}
            <div className="flex items-center justify-center gap-4 pt-1">
              {deck.map((c, i) => (
                <div key={c.id} className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < current ? (answered[c.id] ? "bg-emerald-400" : "bg-rose-400")
                  : i === current ? "bg-white/60 scale-125"
                  : "bg-white/15"
                }`} />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6 space-y-4"
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < Math.round(pct / 20) ? "text-amber-400 fill-amber-400" : "text-white/20"}`} />
              ))}
            </div>
            <p className="text-white font-black text-2xl">
              {pct === 100 ? "🏆 Hoàn hảo!" : pct >= 75 ? "🎉 Xuất sắc!" : pct >= 50 ? "👍 Khá tốt!" : "📚 Cần ôn lại!"}
            </p>
            <p className="text-white/60">
              Trả lời đúng <span className="text-white font-black text-xl">{score}/{CARDS.length}</span> mệnh đề · <span className="text-amber-400 font-black">{pct}%</span>
            </p>
            {/* Breakdown */}
            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <p className="text-emerald-400 font-black text-xl">{Object.values(answered).filter(Boolean).length}</p>
                <p className="text-white/40 text-xs">Đúng</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-rose-400 font-black text-xl">{Object.values(answered).filter((v) => !v).length}</p>
                <p className="text-white/40 text-xs">Sai</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-emerald-500 text-white font-black rounded-xl hover:scale-105 transition-all"
            >
              Chơi lại ngay
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
