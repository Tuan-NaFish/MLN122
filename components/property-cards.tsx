"use client";

import { motion } from "framer-motion";
import { Leaf, TrendingUp, Clock, Layers, ExternalLink } from "lucide-react";
import { GamePropertySort } from "@/components/games/game-property-sort";

interface DetailItem {
  point: string;
  sub: string;
}

interface SourceItem {
  label: string;
  url: string;
}

interface PropertyCardProps {
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  theory: string;
  icon: React.ReactNode;
  iconBg: string;
  details: DetailItem[];
  example: string;
  exampleImage: string;
  exampleCaption: string;
  sources: SourceItem[];
  borderColor: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  tag,
  tagColor,
  title,
  subtitle,
  theory,
  icon,
  iconBg,
  details,
  example,
  exampleImage,
  exampleCaption,
  sources,
  borderColor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <div className={`relative bg-white/5 backdrop-blur-md border ${borderColor} rounded-2xl p-8 h-full hover:bg-white/[0.07] transition-all duration-500 flex flex-col gap-5`}>
        {/* Tag */}
        <span className={`self-start text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${tagColor}`}>
          {tag}
        </span>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${iconBg} shrink-0`}>
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-black text-white mb-1">{title}</h3>
            <p className="text-sm text-white/40 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* Theory box */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
          <p className="text-white/60 leading-relaxed text-sm">
            <span className="text-white/80 font-semibold">Lý luận: </span>
            {theory}
          </p>
        </div>

        {/* Details */}
        <ul className="space-y-3 flex-1">
          {details.map((detail, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <span className="text-white/80 font-medium text-sm">{detail.point}</span>
                {detail.sub && (
                  <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{detail.sub}</p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Example highlight — ảnh + text + nguồn */}
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl overflow-hidden flex flex-col">
          {/* Ảnh minh họa */}
          <div className="relative w-full aspect-[4/3] bg-black/10 overflow-hidden">
            <img
              src={exampleImage}
              alt={exampleCaption}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10]/90 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-3 text-white/40 text-[10px] italic">{exampleCaption}</span>
          </div>
          {/* Nội dung */}
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            <p className="text-emerald-300/80 text-sm leading-relaxed">
              <span className="font-bold">📌 Ví dụ thực tế: </span>
              {example}
            </p>
            {/* Nguồn tham khảo */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-white/[0.06] mt-auto min-h-[52px]">
              <span className="text-white/30 text-[11px] font-semibold uppercase tracking-wide self-center">Nguồn:</span>
              {sources.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400/70 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-400/40 rounded-full px-2.5 py-0.5 transition-colors"
                >
                  {s.label}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function PropertyCards() {
  const properties: PropertyCardProps[] = [
    {
      tag: "Thuộc tính 1",
      tagColor: "bg-emerald-500/15 text-emerald-400",
      title: "Giá Trị Sử Dụng",
      subtitle: "Use Value — Công dụng thực tiễn của hàng hóa",
      theory:
        "Giá trị sử dụng là công dụng của vật phẩm, tức là khả năng của nó thỏa mãn nhu cầu nào đó của con người. Đây là phạm trù vĩnh viễn, tồn tại ở mọi phương thức sản xuất.",
      icon: <Leaf className="w-6 h-6 text-emerald-300" />,
      iconBg: "bg-emerald-500/15 border border-emerald-500/20",
      borderColor: "border-emerald-500/15 hover:border-emerald-500/30",
      details: [
        {
          point: "Cung cấp lương thực thiết yếu",
          sub: "Gạo là thức ăn chính của hơn 90 triệu người Việt, cung cấp ~50% lượng calo hàng ngày.",
        },
        {
          point: "Đa dạng sản phẩm chế biến",
          sub: "Từ lúa có thể tạo ra: gạo trắng, gạo lứt, bột gạo, bún, bánh phở, rượu gạo, bia gạo, tinh bột gạo.",
        },
        {
          point: "Giá trị sử dụng phụ phẩm",
          sub: "Rơm dùng làm thức ăn gia súc, chất đốt, ủ phân hữu cơ; trấu dùng làm chất đốt, vật liệu xây dựng.",
        },
        {
          point: "Chất lượng quyết định mức thỏa mãn nhu cầu",
          sub: "Gạo ST25 (gạo ngon nhất thế giới 2019) có giá trị sử dụng cao hơn các loại gạo thường do chất lượng vượt trội.",
        },
      ],
      example:
        "Cùng là lúa, nhưng giống lúa Jasmine 85 có giá trị sử dụng khác (dẻo, thơm, ngon) so với lúa IR50404 (cứng hơn, dùng chế biến công nghiệp). Giá trị sử dụng phụ thuộc vào thuộc tính tự nhiên của vật phẩm.",
      exampleImage: "https://down-vn.img.susercontent.com/file/vn-11134208-7ra0g-ma14med37m6y8c",
      exampleCaption: "Gạo ST25 — gạo ngon nhất thế giới 2019 (World's Best Rice)",
      sources: [
        { label: "Bộ NN&PTNT", url: "https://www.mard.gov.vn" },
      ],
    },
    {
      tag: "Thuộc tính 2",
      tagColor: "bg-amber-500/15 text-amber-400",
      title: "Giá Trị (Trao Đổi)",
      subtitle: "Value / Exchange Value — Lao động xã hội kết tinh",
      theory:
        "Giá trị hàng hóa là lao động xã hội của người sản xuất kết tinh trong hàng hóa. Giá trị trao đổi là hình thức biểu hiện của giá trị — tỷ lệ mà hàng hóa này được đổi lấy hàng hóa khác. Thước đo giá trị là thời gian lao động xã hội cần thiết.",
      icon: <TrendingUp className="w-6 h-6 text-amber-300" />,
      iconBg: "bg-amber-500/15 border border-amber-500/20",
      borderColor: "border-amber-500/15 hover:border-amber-500/30",
      details: [
        {
          point: "Thời gian lao động xã hội cần thiết",
          sub: "Giá trị 1 tấn lúa được xác định bởi thời gian lao động trung bình xã hội để sản xuất 1 tấn lúa, không phải thời gian của cá nhân từng nông dân.",
        },
        {
          point: "Giá cả là hình thức tiền tệ của giá trị",
          sub: "Năm 2024, giá lúa tươi tại ĐBSCL đạt 7.000–8.500 đồng/kg — đây là giá trị hạt lúa được biểu hiện bằng tiền.",
        },
        {
          point: "Giá trị thay đổi theo năng suất lao động",
          sub: "Áp dụng máy gặt đập liên hợp giúp tăng năng suất lao động → thời gian lao động cần thiết giảm → giá trị đơn vị sản phẩm giảm.",
        },
        {
          point: "Lúa xuất khẩu mang theo giá trị quốc tế",
          sub: "Gạo 5% tấm Việt Nam xuất khẩu giá ~550–600 USD/tấn (2024) — giá trị được thể hiện trên thị trường thế giới.",
        },
      ],
      example:
        "1 tấn lúa tươi = 7.500.000 đồng (giá trị trao đổi). Nhưng nếu có thiên tai (giảm cung) → giá tăng 9.000đ/kg, hoặc được mùa đại trà (tăng cung) → giá rớt còn 5.000đ/kg. Giá trị không đổi nhưng giá cả dao động xung quanh giá trị theo cung-cầu.",
      exampleImage: "https://cdn2.baodongthap.vn/image/news/2023/20230203/fckimage/images1784406-01.jpg",
      exampleCaption: "Thị trường lúa gạo ĐBSCL — giá cả biến động theo cung cầu",
      sources: [
        { label: "Agro.gov.vn — Giá lúa gạo", url: "https://agro.gov.vn" },
        { label: "VASEP — Xuất khẩu gạo 2024", url: "https://vasep.com.vn" },
        { label: "World Bank — Rice price", url: "https://www.worldbank.org/en/research/commodity-markets" },
      ],
    },
  ];

  return (
    <section
      id="properties-section"
      className="py-24 px-4 bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">
            Phân Tích Chương 2 · Mục I
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Hai Thuộc Tính của Hàng Hóa
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Theo C.Mác: hàng hóa có hai thuộc tính là{" "}
            <span className="text-emerald-400 font-semibold">giá trị sử dụng</span> và{" "}
            <span className="text-amber-400 font-semibold">giá trị</span>.
            Hạt lúa Việt Nam là minh chứng điển hình cho lý luận này.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>

        {/* Relationship callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-500/5 via-white/5 to-amber-500/5 border border-white/10 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl shrink-0">
              <Layers className="w-6 h-6 text-white/60" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Mối quan hệ biện chứng</h4>
              <p className="text-white/55 leading-relaxed">
                Hai thuộc tính này{" "}
                <strong className="text-white/80">thống nhất</strong> trong một hàng hóa nhưng lại{" "}
                <strong className="text-white/80">mâu thuẫn</strong> nhau: Người sản xuất quan tâm đến{" "}
                <span className="text-amber-300/80">giá trị</span> (bán được bao nhiêu tiền), còn người
                tiêu dùng quan tâm đến{" "}
                <span className="text-emerald-300/80">giá trị sử dụng</span> (dùng được gì). Mâu thuẫn
                này chỉ được giải quyết khi hàng hóa được bán ra — hạt lúa rời tay nông dân đến tay
                người tiêu dùng.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: <Clock className="w-5 h-5" />, value: "3–4 tháng", label: "Chu kỳ sản xuất lúa", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { icon: "🌾", value: "44 triệu tấn", label: "Sản lượng VN/năm (2023)", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
            { icon: "💵", value: "$4.7 tỷ USD", label: "Kim ngạch xuất khẩu gạo 2023", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { icon: "🏆", value: "Top 2", label: "Nước xuất khẩu gạo thế giới", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} border rounded-2xl p-6 text-center`}>
              <div className={`text-3xl mb-3 flex justify-center ${typeof stat.icon !== "string" ? stat.color : ""}`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-black mb-2 ${stat.color} tracking-tight`}>{stat.value}</div>
              <div className="text-white/50 text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── MINI-GAME ── */}
        <GamePropertySort />
      </div>
    </section>
  );
}
