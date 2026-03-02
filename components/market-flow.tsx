"use client";

import { motion } from "framer-motion";
import { Wheat, DollarSign, Store, Ship, TrendingUp, ArrowRight, ArrowDown, BarChart3, Landmark, Shuffle, Layers3, TrendingDown, Zap, GraduationCap } from "lucide-react";
import { GameMarketQuiz } from "@/components/games/game-market-quiz";

export function MarketFlow() {
  const journey = [
    {
      icon: <Wheat className="w-7 h-7" />,
      title: "Nông dân",
      subtitle: "Người sản xuất",
      desc: "Trồng lúa tại ĐBSCL, An Giang, Kiên Giang... Tạo ra giá trị sử dụng và giá trị.",
      gradient: "from-emerald-500 to-teal-600",
      glow: "rgba(16,185,129,0.2)",
    },
    {
      icon: <Store className="w-7 h-7" />,
      title: "Thương lái",
      subtitle: "Trung gian lưu thông",
      desc: "Thu mua lúa tươi, vận chuyển về nhà máy xay xát. Tiền tệ làm phương tiện lưu thông.",
      gradient: "from-amber-500 to-yellow-600",
      glow: "rgba(245,158,11,0.2)",
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      title: "Thị trường",
      subtitle: "Định giá & phân phối",
      desc: "Sở giao dịch, siêu thị, chợ đầu mối, sàn thương mại điện tử. Cung-cầu quyết định giá cả.",
      gradient: "from-blue-500 to-indigo-600",
      glow: "rgba(96,165,250,0.2)",
    },
    {
      icon: <Ship className="w-7 h-7" />,
      title: "Xuất khẩu",
      subtitle: "Thị trường quốc tế",
      desc: "Gạo Việt Nam xuất sang Philippines, Trung Quốc, EU... Tiền ngoại tệ làm phương tiện thanh toán quốc tế.",
      gradient: "from-purple-500 to-violet-600",
      glow: "rgba(168,85,247,0.2)",
    },
    {
      icon: <Landmark className="w-7 h-7" />,
      title: "Nhà nước",
      subtitle: "Điều tiết thị trường",
      desc: "Ban hành chính sách hỗ trợ giá, điều tiết hạn ngạch XK, triển khai đề án 1 triệu ha lúa chất lượng cao.",
      gradient: "from-sky-500 to-blue-600",
      glow: "rgba(14,165,233,0.2)",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Người tiêu dùng",
      subtitle: "Thỏa mãn nhu cầu",
      desc: "Giá trị sử dụng được thực hiện. Tiền chuyển từ người tiêu dùng → nông dân (chu trình mới).",
      gradient: "from-rose-500 to-pink-600",
      glow: "rgba(244,63,94,0.2)",
    },
  ];

  const moneyRoles = [
    {
      title: "Thước đo giá trị",
      desc: "Tiền đo lường giá trị lúa: 1kg lúa = 7.500đ, 1kg gạo ST25 = 35.000đ. Tiền là hình thức giá trị tổng quát.",
      emoji: "📏",
      color: "border-emerald-500/20 hover:border-emerald-500/30",
    },
    {
      title: "Phương tiện lưu thông",
      desc: "Nông dân nhận tiền từ thương lái → mua phân bón, giống mới. Tiền làm trung gian trao đổi H–T–H.",
      emoji: "🔄",
      color: "border-amber-500/20 hover:border-amber-500/30",
    },
    {
      title: "Phương tiện thanh toán",
      desc: "Hợp đồng mua gạo ký trước, thanh toán sau. Tín dụng nông nghiệp, L/C xuất khẩu.",
      emoji: "📋",
      color: "border-blue-500/20 hover:border-blue-500/30",
    },
    {
      title: "Phương tiện cất trữ",
      desc: "Nông dân bán lúa → giữ tiền chờ thời điểm đầu tư tốt hơn. Tiền là đại diện tổng quát của cải.",
      emoji: "🏦",
      color: "border-purple-500/20 hover:border-purple-500/30",
    },
    {
      title: "Tiền tệ thế giới",
      desc: "Giao dịch xuất khẩu gạo bằng USD. Tỷ giá ảnh hưởng trực tiếp đến lợi nhuận xuất khẩu.",
      emoji: "🌐",
      color: "border-rose-500/20 hover:border-rose-500/30",
    },
    {
      title: "Điều tiết thị trường",
      desc: "Khi giá gạo thế giới tăng → USD/tấn tăng → nông dân tích cực sản xuất → cung tăng → giá ổn định.",
      emoji: "⚖️",
      color: "border-teal-500/20 hover:border-teal-500/30",
    },
  ];

  const marketLaws = [
    {
      law: "Quy Luật Giá Trị",
      desc: "Lúa phải được trao đổi theo đúng lượng lao động xã hội cần thiết. Nông dân giảm chi phí sản xuất → giữ được lợi nhuận khi giá thị trường bằng giá trị.",
      emoji: "💎",
      color: "border-amber-500/20",
    },
    {
      law: "Quy Luật Cung – Cầu",
      desc: "Được mùa lớn (cung tăng) → giá lúa giảm. Thiếu hụt do hạn mặn (cung giảm) → giá tăng. Thị trường tự điều tiết qua cơ chế giá cả.",
      emoji: "📊",
      color: "border-blue-500/20",
    },
    {
      law: "Quy Luật Cạnh Tranh",
      desc: "Cạnh tranh giữa nông dân VN với nhau → đẩy giá xuống. Cạnh tranh với gạo Thái, Ấn Độ → áp lực cải tiến chất lượng, hạ giá thành.",
      emoji: "⚔️",
      color: "border-rose-500/20",
    },
    {
      law: "Quy Luật Lưu Thông Tiền Tệ",
      desc: "Lượng tiền cần trong lưu thông = Tổng giá cả hàng hóa ÷ Tốc độ quay vòng tiền. Nếu thừa tiền → lạm phát → giá gạo danh nghĩa tăng.",
      emoji: "💰",
      color: "border-emerald-500/20",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/50 to-slate-900">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* ══ PHẦN A: Điều kiện ra đời sản xuất hàng hóa ══ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">
              Phân Tích Chương 2 · Nền Tảng
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Điều Kiện Ra Đời Sản Xuất Hàng Hóa
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
              Theo C.Mác, sản xuất hàng hóa ra đời và tồn tại dựa trên{" "}
              <span className="text-white font-semibold">hai điều kiện cơ bản</span> — thiếu một trong hai, sản xuất hàng hóa không thể hình thành.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Điều kiện 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/[0.04] border border-emerald-500/20 rounded-2xl overflow-hidden h-full flex flex-col"
            >
              <div className="bg-emerald-500/10 px-6 py-4 border-b border-emerald-500/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Shuffle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest">Điều kiện 1</p>
                  <h3 className="text-white font-black text-lg leading-tight">Phân công lao động xã hội</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <p className="text-white/65 text-sm leading-relaxed">
                  Xã hội có <span className="text-white font-semibold">chuyên môn hóa sản xuất</span> — mỗi người chỉ làm ra một số sản phẩm nhất định, từ đó nảy sinh nhu cầu trao đổi để thỏa mãn nhu cầu đa dạng.
                </p>
                <div className="space-y-2.5">
                  {[
                    { role: "Nông dân ĐBSCL", task: "Chuyên trồng lúa, không tự xay xát hay phân phối", icon: "🌾" },
                    { role: "Nhà máy xay xát", task: "Chuyên chế biến, không tự trồng hay bán lẻ", icon: "⚙️" },
                    { role: "Thương lái / đại lý", task: "Chuyên thu mua, vận chuyển, phân phối gạo", icon: "🚚" },
                    { role: "Siêu thị / chợ", task: "Chuyên bán lẻ đến tay người tiêu dùng cuối", icon: "🏪" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
                      <span className="text-lg shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-white/90 text-sm font-semibold">{item.role}</p>
                        <p className="text-white/45 text-xs mt-0.5">{item.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-3 mt-auto">
                  <p className="text-emerald-300/80 text-xs leading-relaxed">
                    <span className="font-bold">→ Kết quả:</span> Vì phân công, mỗi chủ thể chỉ có một loại sản phẩm nhưng cần nhiều loại khác nhau → phải trao đổi → sản xuất hàng hóa ra đời.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Điều kiện 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.04] border border-amber-500/20 rounded-2xl overflow-hidden h-full flex flex-col"
            >
              <div className="bg-amber-500/10 px-6 py-4 border-b border-amber-500/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Layers3 className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-400 text-[11px] font-bold uppercase tracking-widest">Điều kiện 2</p>
                  <h3 className="text-white font-black text-lg leading-tight">Tách biệt tương đối về kinh tế</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <p className="text-white/65 text-sm leading-relaxed">
                  Những người sản xuất <span className="text-white font-semibold">độc lập với nhau</span>, có quyền sở hữu riêng về tư liệu sản xuất và sản phẩm. Chỉ khi đó việc trao đổi mới mang tính ngang giá.
                </p>
                <div className="space-y-2.5">
                  {[
                    { title: "Sở hữu ruộng đất", desc: "Nông dân có quyền sử dụng đất (sổ đỏ), tự quyết định trồng giống gì, bán cho ai", icon: "📋" },
                    { title: "Sở hữu sản phẩm", desc: "Lúa sau thu hoạch thuộc về nông dân — có quyền giữ lại, bán hoặc chế biến", icon: "🌾" },
                    { title: "Tự chịu lỗ lãi", desc: "Nếu giá lúa rớt, nông dân tự gánh chịu — không ai bù đắp (trừ chính sách Nhà nước)", icon: "📉" },
                    { title: "Tự do hợp đồng", desc: "Ký hợp đồng bao tiêu với doanh nghiệp hoặc bán tự do cho thương lái theo giá thị trường", icon: "🤝" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
                      <span className="text-lg shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-white/90 text-sm font-semibold">{item.title}</p>
                        <p className="text-white/45 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-500/8 border border-amber-500/15 rounded-xl p-3 mt-auto">
                  <p className="text-amber-300/80 text-xs leading-relaxed">
                    <span className="font-bold">→ Kết quả:</span> Vì tách biệt sở hữu, lúa của nông dân là "của riêng" — chỉ được chuyển cho người khác thông qua trao đổi mua bán có đền bù.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Kết luận 2 điều kiện */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 flex items-start gap-4"
          >
            <span className="text-2xl shrink-0">⚠️</span>
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="text-white font-semibold">Mâu thuẫn cơ bản:</span> Nông dân lao động mang tính{" "}
              <span className="text-amber-300 font-semibold">tư nhân</span> (tự quyết định), nhưng sản phẩm chỉ được xã hội thừa nhận khi bán được trên thị trường —{" "}
              tức là lao động tư nhân phải được xác nhận là{" "}
              <span className="text-emerald-300 font-semibold">lao động xã hội</span>. Đây là mâu thuẫn cơ bản của nền sản xuất hàng hóa, nguồn gốc của khủng hoảng kinh tế.
            </p>
          </motion.div>
        </div>

        {/* ══ PHẦN JOURNEY FLOW ══ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3">
              Phân Tích Chương 2 · Mục III
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Vai Trò Thị Trường & Tiền Tệ
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Hành trình từ ruộng đồng đến bàn ăn của hạt lúa là minh chứng
              sống động cho vai trò của thị trường trong lưu thông, định giá và tiêu thụ hàng hóa.
            </p>
          </motion.div>

          {/* Journey Steps */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 mb-6">
            {journey.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center max-w-[160px]"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer mb-3`}
                    style={{ boxShadow: `0 0 24px ${step.glow}` }}
                  >
                    {step.icon}
                  </motion.div>
                  <p className="text-white font-bold text-sm text-center">{step.title}</p>
                  <p className="text-white/40 text-xs text-center mb-2">{step.subtitle}</p>
                  <p className="text-white/50 text-xs text-center leading-relaxed">{step.desc}</p>
                </motion.div>

                {index < journey.length - 1 && (
                  <>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="hidden md:flex items-center mx-4"
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-0.5 bg-white/15 rounded-full" />
                        <ArrowRight className="w-4 h-4 text-white/30" />
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="md:hidden flex my-3"
                    >
                      <ArrowDown className="w-5 h-5 text-white/30" />
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* H-T-H formula */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {["H (Lúa)", "→", "T (Tiền)", "→", "H' (Hàng khác)"].map((item, i) => (
              <div
                key={i}
                className={`px-5 py-3 rounded-xl font-bold text-sm ${
                  item === "→"
                    ? "text-white/30 text-lg"
                    : item.includes("T")
                    ? "bg-amber-500/10 border border-amber-500/20 text-amber-300"
                    : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                }`}
              >
                {item}
              </div>
            ))}
            <span className="text-white/30 text-sm ml-2">— Công thức lưu thông hàng hóa giản đơn</span>
          </motion.div>
        </div>

        {/* Part 2: Money Roles */}
        <div>
          {/* Key number stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { value: "7.500đ/kg", label: "Giá lúa tươi ĐBSCL (2024)", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { value: "35.000đ - 55.000đ/kg", label: "Gạo ST25 thị trường nội địa", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { value: "580 USD/tấn", label: "Gạo 5% tấm xuất khẩu 2024", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { value: "8.3 triệu tấn", label: "Gạo xuất khẩu năm 2023", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} border rounded-2xl p-5 text-center`}>
                <div className={`text-2xl font-black mb-1 ${s.color} tracking-tight`}>{s.value}</div>
                <div className="text-white/50 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">Vai Trò Của Tiền Tệ</p>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">
              Tiền Tệ Trong Chuỗi Lúa Gạo
            </h3>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Tiền tệ không chỉ là phương tiện mua bán mà còn thực hiện nhiều chức năng kinh tế khác nhau.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {moneyRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`bg-white/5 border ${role.color} rounded-xl p-5 transition-all duration-300`}
              >
                <div className="text-3xl mb-3">{role.emoji}</div>
                <h4 className="font-bold text-white text-base mb-2">{role.title}</h4>
                <p className="text-white/55 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: role.desc.replace(
                      /(\d[\d.,]*\s*(?:đ|USD|tỷ|triệu|tấn|kg|%|\/kg|\/tấn)[^\s.,;]*)/g,
                      '<span class="font-black text-amber-300">$1</span>'
                    ),
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ PHẦN B: Lượng giá trị hàng hóa — Bản đồ tăng trưởng ══ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">
              Phân Tích Chương 2 · Lượng Giá Trị
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              3 Nhân Tố Ảnh Hưởng Lượng Giá Trị
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
              Lượng giá trị hàng hóa được đo bằng{" "}
              <span className="text-white font-semibold">thời gian lao động xã hội cần thiết</span>.
              Ba nhân tố sau tác động trực tiếp đến lượng giá trị của hạt lúa Việt Nam.
            </p>
          </motion.div>

          {/* Bản đồ tăng trưởng */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 space-y-10">

            {/* Nhân tố 1: Năng suất lao động */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Nhân tố 1 · NSLĐ tăng → Giá trị giảm</span>
                  <h4 className="text-white font-black text-lg leading-none">Năng suất lao động</h4>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <p className="text-white/30 text-xs">Giá thành sản xuất</p>
                  <p className="text-emerald-400 font-black text-xl">↓ 30–40%</p>
                </div>
              </div>
              {/* Track bar */}
              <div className="relative">
                {/* Trục thời gian */}
                <div className="flex items-stretch gap-0 mb-2">
                  {[
                    { year: "Trước 1990", val: "~200 công/ha", pct: 100, label: "Thủ công hoàn toàn", color: "bg-red-500/40" },
                    { year: "2000–2010", val: "~80 công/ha", pct: 60, label: "Cơ giới hóa một phần", color: "bg-amber-500/40" },
                    { year: "2015–2020", val: "~30 công/ha", pct: 35, label: "Máy gặt phổ biến", color: "bg-yellow-500/40" },
                    { year: "2024", val: "~8 công/ha", pct: 12, label: "Máy gặt đập liên hợp", color: "bg-emerald-500/60" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex-1 flex flex-col items-center gap-2 px-1"
                    >
                      <span className="text-white/80 text-xs font-black">{item.val}</span>
                      {/* Bar từ trên xuống, cao tương đương pct% */}
                      <div className="w-full flex flex-col justify-end" style={{ height: "80px" }}>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${item.pct}%` }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`w-full rounded-t-lg ${item.color}`}
                          style={{ height: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-white/50 text-[10px] font-semibold text-center">{item.year}</span>
                      <span className="text-white/30 text-[10px] text-center leading-tight hidden sm:block">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="text-white/20 text-[10px] text-right mt-1">← Chi phí lao động trên 1 ha giảm dần theo thời gian</div>
              </div>
            </motion.div>

            <div className="h-px bg-white/[0.06]" />

            {/* Nhân tố 2: Cường độ lao động */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">Nhân tố 2 · Cường độ tăng → Tổng GT tăng, đơn vị không đổi</span>
                  <h4 className="text-white font-black text-lg leading-none">Cường độ lao động</h4>
                </div>
              </div>
              {/* So sánh 2 kịch bản song song */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Làm 8h/ngày (bình thường)",
                    bars: [
                      { name: "Sản lượng", val: "100%", pct: 50, color: "bg-amber-500/30" },
                      { name: "Tổng giá trị", val: "100%", pct: 50, color: "bg-amber-500/30" },
                      { name: "Giá trị/kg", val: "7.500đ", pct: 50, color: "bg-amber-500/30" },
                    ],
                    accent: "border-amber-500/20",
                  },
                  {
                    label: "Làm 12h/ngày (tăng cường độ)",
                    bars: [
                      { name: "Sản lượng", val: "+50%", pct: 75, color: "bg-amber-400/60" },
                      { name: "Tổng giá trị", val: "+50%", pct: 75, color: "bg-amber-400/60" },
                      { name: "Giá trị/kg", val: "7.500đ ✓", pct: 50, color: "bg-amber-500/30" },
                    ],
                    accent: "border-amber-400/40",
                  },
                ].map((scenario, si) => (
                  <div key={si} className={`bg-white/[0.03] border ${scenario.accent} rounded-2xl p-4`}>
                    <p className="text-white/60 text-xs font-semibold mb-4 leading-tight">{scenario.label}</p>
                    <div className="space-y-3">
                      {scenario.bars.map((bar, bi) => (
                        <div key={bi}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/40">{bar.name}</span>
                            <span className="text-white/80 font-bold">{bar.val}</span>
                          </div>
                          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${bar.pct}%` }}
                              transition={{ delay: si * 0.1 + bi * 0.1 + 0.3, duration: 0.6 }}
                              viewport={{ once: true }}
                              className={`h-full rounded-full ${bar.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-[11px] mt-3 text-center">
                Cường độ tăng → sản lượng &amp; tổng giá trị tăng, nhưng giá trị mỗi đơn vị sản phẩm <span className="text-amber-300/70 font-semibold">không thay đổi</span>
              </p>
            </motion.div>

            <div className="h-px bg-white/[0.06]" />

            {/* Nhân tố 3: Lao động phức tạp / giản đơn */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <span className="text-sky-400 text-[10px] font-bold uppercase tracking-widest">Nhân tố 3 · LĐ phức tạp = bội số LĐ giản đơn</span>
                  <h4 className="text-white font-black text-lg leading-none">Lao động phức tạp vs Giản đơn</h4>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { level: "Lao động giản đơn", role: "Cấy lúa thủ công", income: "~250.000đ/ngày", gtPerHour: 1, color: "bg-white/20", textColor: "text-white/60", badge: "Giản đơn" },
                  { level: "Lao động kỹ thuật", role: "Vận hành máy gặt đập liên hợp", income: "~600.000đ/ngày", gtPerHour: 2.4, color: "bg-amber-400/50", textColor: "text-amber-300", badge: "Trung bình" },
                  { level: "Kỹ sư nông nghiệp", role: "Nghiên cứu, chọn tạo giống ST25", income: "~1.500.000đ/ngày", gtPerHour: 6, color: "bg-sky-400/60", textColor: "text-sky-300", badge: "Phức tạp cao" },
                  { level: "Chuyên gia xuất khẩu", role: "Đàm phán hợp đồng quốc tế", income: "~3.000.000đ/ngày", gtPerHour: 12, color: "bg-violet-400/60", textColor: "text-violet-300", badge: "Rất phức tạp" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-28 shrink-0 text-right">
                      <span className={`text-[11px] font-bold ${item.textColor}`}>{item.badge}</span>
                    </div>
                    {/* Bar ngang */}
                    <div className="flex-1 h-8 bg-white/[0.04] rounded-xl overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.gtPerHour / 12) * 100}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-xl ${item.color} flex items-center justify-end pr-3`}
                      >
                        <span className="text-white text-xs font-black whitespace-nowrap">{item.income}</span>
                      </motion.div>
                    </div>
                    <div className="w-36 shrink-0 hidden md:block">
                      <p className="text-white/40 text-[11px] leading-tight">{item.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/30 text-[11px] mt-4 text-center">
                Bội số giá trị tạo ra trong cùng 1 giờ lao động — lao động phức tạp <span className="text-sky-300/70 font-semibold">= nhiều lần lao động giản đơn</span>
              </p>
            </motion.div>

          </div>
        </div>

        {/* Part 3: Market Laws */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">Quy Luật Thị Trường</p>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">
              Các Quy Luật Chi Phối Thị Trường Lúa Gạo
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {marketLaws.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/5 border ${item.color} rounded-2xl p-6 hover:bg-white/[0.07] transition-all`}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h4 className="font-black text-white text-lg mb-3">{item.law}</h4>
                <p className="text-white/55 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MINI-GAME ── */}
        <GameMarketQuiz />
      </div>
    </section>
  );
}
