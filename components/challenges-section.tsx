"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Globe, Home, Lightbulb, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import { GameChallengesSolve } from "@/components/games/game-challenges-solve";

type Market = "domestic" | "international";

interface Challenge {
  title: string;
  desc: string;
  law: string;
  icon: string;
  image: string;
  imageAlt: string;
  source: string;
  sourceUrl?: string;
  keyFact: string;
}

interface Solution {
  title: string;
  desc: string;
  icon: string;
  principle: string;
}

const challenges: Record<Market, Challenge[]> = {
  domestic: [
    {
      title: "Điệp khúc \"được mùa mất giá\"",
      desc: "Khi sản lượng lúa tăng mạnh (cung > cầu), giá lúa rớt thảm. Nông dân Kiên Giang, An Giang nhiều lần phải bán lúa dưới giá thành sản xuất.",
      law: "Vi phạm quy luật giá trị: giá cả dao động quá mạnh dưới tác động cung-cầu thiếu kiểm soát.",
      icon: "📉",
      image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/25/1468411/Lua.JPG",
      imageAlt: "Nông dân ĐBSCL bán lúa giá thấp",
      keyFact: "Giá lúa rớt còn 4.500–5.000 đ/kg trong khi giá thành 5.200 đ/kg (Vụ HT 2023)",
      source: "Bộ Nông nghiệp & PTNT Việt Nam, 2023",
    },
    {
      title: "Chuỗi giá trị ngắn, thiếu chế biến sâu",
      desc: "80% lúa Việt bán dạng gạo thô. Thiếu nhà máy chế biến thực phẩm từ gạo (bún, bánh, tinh bột gạo cao cấp) → giá trị gia tăng thấp.",
      law: "Chưa khai thác hết giá trị sử dụng đa dạng của lúa → lãng phí lao động cụ thể đã đầu tư.",
      icon: "🏭",
      image: "https://images2.thanhnien.vn/528068263637045248/2025/8/3/49ec49765aa1d3ff8ab0-17542142562121329059099.jpg",
      imageAlt: "Nhà máy chế biến gạo thô",
      keyFact: "Giá trị gia tăng ngành lúa gạo VN chỉ đạt 12–15% so với 35–40% của Thái Lan",
      source: "Viện Chính sách & Chiến lược PTNNNT (IPSARD), 2022",
    },
    {
      title: "Sản xuất manh mún, thiếu liên kết",
      desc: "Hơn 70% nông hộ trồng lúa dưới 0,5ha. Không thể đồng bộ hóa sản xuất, khó áp dụng cơ giới hóa, chất lượng thiếu đồng đều.",
      law: "Năng suất lao động thấp → thời gian lao động cá nhân > mức xã hội cần thiết → bất lợi cạnh tranh.",
      icon: "🌾",
      image: "https://cdn.tienphong.vn/images/a7a4eb175a75567c9a7ae09768d7094862013c5781a55280ecb18b6bbfcbb27a8a7f24db7ad406b77886d1d8197104fa0791f55f36cdd5697927fd3fc455308a3d30c55bb7a17ba0c4d47aa9e18aa64b1666f6b8fc150f17aa657ca1cff3f0dd/lam-gi-de-xoa-bo-manh-mun-nho-le-anh1-6705.jpg",
      imageAlt: "Ruộng lúa nhỏ lẻ manh mún",
      keyFact: "Diện tích bình quân/hộ: 0,46 ha (VN) vs 2,8 ha (Thái Lan) vs 1,5 ha (Ấn Độ)",
      source: "Tổng điều tra nông thôn, nông nghiệp 2020 — Tổng cục Thống kê",
    },
    {
      title: "Phụ thuộc thương lái, thiếu thông tin thị trường",
      desc: "Nông dân không tiếp cận được thông tin giá cả thực tế. Thương lái trung gian nắm lợi thế thông tin → ép giá nông dân.",
      law: "Thị trường không hoàn hảo — thông tin bất cân xứng vi phạm điều kiện cạnh tranh lành mạnh.",
      icon: "📊",
      image: "https://i.ex-cdn.com/danviet.vn/files/content/2025/09/16/gia-lua-1101.jpg",
      imageAlt: "Thương lái thu mua lúa",
      keyFact: "Nông dân chỉ giữ lại ~20–25% giá trị cuối trong chuỗi; thương lái & nhà máy hưởng 40–50%",
      source: "World Bank — Vietnam Rice Value Chain Report, 2021",
    },
    {
      title: "Biến đổi khí hậu & hạn mặn",
      desc: "ĐBSCL chịu xâm nhập mặn ngày càng nghiêm trọng. Vụ đông-xuân 2016, hạn mặn thiệt hại 800.000 ha lúa, ảnh hưởng 500.000 hộ nông dân.",
      law: "Điều kiện tự nhiên thay đổi tác động trực tiếp đến lao động cụ thể và giá trị sử dụng của sản phẩm.",
      icon: "🌊",
      image: "https://ktmt.vnmediacdn.com/stores/news_dataimages/ngoclt/042020/22/23/in_article/0317_han_man_hwtv.jpg",
      imageAlt: "Hạn mặn xâm nhập ruộng lúa ĐBSCL",
      keyFact: "Đến 2050, khoảng 40% diện tích ĐBSCL có nguy cơ bị ngập do nước biển dâng (kịch bản RCP 4.5)",
      source: "Bộ TN&MT — Kịch bản BĐKH 2020; IPCC AR6",
    },
  ],
  international: [
    {
      title: "Cạnh tranh khốc liệt từ gạo Thái & Ấn Độ",
      desc: "Ấn Độ cấm xuất khẩu gạo trắng (2023) tạo cơ hội nhưng khi tái xuất sẽ tạo áp lực lớn. Thái Lan có thương hiệu Jasmine Rice mạnh, định giá cao hơn gạo Việt cùng chủng loại.",
      law: "Quy luật cạnh tranh quốc tế: nước có năng suất lao động cao hơn, chi phí thấp hơn sẽ có lợi thế.",
      icon: "🌏",
      image: "https://media.vneconomy.vn/images/upload/2022/07/25/untitled.png",
      imageAlt: "So sánh gạo Thái Lan và Việt Nam",
      keyFact: "Gạo 5% tấm VN: ~530 USD/tấn; gạo Thái cùng loại: ~580–600 USD/tấn (tháng 8/2023)",
      source: "FAO Rice Price Update, tháng 9/2023; USDA GAIN Report",
    },
    {
      title: "Rào cản kỹ thuật & vệ sinh an toàn thực phẩm",
      desc: "EU yêu cầu dư lượng thuốc trừ sâu < 0,01 mg/kg; Nhật Bản kiểm tra 100% lô gạo Việt. Nhiều lô hàng bị trả về do không đạt tiêu chuẩn SPS/TBT.",
      law: "Giá trị sử dụng phải đáp ứng tiêu chuẩn quốc tế — đây là rào cản phi thuế quan trong lưu thông hàng hóa.",
      icon: "🔬",
      image: "https://thongtincongthuong.vn/upload/Truyenthong/20220414/tieu-chuan-an-toan.jpg",
      imageAlt: "Kiểm tra chất lượng gạo xuất khẩu",
      keyFact: "Năm 2022, EU cảnh báo 17 lô gạo Việt Nam vi phạm dư lượng thuốc BVTV trên hệ thống RASFF",
      source: "RASFF (EU Food & Feed Safety Alerts), 2022; Cục BVTV Việt Nam",
    },
    {
      title: "Thương hiệu yếu, giá bán thấp hơn 30–50%",
      desc: "Gạo Thái Hom Mali 1.200 USD/tấn, gạo Nhật Koshihikari 2.000+ USD/tấn; trong khi gạo Việt tương đương chỉ 550–650 USD/tấn do thiếu thương hiệu quốc gia.",
      law: "Giá trị ≠ giá cả: thương hiệu làm tăng giá cả vượt giá trị thực, VN chưa tận dụng được điều này.",
      icon: "🏷️",
      image: "https://cdn2.tuoitre.vn/zoom/700_390/2021/4/23/st25-1619141293987936433332-crop-16191419803182114169139.jpg",
      imageAlt: "Gạo đóng gói thương hiệu quốc tế",
      keyFact: "ST25 đạt giải gạo ngon nhất thế giới 2019, 2023 — nhưng XK chưa đến 5% tổng sản lượng ST25",
      source: "The Rice Trader — World's Best Rice Contest 2019, 2023; VFA",
    },
    {
      title: "Phụ thuộc thị trường Trung Quốc & Philippines",
      desc: "2 thị trường này chiếm >50% kim ngạch xuất khẩu gạo Việt. Khi Trung Quốc đổi chính sách nhập khẩu (2018), giá gạo Việt lập tức giảm mạnh.",
      law: "Thị trường không đa dạng → rủi ro khi biến động cầu → vi phạm nguyên tắc phân tán rủi ro thị trường.",
      icon: "⚠️",
      image: "https://cdn.saigonnewport.com.vn/uploads/images/2023/04/22/1-644394d8010af.JPG",
      imageAlt: "Cảng xuất khẩu gạo Việt Nam",
      keyFact: "Philippines nhập 3,1 triệu tấn gạo VN (2023); Trung Quốc nhập 1,05 triệu tấn — tổng chiếm 50,6%",
      source: "Tổng cục Hải quan Việt Nam; VFA báo cáo XK 2023",
    },
    {
      title: "Biến động tỷ giá và giá vật tư đầu vào",
      desc: "Phân bón, thuốc trừ sâu nhập khẩu tăng giá (giá Ure tăng 150% năm 2021–2022) trong khi USD/VND ít biến động → lợi nhuận xuất khẩu bị bào mòn.",
      law: "Tiền tệ thế giới: biến động tỷ giá và giá hàng hóa đầu vào ảnh hưởng trực tiếp đến giá trị sản xuất.",
      icon: "💱",
      image: "https://nqs.1cdn.vn/2025/02/09/dautu.kinhtechungkhoan.vn-stores-news_dataimages-2025-022025-09-00-_ure120250209001205.jpg",
      imageAlt: "Biến động giá phân bón và tỷ giá",
      keyFact: "Giá Ure tăng từ 7.500 đ/kg (Q1/2021) lên 19.000 đ/kg (Q4/2021) — tăng 153% trong 9 tháng",
      source: "Hiệp hội Phân bón Việt Nam (FAV); Sở Nông nghiệp An Giang, 2022",
    },
  ],
};

const solutions: Solution[] = [
  {
    title: "Xây dựng thương hiệu gạo quốc gia",
    desc: "Đăng ký bảo hộ chỉ dẫn địa lý (GI) cho gạo ST25, Hương Lài Móng Cái, Tám Xoan Hải Hậu. Xây dựng tiêu chuẩn chất lượng VietGAP/GlobalGAP cho gạo xuất khẩu. Mục tiêu: đạt 800–900 USD/tấn như Thái Hom Mali.",
    icon: "🏆",
    principle: "Quy luật giá trị: nâng cao chất lượng → nâng giá trị trao đổi vượt mức trung bình xã hội → lợi nhuận siêu ngạch.",
  },
  {
    title: "Tái cơ cấu chuỗi giá trị lúa gạo",
    desc: "Phát triển chế biến sâu (bún, phở, bánh gạo, tinh bột biến tính, sữa gạo lứt). Xây dựng hệ thống kho lạnh, sơ chế sau thu hoạch để giảm thất thoát 15–20%. Đây là cách nhân lên giá trị sử dụng từ cùng một lượng lúa.",
    icon: "🏭",
    principle: "Khai thác triệt để giá trị sử dụng đa dạng của lúa gạo → tăng doanh thu trên cùng diện tích đất.",
  },
  {
    title: "Cánh đồng lớn & hợp tác xã kiểu mới",
    desc: "Mô hình cánh đồng lớn liên kết 4 nhà (Nhà nước – Nhà khoa học – Nhà doanh nghiệp – Nhà nông). Hợp tác xã kiểu mới quản lý đầu vào, đầu ra tập trung → giảm chi phí lao động, đồng đều chất lượng.",
    icon: "🤝",
    principle: "Tăng năng suất lao động xã hội → giảm thời gian lao động cần thiết → giảm giá trị đơn vị → cạnh tranh giá tốt hơn.",
  },
  {
    title: "Đa dạng hóa thị trường xuất khẩu",
    desc: "Tận dụng FTAs: EVFTA (giảm thuế về 0% vào 2027), CPTPP, RCEP để vào EU, Nhật, Úc, Canada. Phát triển thị trường Trung Đông (Halal), châu Phi (gạo giá trung bình). Mục tiêu: không thị trường nào chiếm > 25%.",
    icon: "🌍",
    principle: "Phân tán rủi ro thị trường → ổn định cầu → giá cả ổn định hơn, tuân theo quy luật cung cầu lành mạnh.",
  },
  {
    title: "Ứng dụng công nghệ 4.0 trong nông nghiệp",
    desc: "Drone phun thuốc (giảm 30% chi phí), IoT quản lý tưới tiêu tự động, AI dự báo giá thị trường cho nông dân. Blockchain truy xuất nguồn gốc nâng niềm tin người tiêu dùng quốc tế.",
    icon: "🤖",
    principle: "Cách mạng năng suất lao động: áp dụng khoa học công nghệ → tăng năng suất → giảm giá trị đơn vị sản phẩm → lợi thế cạnh tranh.",
  },
  {
    title: "Hoàn thiện chính sách giá sàn & bảo hiểm nông nghiệp",
    desc: "Nhà nước quy định giá sàn thu mua lúa = giá thành + lợi nhuận tối thiểu 30%. Mở rộng bảo hiểm rủi ro nông nghiệp (thiên tai, dịch bệnh). Hệ thống kho dự trữ quốc gia để bình ổn giá.",
    icon: "🛡️",
    principle: "Can thiệp vào thị trường khi thất bại thị trường: nhà nước đảm bảo giá cả không rớt quá xa giá trị thực.",
  },
];

export function ChallengesSection() {
  const [market, setMarket] = useState<Market>("domestic");
  const [openSolution, setOpenSolution] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950/30">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-rose-400 text-sm font-bold uppercase tracking-widest mb-3">
            Phân Tích Chương 2 · Mục IV
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Thách Thức & Giải Pháp
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Lúa gạo Việt Nam đối mặt với nhiều thách thức trong lưu thông nội địa và quốc tế.
            Dựa trên hiểu biết về quy luật thị trường, ta có thể đề xuất giải pháp phù hợp.
          </p>
        </motion.div>

        {/* Challenges */}
        <div>
          {/* Key numbers at a glance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { value: "80%", label: "Lúa bán dạng gạo thô, chưa qua chế biến sâu", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
              { value: ">70%", label: "Nông hộ diện tích < 0,5ha", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { value: "550 USD/tấn", label: "Gạo Việt vs 1.200 USD/tấn gạo Thái", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { value: "150%", label: "Giá phân bón Ure tăng 2021–2022", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} border rounded-2xl p-5 text-center`}>
                <div className={`text-2xl font-black mb-1 ${s.color} tracking-tight`}>{s.value}</div>
                <div className="text-white/50 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Market toggle */}
          <div className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl w-fit mx-auto mb-10">
            <button
              onClick={() => setMarket("domestic")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                market === "domestic"
                  ? "bg-rose-500/80 text-white shadow-lg"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Home className="w-4 h-4" />
              Trong nước
            </button>
            <button
              onClick={() => setMarket("international")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                market === "international"
                  ? "bg-rose-500/80 text-white shadow-lg"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Globe className="w-4 h-4" />
              Quốc tế
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={market}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Centre spine */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-500/30 to-transparent z-0" />

              <div className="space-y-12">
                {challenges[market].map((c, i) => {
                  const isRight = i % 2 === 0;   // even → image LEFT, text RIGHT
                  const isExpanded = expanded === i;
                  return (
                    <motion.div
                      key={`${market}-${i}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.09, duration: 0.5 }}
                      className="relative"
                    >
                      {/* Centre dot */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 w-11 h-11 rounded-full bg-slate-900 border-2 border-rose-500/50 items-center justify-center text-xl shadow-lg shadow-rose-500/20">
                        {c.icon}
                      </div>

                      <div className={`grid md:grid-cols-2 gap-0 items-stretch`}>

                        {/* ── IMAGE PANEL ── */}
                        <div className={`${isRight ? "md:order-1" : "md:order-2"} relative group cursor-pointer`}
                          onClick={() => setExpanded(isExpanded ? null : i)}
                        >
                          <div className={`relative h-64 md:h-72 overflow-hidden ${isRight ? "md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none" : "md:rounded-r-2xl rounded-t-2xl md:rounded-tl-none"}`}>
                            <Image
                              src={c.image}
                              alt={c.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                            {/* Step badge */}
                            <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow">
                              #{i + 1}
                            </div>

                            {/* Click hint */}
                            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isExpanded ? "bg-emerald-500/80 text-white" : "bg-white/15 backdrop-blur-sm text-white/70"}`}>
                              {isExpanded ? "✕ Thu gọn" : "👆 Xem chi tiết"}
                            </div>

                            {/* Key fact on image bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <p className="text-white font-black text-base leading-snug drop-shadow-lg mb-1">{c.title}</p>
                              <div className="inline-flex items-center gap-1.5 bg-rose-500/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                <span className="text-white text-xs font-bold">📊 {c.keyFact}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── CONTENT PANEL ── */}
                        <div className={`${isRight ? "md:order-2" : "md:order-1"} flex flex-col`}>
                          <div className={`flex-1 border border-rose-500/15 hover:border-rose-500/30 transition-all bg-white/[0.04] ${isRight ? "md:rounded-r-2xl rounded-b-2xl md:rounded-bl-none" : "md:rounded-l-2xl rounded-b-2xl md:rounded-br-none"} p-6 flex flex-col gap-4`}>

                            {/* Mobile title */}
                            <div className="flex items-center gap-2 md:hidden">
                              <span className="text-2xl">{c.icon}</span>
                              <h4 className="font-black text-white text-base">{c.title}</h4>
                            </div>

                            {/* Desktop title */}
                            <h4 className="hidden md:block font-black text-white text-lg leading-snug">{c.title}</h4>

                            {/* Marx law — always visible */}
                            <div className="bg-rose-500/8 border border-rose-500/20 rounded-xl p-4">
                              <p className="text-rose-300/80 text-sm leading-relaxed">
                                <span className="font-black text-rose-300">🔍 Phân tích MLN: </span>
                                {c.law}
                              </p>
                            </div>

                            {/* Click to expand detail */}
                            <button
                              onClick={() => setExpanded(isExpanded ? null : i)}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${isExpanded ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/8 hover:text-white/80"}`}
                            >
                              <span>{isExpanded ? "Thu gọn thông tin" : "Xem mô tả & dẫn chứng đầy đủ"}</span>
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="text-base"
                              >
                                ▼
                              </motion.span>
                            </button>

                            {/* Expandable detail */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="space-y-3 pt-1">
                                    {/* Full description */}
                                    <p className="text-white/65 text-sm leading-relaxed"
                                      dangerouslySetInnerHTML={{
                                        __html: c.desc.replace(
                                          /(\d[\d.,]*\s*(?:%|USD|ha|mg\/kg|triệu|tỷ|tấn|kg|đ|\/tấn|\/kg)[^\s.,;]*)/g,
                                          '<span class="font-black text-rose-300">$1</span>'
                                        ),
                                      }}
                                    />
                                    {/* Source */}
                                    <div className="flex items-start gap-2 bg-white/[0.03] rounded-lg p-3">
                                      <span className="text-white/30 text-xs mt-0.5">📎</span>
                                      <p className="text-white/35 text-xs italic leading-relaxed">{c.source}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Solutions */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">
                Giải Pháp Đề Xuất
              </p>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">
              Dựa Trên Quy Luật Thị Trường
            </h3>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Mỗi giải pháp đều bám sát nguyên lý của các quy luật kinh tế thị trường
              được học trong Chương 2.
            </p>
          </motion.div>

          <div className="space-y-3">
            {solutions.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 hover:border-emerald-500/20 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenSolution(openSolution === i ? null : i)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <span className="text-2xl shrink-0">{sol.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-base">{sol.title}</h4>
                  </div>
                  <motion.div
                    animate={{ rotate: openSolution === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openSolution === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-4">
                        <div className="border-t border-white/5 pt-4">
                          <p className="text-white/60 text-sm leading-relaxed mb-4">{sol.desc}</p>
                          <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
                            <p className="text-amber-300/80 text-sm leading-relaxed">
                              <span className="font-bold text-amber-300">⚡ Nguyên lý kinh tế: </span>
                              {sol.principle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-10 text-center"
        >
          <div className="text-5xl mb-6">🌾</div>
          <h3 className="text-2xl font-black text-white mb-4">Kết Luận</h3>
          <p className="text-white/60 max-w-3xl mx-auto leading-relaxed text-base">
            Hành trình của hạt lúa Việt Nam — từ ruộng đồng ĐBSCL đến bàn ăn khắp thế giới —
            là minh chứng sinh động cho toàn bộ lý luận hàng hóa của C.Mác: hai thuộc tính hàng hóa,
            tính hai mặt của lao động, vai trò của thị trường và tiền tệ. Vượt qua những thách thức
            hiện tại đòi hỏi sự hiểu biết sâu sắc về các quy luật kinh tế khách quan, kết hợp với
            chính sách nhà nước đúng đắn và nỗ lực đổi mới của chính người nông dân Việt Nam.
          </p>
        </motion.div>

        {/* ── MINI-GAME ── */}
        <GameChallengesSolve />
      </div>
    </section>
  );
}
