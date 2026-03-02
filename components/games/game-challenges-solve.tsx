"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Star, AlertTriangle } from "lucide-react";

interface Scenario {
  id: number;
  challenge: string;
  context: string;
  options: { text: string; isCorrect: boolean; why: string }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    challenge: "Điệp khúc được mùa mất giá",
    context: "Vụ Hè-Thu 2024, sản lượng lúa ĐBSCL tăng 15% đạt 12 triệu tấn. Giá lúa rớt còn 5.000đ/kg trong khi giá thành sản xuất 4.800đ/kg. Nông dân gần như không có lãi. Chính phủ cần làm gì?",
    options: [
      {
        text: "Hỗ trợ nông dân mở rộng diện tích trồng lúa hơn nữa để có nhiều sản phẩm hơn",
        isCorrect: false,
        why: "Sai. Tăng diện tích → tăng cung thêm → giá rớt thêm. Đây là ngược chiều với giải quyết vấn đề thừa cung.",
      },
      {
        text: "Thu mua dự trữ quốc gia khi giá xuống thấp, xây kho lạnh bảo quản, chờ giá hồi phục mới bán",
        isCorrect: true,
        why: "Đúng. Nhà nước can thiệp bình ổn thị trường: mua vào khi cung dư (giá thấp) → giảm áp lực cung → giá phục hồi. Đây là điều tiết cung-cầu bằng chính sách.",
      },
      {
        text: "Tự để thị trường điều tiết, không can thiệp gì cả",
        isCorrect: false,
        why: "Sai trong ngắn hạn. Thị trường nông sản có thất bại thị trường (thông tin bất cân xứng, độ trễ sản xuất). Nhà nước cần can thiệp để bảo vệ nông dân.",
      },
      {
        text: "Quy hoạch lại cơ cấu cây trồng, chuyển một phần diện tích sang cây ăn quả và nuôi trồng thủy sản có giá trị cao hơn",
        isCorrect: true,
        why: "Đúng. Tái cơ cấu nông nghiệp: giảm cung lúa → cân bằng cung-cầu. Đồng thời tăng thu nhập nông dân từ sản phẩm có giá trị cao hơn.",
      },
    ],
  },
  {
    id: 2,
    challenge: "Gạo Việt bị cạnh tranh giá bởi gạo Ấn Độ",
    context: "Ấn Độ tái xuất khẩu gạo giá 400 USD/tấn (thấp hơn Việt Nam 130 USD/tấn). Các khách hàng Philippines, Indonesia đang chuyển đơn hàng sang mua gạo Ấn Độ. Kim ngạch xuất khẩu gạo Việt giảm 8% trong Quý 1/2025.",
    options: [
      {
        text: "Giảm giá gạo Việt Nam xuống thấp hơn gạo Ấn Độ để cạnh tranh về giá",
        isCorrect: false,
        why: "Sai. Cạnh tranh bằng giá thấp sẽ ép lợi nhuận xuống gần zero, không bền vững. Đây là chiến lược của người thua cuộc.",
      },
      {
        text: "Tập trung vào phân khúc gạo chất lượng cao: gạo hữu cơ, gạo thơm đặc sản như ST25, Jasmine",
        isCorrect: true,
        why: "Đúng. Cạnh tranh bằng chất lượng và thương hiệu: thoát khỏi phân khúc giá thấp, hướng tới phân khúc cao cấp nơi Ấn Độ không cạnh tranh được. Đây là áp dụng quy luật cạnh tranh khôn ngoan.",
      },
      {
        text: "Yêu cầu chính phủ áp thuế nhập khẩu gạo Ấn Độ",
        isCorrect: false,
        why: "Không khả thi. Việt Nam và Ấn Độ đều là thành viên WTO, không thể tùy tiện áp thuế. Hơn nữa, đây là gạo xuất khẩu không phải nhập khẩu.",
      },
      {
        text: "Đa dạng hóa thị trường: đẩy mạnh xuất khẩu sang EU, Nhật Bản, Hàn Quốc nơi người mua ưa chất lượng hơn giá rẻ",
        isCorrect: true,
        why: "Đúng. Đa dạng hóa thị trường theo phân khúc cầu: EU/Nhật/Hàn trả giá cao cho chất lượng. Giảm phụ thuộc thị trường giá rẻ → quy luật thị trường phát huy tốt hơn.",
      },
    ],
  },
  {
    id: 3,
    challenge: "Nông dân thiếu vốn mua giống mới, phân bón cho vụ sau",
    context: "Vụ vừa xong giá lúa thấp, nông dân An Giang thu nhập chỉ đủ sống. 45% hộ nông dân không đủ tiền mua giống lúa chất lượng cao và phân bón hữu cơ cho vụ tới. Điều này có nguy cơ tạo vòng luẩn quẩn: thiếu vốn → dùng giống kém → năng suất thấp → thu nhập thấp.",
    options: [
      {
        text: "Nông dân vay nóng lãi suất cao từ tư nhân để xoay vốn",
        isCorrect: false,
        why: "Sai. Lãi suất cao (3–5%/tháng) sẽ ăn hết lợi nhuận vụ sau. Đây là bẫy nợ, làm trầm trọng thêm vòng luẩn quẩn nghèo đói.",
      },
      {
        text: "Tiếp cận tín dụng nông nghiệp ưu đãi từ Agribank, NHCSXH với lãi suất 4–6%/năm",
        isCorrect: true,
        why: "Đúng. Tín dụng chính sách cho nông nghiệp là hình thức tiền tệ thực hiện chức năng 'phương tiện thanh toán' — giúp nông dân tiếp cận vốn mà không bị ép lãi suất.",
      },
      {
        text: "Hợp tác vào HTX để được mua đầu vào tập trung, giá rẻ hơn 15–20% so với mua lẻ",
        isCorrect: true,
        why: "Đúng. HTX giúp giảm chi phí đầu vào thông qua mua sắm tập thể. Tăng năng suất lao động xã hội → giảm thời gian lao động cần thiết → tăng lợi nhuận.",
      },
      {
        text: "Bán đất nông nghiệp để có vốn đầu tư",
        isCorrect: false,
        why: "Sai hoàn toàn. Bán tư liệu sản xuất (đất) là mất đi điều kiện sản xuất lâu dài. Nông dân sẽ không còn nguồn thu nhập trong tương lai.",
      },
    ],
  },
  {
    id: 4,
    challenge: "Gạo Việt chưa có thương hiệu quốc tế mạnh",
    context: "Năm 2024: gạo Thái Hom Mali xuất khẩu 1.200 USD/tấn; gạo Việt Nam loại tương đương chỉ đạt 620 USD/tấn (chênh lệch 580 USD/tấn = 93%). Cả hai đều có chất lượng tương đương, nhưng thương hiệu Thái Lan được nhận biết toàn cầu từ 30 năm nay.",
    options: [
      {
        text: "Đăng ký bảo hộ chỉ dẫn địa lý (GI) cho các giống gạo đặc sản như ST25, Tám Xoan Hải Hậu",
        isCorrect: true,
        why: "Đúng. GI là công cụ pháp lý bảo vệ giá trị sử dụng đặc biệt của sản phẩm địa phương. Gạo có GI thường bán giá cao hơn 20–50% so với gạo thông thường.",
      },
      {
        text: "Sản xuất thật nhiều, xuất khẩu khối lượng lớn để tên tuổi được biết đến",
        isCorrect: false,
        why: "Sai. Xuất khẩu số lượng lớn giá thấp chỉ củng cố hình ảnh 'gạo giá rẻ'. Thương hiệu được xây bằng chất lượng và marketing, không phải bằng số lượng.",
      },
      {
        text: "Xây dựng tiêu chuẩn chất lượng quốc gia (VN-Standard) và kiểm soát chặt tất cả lô xuất khẩu",
        isCorrect: true,
        why: "Đúng. Tiêu chuẩn chất lượng nhất quán là nền tảng của thương hiệu. Người mua quốc tế tin tưởng khi biết mỗi lô gạo Việt đều đạt cùng một tiêu chuẩn.",
      },
      {
        text: "Thuê công ty PR nước ngoài quảng cáo rầm rộ trên mạng xã hội quốc tế",
        isCorrect: false,
        why: "Không đủ. Quảng cáo mà không có chất lượng nền tảng sẽ không bền vững. Thương hiệu thực sự phải được xây từ chất lượng sản phẩm nhất quán.",
      },
    ],
  },
];

export function GameChallengesSolve() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const q = SCENARIOS[current];
  const correctCount = q.options.filter((o) => o.isCorrect).length;

  const toggle = (i: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    let pts = 0;
    q.options.forEach((opt, i) => {
      if (opt.isCorrect && selected.has(i)) pts++;
      if (!opt.isCorrect && !selected.has(i)) pts++;
    });
    setScores((p) => [...p, pts]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (current + 1 >= SCENARIOS.length) {
      setDone(true);
    } else {
      setCurrent((p) => p + 1);
      setSelected(new Set());
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(new Set());
    setSubmitted(false);
    setScores([]);
    setDone(false);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = SCENARIOS.length * 4;
  const pct = done ? Math.round((totalScore / maxScore) * 100) : 0;

  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-800/80 to-rose-950/30 border border-rose-500/20 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-rose-500/15 to-amber-500/10 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/20 rounded-xl">
            <Trophy className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <p className="text-white font-black text-base">🎮 Mini-Game: Chọn Giải Pháp Đúng</p>
            <p className="text-white/45 text-xs">Có thể chọn nhiều đáp án · Chọn tất cả giải pháp PHÙ HỢP với quy luật thị trường</p>
          </div>
        </div>
        <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 text-xs transition-all">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-white/5">
        <motion.div animate={{ width: `${(current / SCENARIOS.length) * 100}%` }} className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
      </div>

      <div className="p-5">
        {!done ? (
          <div className="space-y-4">
            {/* Counter */}
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-sm font-mono">Tình huống {current + 1}/{SCENARIOS.length}</span>
              <span className="px-3 py-1 bg-rose-500/15 text-rose-400 text-xs font-bold rounded-full border border-rose-500/20">
                Chọn {correctCount} giải pháp đúng
              </span>
            </div>

            {/* Challenge card */}
            <div className="bg-white/[0.04] border border-rose-500/15 rounded-xl p-5 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-rose-300 font-black text-sm">Thách thức: {q.challenge}</p>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{q.context}</p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isSelected = selected.has(i);
                let cls = "";
                if (!submitted) {
                  cls = isSelected
                    ? "bg-amber-500/15 border-amber-400/50 text-white"
                    : "bg-white/5 border-white/10 text-white/65 hover:bg-white/8 hover:border-white/20";
                } else {
                  if (opt.isCorrect && isSelected) cls = "bg-emerald-500/15 border-emerald-400/50 text-white";
                  else if (opt.isCorrect && !isSelected) cls = "bg-emerald-500/8 border-emerald-400/30 text-white/70";
                  else if (!opt.isCorrect && isSelected) cls = "bg-rose-500/15 border-rose-400/50 text-white";
                  else cls = "bg-white/[0.02] border-white/5 text-white/35";
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={!submitted ? { scale: 1.005 } : {}}
                    onClick={() => toggle(i)}
                    disabled={submitted}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${cls}`}
                  >
                    <span className={`shrink-0 w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all ${
                      submitted
                        ? opt.isCorrect ? "bg-emerald-500/30 border-emerald-400/50" : isSelected ? "bg-rose-500/30 border-rose-400/50" : "bg-white/5 border-white/10"
                        : isSelected ? "bg-amber-500/30 border-amber-400/50" : "bg-white/5 border-white/15"
                    }`}>
                      {submitted && opt.isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {submitted && !opt.isCorrect && isSelected && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      {!submitted && isSelected && <span className="w-2 h-2 bg-amber-400 rounded-full" />}
                    </span>
                    <span>{opt.text}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanations after submit */}
            {submitted && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  {q.options.map((opt, i) => {
                    if (!opt.isCorrect && !selected.has(i)) return null;
                    return (
                      <div key={i} className={`flex items-start gap-2 p-3 rounded-lg border text-xs leading-relaxed ${
                        opt.isCorrect ? "bg-emerald-500/8 border-emerald-500/20 text-white/65"
                        : "bg-rose-500/8 border-rose-500/20 text-white/65"
                      }`}>
                        {opt.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />}
                        <span>{opt.why}</span>
                      </div>
                    );
                  })}
                  {/* Also show missed correct answers */}
                  {q.options.map((opt, i) => {
                    if (!opt.isCorrect || selected.has(i)) return null;
                    return (
                      <div key={`miss-${i}`} className="flex items-start gap-2 p-3 rounded-lg border text-xs leading-relaxed bg-amber-500/8 border-amber-500/20 text-white/65">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong className="text-amber-400">Bạn đã bỏ qua: </strong>{opt.why}</span>
                      </div>
                    );
                  })}
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-gradient-to-r from-rose-500/80 to-amber-500/80 hover:from-rose-500 hover:to-amber-500 text-white font-black rounded-xl transition-all"
                  >
                    {current + 1 < SCENARIOS.length ? "Tình huống tiếp theo →" : "Xem kết quả →"}
                  </button>
                </motion.div>
              </AnimatePresence>
            )}

            {!submitted && (
              <button
                onClick={handleSubmit}
                disabled={selected.size === 0}
                className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
                  selected.size > 0
                    ? "bg-gradient-to-r from-rose-500/80 to-amber-500/80 hover:from-rose-500 hover:to-amber-500 text-white hover:scale-[1.01]"
                    : "bg-white/5 text-white/25 cursor-not-allowed"
                }`}
              >
                Kiểm tra giải pháp ({selected.size} đã chọn)
              </button>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6 space-y-4">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-7 h-7 ${i < Math.round(pct / 20) ? "text-amber-400 fill-amber-400" : "text-white/20"}`} />
              ))}
            </div>
            <p className="text-white font-black text-2xl">
              {pct >= 90 ? "🏆 Chuyên gia chính sách!" : pct >= 70 ? "🎉 Rất tốt!" : pct >= 50 ? "👍 Ổn đấy!" : "📚 Cần ôn thêm!"}
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-rose-400 font-black text-3xl">{totalScore}</p>
                <p className="text-white/40 text-xs">Điểm / {maxScore} tối đa</p>
              </div>
              <div className="w-px bg-white/10 h-10" />
              <div className="text-center">
                <p className="text-amber-400 font-black text-3xl">{pct}%</p>
                <p className="text-white/40 text-xs">Độ chính xác</p>
              </div>
            </div>
            <button onClick={handleReset} className="px-8 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black rounded-xl hover:scale-105 transition-all">
              Thử lại
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
