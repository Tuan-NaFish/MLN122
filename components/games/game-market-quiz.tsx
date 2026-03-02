"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Star, Zap } from "lucide-react";

interface Question {
  id: number;
  situation: string;
  context: string;
  hint: string;
  options: { text: string; law: string }[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    situation: "Vụ Đông-Xuân 2024: ĐBSCL được mùa lớn, sản lượng tăng 18%",
    context: "Nông dân Kiên Giang thu hoạch lúa IR50404 đạt 8,2 tấn/ha (cao kỷ lục). Tuy nhiên, giá lúa tươi tại ruộng chỉ còn 5.200 đồng/kg, giảm 27% so với vụ trước.",
    hint: "Sản lượng tăng 18% trong khi cầu gần như không đổi",
    options: [
      { text: "Quy luật giá trị: lúa làm ra nhiều hơn nên giá trị giảm", law: "value" },
      { text: "Quy luật cung–cầu: cung tăng mạnh, cầu không đổi → giá giảm", law: "supply_demand" },
      { text: "Quy luật cạnh tranh: nông dân cạnh tranh nhau bán hạ giá", law: "competition" },
    ],
    correct: 1,
    explanation: "Quy luật cung-cầu: khi cung (sản lượng lúa) tăng đột biến 18% nhưng cầu (nhu cầu mua lúa) gần như không thay đổi → dư cung → giá giảm. Đây là biểu hiện điển hình của 'được mùa mất giá'.",
  },
  {
    id: 2,
    situation: "Gạo ST25 đạt giải 'Gạo ngon nhất thế giới' — giá tăng vọt",
    context: "Sau khi giải thưởng được công bố tại hội chợ World's Best Rice 2019, giá gạo ST25 tăng từ 25.000đ/kg lên 60.000–90.000đ/kg. Trong khi đó giá gạo thường (IR50404) chỉ là 12.000–15.000đ/kg.",
    hint: "Chất lượng vượt trội, lao động phức tạp hơn để lai tạo giống",
    options: [
      { text: "Quy luật cung–cầu: cầu tăng đột biến vì giải thưởng, cung chưa kịp đáp ứng", law: "supply_demand" },
      { text: "Quy luật giá trị: lao động phức tạp tạo ra giá trị cao hơn lao động giản đơn", law: "value" },
      { text: "Quy luật cạnh tranh: không có đối thủ nên ST25 độc quyền định giá cao", law: "competition" },
    ],
    correct: 1,
    explanation: "Quy luật giá trị: gạo ST25 đòi hỏi lao động phức tạp hơn (kỹ sư lai tạo giống, kỹ thuật canh tác đặc biệt). Lao động phức tạp = bội số lao động giản đơn → tạo ra giá trị cao hơn → giá cả cao hơn. Cả hai lý luận (cung-cầu cũng có vai trò) nhưng gốc rễ là giá trị lao động.",
  },
  {
    id: 3,
    situation: "Ấn Độ cấm xuất khẩu gạo trắng tháng 7/2023",
    context: "Ấn Độ — xuất khẩu gạo lớn nhất thế giới (chiếm 40% thị trường) — ban lệnh cấm xuất khẩu gạo trắng non-basmati. Ngay lập tức, giá gạo xuất khẩu của Việt Nam tăng từ 530 USD/tấn lên 650 USD/tấn (+23%) chỉ trong 2 tuần.",
    hint: "Lượng gạo cung ứng trên thị trường thế giới đột ngột giảm mạnh",
    options: [
      { text: "Quy luật giá trị: gạo Việt Nam có giá trị cao hơn gạo Ấn Độ", law: "value" },
      { text: "Quy luật cạnh tranh: Việt Nam thắng thế trong cuộc cạnh tranh với Ấn Độ", law: "competition" },
      { text: "Quy luật cung–cầu: cung gạo toàn cầu giảm mạnh, cầu không đổi → giá tăng", law: "supply_demand" },
    ],
    correct: 2,
    explanation: "Quy luật cung-cầu: Ấn Độ chiếm 40% cung gạo thế giới. Khi lệnh cấm ban hành, cung gạo toàn cầu giảm mạnh đột ngột trong khi cầu vẫn như cũ → giá cả tự điều chỉnh tăng. Gạo Việt Nam được hưởng lợi trực tiếp từ sự thay đổi cung này.",
  },
  {
    id: 4,
    situation: "Gạo Việt Nam bị EU trả hàng do dư lượng thuốc trừ sâu",
    context: "Năm 2023, EU phát hiện 4 lô gạo Việt Nam có dư lượng Tricyclazole vượt ngưỡng cho phép (>0.01 mg/kg). Các doanh nghiệp Thái Lan và Ấn Độ với quy trình kiểm soát chất lượng tốt hơn chiếm thị phần ở EU.",
    hint: "Ai đáp ứng tốt hơn tiêu chuẩn kỹ thuật sẽ giành được thị trường",
    options: [
      { text: "Quy luật cung–cầu: EU không đủ cầu cho cả 3 nước xuất khẩu", law: "supply_demand" },
      { text: "Quy luật giá trị: gạo Thái và Ấn Độ có giá trị sử dụng cao hơn gạo Việt", law: "value" },
      { text: "Quy luật cạnh tranh: cạnh tranh về chất lượng và tiêu chuẩn kỹ thuật quốc tế", law: "competition" },
    ],
    correct: 2,
    explanation: "Quy luật cạnh tranh: trên thị trường quốc tế, các nhà xuất khẩu cạnh tranh nhau không chỉ về giá mà còn về chất lượng và tiêu chuẩn. Ai đáp ứng tốt hơn tiêu chuẩn SPS/TBT của EU → giành được thị phần → Việt Nam thua trên 'sân chơi' này.",
  },
  {
    id: 5,
    situation: "Nhà máy xay xát đầu tư máy móc hiện đại, chi phí giảm 35%",
    context: "Công ty Lộc Trời đầu tư dây chuyền xay xát tự động, giúp chi phí chế biến 1 tấn gạo giảm từ 320.000đ xuống 210.000đ. Dù giá gạo thị trường không đổi, lợi nhuận của công ty tăng vọt.",
    hint: "Năng suất lao động tăng → thời gian lao động cần thiết giảm → giá thành giảm",
    options: [
      { text: "Quy luật cạnh tranh: Lộc Trời đánh bại đối thủ bằng giá thành thấp hơn", law: "competition" },
      { text: "Quy luật giá trị: tăng năng suất → giảm thời gian lao động cá nhân < xã hội → lợi nhuận siêu ngạch", law: "value" },
      { text: "Quy luật cung–cầu: giảm chi phí nên có thể cung nhiều hơn ra thị trường", law: "supply_demand" },
    ],
    correct: 1,
    explanation: "Quy luật giá trị: khi doanh nghiệp tăng năng suất lao động → thời gian lao động cá nhân < thời gian lao động xã hội cần thiết → giá thành thấp hơn giá trị xã hội → thu được lợi nhuận siêu ngạch. Đây là động lực của đổi mới công nghệ trong nền kinh tế hàng hóa.",
  },
  {
    id: 6,
    situation: "Nông dân An Giang từ bỏ lúa thường, chuyển sang trồng gạo hữu cơ",
    context: "Gạo thường IR50404 bán 12.000đ/kg. Gạo hữu cơ đạt chuẩn VietGAP+GlobalGAP bán được 45.000–55.000đ/kg tại siêu thị Nhật Cường, Winmart. Ngày càng nhiều nông dân An Giang chuyển đổi canh tác.",
    hint: "Khi lợi nhuận ngành này cao hơn, nguồn lực sẽ dịch chuyển",
    options: [
      { text: "Quy luật cạnh tranh: cạnh tranh nội ngành thúc đẩy dịch chuyển sản xuất sang phân khúc có lợi nhuận cao", law: "competition" },
      { text: "Quy luật giá trị: gạo hữu cơ có nhiều giá trị sử dụng hơn gạo thường", law: "value" },
      { text: "Quy luật cung–cầu: cầu gạo hữu cơ tăng mạnh nên nông dân chuyển đổi", law: "supply_demand" },
    ],
    correct: 0,
    explanation: "Quy luật cạnh tranh: cạnh tranh nội ngành (giữa các người sản xuất lúa) dẫn đến việc vốn và lao động dịch chuyển sang phân khúc có tỷ suất lợi nhuận cao hơn (lúa hữu cơ). Cơ chế này điều phối nguồn lực xã hội một cách tự động qua tín hiệu giá cả.",
  },
];

export function GameMarketQuiz() {
  const [questions] = useState<Question[]>([...QUESTIONS].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(20);

  const q = questions[current];

  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correct;
    const newCombo = correct ? combo + 1 : 0;
    const pts = correct ? 100 + newCombo * 25 : 0;
    setScores((p) => [...p, correct]);
    setCombo(newCombo);
    setMaxCombo((p) => Math.max(p, newCombo));
    setTotalScore((p) => p + pts);
  }, [answered, q, combo]);

  // Auto-fail on timeout
  useEffect(() => {
    if (answered || done) return;
    if (timer <= 0) { handleSelect(-1); return; }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, answered, done, handleSelect]);

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((p) => p + 1);
      setSelected(null);
      setAnswered(false);
      setTimer(20);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScores([]);
    setCombo(0);
    setMaxCombo(0);
    setTotalScore(0);
    setDone(false);
    setTimer(20);
  };

  const correctCount = scores.filter(Boolean).length;
  const pct = Math.round((correctCount / QUESTIONS.length) * 100);

  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-800/80 to-blue-950/40 border border-blue-500/20 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500/15 to-emerald-500/10 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Trophy className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-black text-base">🎮 Mini-Game: Nhận Diện Quy Luật</p>
            <p className="text-white/45 text-xs">Đọc tình huống thực tế · Chọn quy luật giải thích đúng · 20 giây</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!done && combo > 1 && (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-xs font-black">
              <Zap className="w-3.5 h-3.5" /> Combo {combo}x
            </div>
          )}
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-xs transition-all">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-white/5">
        <motion.div animate={{ width: `${((current) / questions.length) * 100}%` }} className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
      </div>

      <div className="p-5">
        {!done ? (
          <div className="space-y-4">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-sm font-mono">{current + 1}/{questions.length}</span>
              <div className={`px-4 py-1.5 rounded-full text-sm font-black border transition-colors ${
                timer <= 7 ? "bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse" : "bg-white/5 border-white/10 text-white/60"
              }`}>
                ⏱ {timer}s
              </div>
              <span className="text-blue-400 font-black text-sm">{totalScore} điểm</span>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {/* Situation title */}
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">📰 Tình huống thực tế</p>
                  <h4 className="text-white font-black text-lg mb-2">{q.situation}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{q.context}</p>
                  <div className="mt-3 px-3 py-2 bg-amber-500/8 border border-amber-500/15 rounded-lg">
                    <p className="text-amber-300/70 text-xs">💡 Gợi ý: {q.hint}</p>
                  </div>
                </div>

                {/* Question */}
                <p className="text-white/70 text-sm font-semibold text-center">
                  Quy luật kinh tế nào giải thích chủ yếu tình huống này?
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === q.correct;
                    let cls = "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20";
                    if (answered) {
                      if (isCorrect) cls = "bg-emerald-500/15 border-emerald-400/50 text-emerald-300";
                      else if (isSelected && !isCorrect) cls = "bg-rose-500/15 border-rose-400/50 text-rose-300";
                      else cls = "bg-white/[0.02] border-white/5 text-white/30";
                    }
                    return (
                      <motion.button
                        key={i}
                        whileHover={!answered ? { scale: 1.01 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                        onClick={() => handleSelect(i)}
                        disabled={answered}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${cls}`}
                      >
                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                          answered && isCorrect ? "bg-emerald-500/30 border-emerald-400/50 text-emerald-300"
                          : answered && isSelected ? "bg-rose-500/30 border-rose-400/50 text-rose-300"
                          : "bg-white/10 border-white/20 text-white/50"
                        }`}>
                          {answered ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt.text}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
                      selected === q.correct ? "bg-emerald-500/10 border-emerald-500/25 text-white/70" : "bg-rose-500/10 border-rose-500/25 text-white/70"
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selected === q.correct
                          ? <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 font-black text-xs">Chính xác! {combo > 1 ? `🔥 Combo ${combo}x · +${100 + combo * 25} điểm` : "+100 điểm"}</span></>
                          : <><XCircle className="w-4 h-4 text-rose-400" /><span className="text-rose-400 font-black text-xs">Sai! {timer <= 0 ? "Hết giờ!" : ""}</span></>
                        }
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-gradient-to-r from-blue-500/80 to-emerald-500/80 hover:from-blue-500 hover:to-emerald-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {current + 1 < questions.length ? "Câu tiếp theo" : "Xem kết quả"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {questions.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${
                  i < scores.length ? (scores[i] ? "w-3 h-3 bg-emerald-400" : "w-3 h-3 bg-rose-400")
                  : i === current ? "w-4 h-4 bg-white/60 scale-110"
                  : "w-2.5 h-2.5 bg-white/15"
                }`} />
              ))}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6 space-y-4">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-7 h-7 ${i < Math.round(pct / 20) ? "text-amber-400 fill-amber-400" : "text-white/20"}`} />
              ))}
            </div>
            <p className="text-white font-black text-2xl">
              {pct === 100 ? "🏆 Thiên tài kinh tế!" : pct >= 80 ? "🎉 Xuất sắc!" : pct >= 60 ? "👍 Khá tốt!" : "📚 Ôn lại nhé!"}
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-blue-400 font-black text-3xl">{totalScore}</p>
                <p className="text-white/40 text-xs">Tổng điểm</p>
              </div>
              <div className="w-px bg-white/10 h-10" />
              <div className="text-center">
                <p className="text-emerald-400 font-black text-3xl">{correctCount}/{QUESTIONS.length}</p>
                <p className="text-white/40 text-xs">Đúng</p>
              </div>
              <div className="w-px bg-white/10 h-10" />
              <div className="text-center">
                <p className="text-amber-400 font-black text-3xl">{maxCombo}x</p>
                <p className="text-white/40 text-xs">Max combo</p>
              </div>
            </div>
            <button onClick={handleReset} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-black rounded-xl hover:scale-105 transition-all">
              Chơi lại
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
