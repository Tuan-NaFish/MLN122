"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Star } from "lucide-react";

interface SortItem {
  id: number;
  text: string;
  correct: "use" | "value";
  placed?: "use" | "value";
}

const ITEMS: Omit<SortItem, "placed">[] = [
  { id: 1, text: "🍚 Gạo ST25 dùng nấu cơm ngon, dẻo thơm", correct: "use" },
  { id: 2, text: "💵 1 tấn lúa bán được 7.500.000 đồng", correct: "value" },
  { id: 3, text: "🌾 Rơm dùng làm thức ăn cho bò, ủ phân hữu cơ", correct: "use" },
  { id: 4, text: "📦 Gạo 5% tấm xuất khẩu giá 580 USD/tấn", correct: "value" },
  { id: 5, text: "🏭 Bột gạo làm nguyên liệu sản xuất bún, bánh phở", correct: "use" },
  { id: 6, text: "⏱️ Lao động 3 tháng kết tinh trong 1 vụ lúa", correct: "value" },
  { id: 7, text: "🍺 Trấu làm chất đốt, vật liệu xây dựng nhẹ", correct: "use" },
  { id: 8, text: "📈 Giá lúa tăng khi nguồn cung giảm do hạn mặn", correct: "value" },
];

export function GamePropertySort() {
  const [items, setItems] = useState<SortItem[]>(
    ITEMS.map((i) => ({ ...i, placed: undefined }))
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const queue = items.filter((i) => i.placed === undefined);
  const useBucket = items.filter((i) => i.placed === "use");
  const valueBucket = items.filter((i) => i.placed === "value");

  const handleSelect = (id: number) => {
    if (submitted) return;
    setSelected(selected === id ? null : id);
  };

  const handleDrop = (bucket: "use" | "value") => {
    if (selected === null || submitted) return;
    setItems((prev) =>
      prev.map((i) => (i.id === selected ? { ...i, placed: bucket } : i))
    );
    setSelected(null);
  };

  const handleRemove = (id: number) => {
    if (submitted) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, placed: undefined } : i))
    );
  };

  const handleSubmit = () => {
    if (queue.length > 0) return;
    const res: Record<number, boolean> = {};
    let correct = 0;
    items.forEach((i) => {
      const ok = i.placed === i.correct;
      res[i.id] = ok;
      if (ok) correct++;
    });
    setResults(res);
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setItems(ITEMS.map((i) => ({ ...i, placed: undefined })));
    setSelected(null);
    setResults({});
    setSubmitted(false);
    setScore(0);
  };

  const pct = Math.round((score / ITEMS.length) * 100);

  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-800/80 to-emerald-950/60 border border-emerald-500/20 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-500/15 to-amber-500/10 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-black text-base">🎮 Mini-Game: Phân Loại Thuộc Tính</p>
            <p className="text-white/45 text-xs">Chọn một thẻ rồi bấm vào cột đúng để phân loại</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {submitted && (
            <span className={`px-4 py-1.5 rounded-full text-sm font-black ${pct >= 75 ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
              {score}/{ITEMS.length} đúng · {pct}%
            </span>
          )}
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-xs transition-all">
            <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Queue */}
        <div>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
            Thẻ chờ phân loại ({queue.length} còn lại)
          </p>
          <div className="flex flex-wrap gap-2 min-h-[44px]">
            <AnimatePresence>
              {queue.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleSelect(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all border ${
                    selected === item.id
                      ? "bg-white/20 border-emerald-400 text-white scale-105 shadow-lg shadow-emerald-500/20"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {item.text}
                </motion.button>
              ))}
            </AnimatePresence>
            {queue.length === 0 && (
              <p className="text-white/20 text-sm italic">Đã phân loại hết ✓</p>
            )}
          </div>
        </div>

        {/* Buckets */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Use Value */}
          <div
            onClick={() => handleDrop("use")}
            className={`min-h-[160px] rounded-xl border-2 border-dashed p-4 transition-all cursor-pointer ${
              selected !== null && !submitted
                ? "border-emerald-400/60 bg-emerald-500/10 scale-[1.01]"
                : "border-emerald-500/20 bg-emerald-500/5"
            }`}
          >
            <p className="text-emerald-400 font-black text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-xs">🌿</span>
              Giá Trị Sử Dụng
              <span className="text-emerald-400/50 text-xs font-normal">(công dụng thực tiễn)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {useBucket.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    submitted
                      ? results[item.id]
                        ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                        : "bg-rose-500/20 border-rose-400/40 text-rose-300"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-rose-500/10"
                  }`}
                >
                  {submitted && (results[item.id] ? <CheckCircle2 className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />)}
                  {item.text}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Exchange Value */}
          <div
            onClick={() => handleDrop("value")}
            className={`min-h-[160px] rounded-xl border-2 border-dashed p-4 transition-all cursor-pointer ${
              selected !== null && !submitted
                ? "border-amber-400/60 bg-amber-500/10 scale-[1.01]"
                : "border-amber-500/20 bg-amber-500/5"
            }`}
          >
            <p className="text-amber-400 font-black text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-xs">💰</span>
              Giá Trị (Trao Đổi)
              <span className="text-amber-400/50 text-xs font-normal">(lao động kết tinh)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {valueBucket.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    submitted
                      ? results[item.id]
                        ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                        : "bg-rose-500/20 border-rose-400/40 text-rose-300"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-rose-500/10"
                  }`}
                >
                  {submitted && (results[item.id] ? <CheckCircle2 className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />)}
                  {item.text}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit / Result */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={queue.length > 0}
            className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
              queue.length === 0
                ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.01]"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            {queue.length > 0 ? `Phân loại hết ${queue.length} thẻ còn lại trước` : "✅ Kiểm tra kết quả"}
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl border text-center ${
              pct >= 75 ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30"
            }`}
          >
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(pct / 20) ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
                />
              ))}
            </div>
            <p className="text-white font-black text-lg mb-1">
              {pct === 100 ? "🏆 Hoàn hảo!" : pct >= 75 ? "🎉 Giỏi lắm!" : "💪 Cần ôn thêm!"}
            </p>
            <p className="text-white/60 text-sm">
              Bạn phân loại đúng <span className="text-white font-black">{score}/{ITEMS.length}</span> thẻ ({pct}%)
            </p>
            {pct < 100 && (
              <p className="text-white/40 text-xs mt-2">
                Thẻ màu đỏ là sai · Bấm "Chơi lại" để thử lại
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
