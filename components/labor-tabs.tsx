"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Brain, ArrowRight } from "lucide-react";
import Image from "next/image";
import { GameLaborTrueFalse } from "@/components/games/game-labor-truefalse";

type TabId = "concrete" | "abstract";

interface LaborStep {
  title: string;
  detail: string;
  icon: string;
  image: string;
  imageAlt: string;
  stats?: { label: string; value: string; color: string }[];
  evidence?: string;
}

interface TabData {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  tagColor: string;
  accentColor: string;
  description: string;
  marxDef: string;
  steps: LaborStep[];
  conclusion: string;
}

export function LaborTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("concrete");

  const tabs: TabData[] = [
    {
      id: "concrete",
      label: "Lao Động Cụ Thể",
      icon: <Users className="w-5 h-5" />,
      tagColor: "from-emerald-500 to-teal-600",
      accentColor: "emerald",
      description: "Những công việc hữu hình, có kỹ thuật riêng, tạo ra giá trị sử dụng",
      marxDef:
        "Lao động cụ thể là lao động có ích dưới một hình thức cụ thể của những nghề nghiệp chuyên môn nhất định. Mỗi lao động cụ thể có mục đích, đối tượng, phương tiện, phương pháp và kết quả riêng. Lao động cụ thể tạo ra giá trị sử dụng.",
      steps: [
        {
          title: "Làm đất & gieo mạ",
          detail:
            "Nông dân cày bừa, san phẳng ruộng, ngâm ủ hạt giống rồi gieo mạ. Kỹ thuật chọn giống quyết định cả vụ mùa.",
          icon: "🚜",
          image: "https://dantocmiennui-media.baotintuc.vn/images/85606b291187045610359d548510b5739534fe2adafef46ae8b1255b38d3094ede96d3efe1f45054dfc932aa0acc67bd72bb3b792576984239bcfee1c31e745aa757888b0afe54da70cf0fac35dcc0f3f871ccef0e7dc1c1d103b5fe24c402ef6447ca4927a2734a23ffee727fc83b9217f42249e0f37fb1298cc95b2627966334d2d12a90f2d31f5859d3f4cfc3ee53cbe8e35505cd548a91afcb0edeab5b86/potal_dong_thap__san_xuat_ma_lua_giong_cay_bang_may_loi_nhuan_tang_them_23_trieu_dongha_6362992.jpg",
          imageAlt: "Nông dân làm đất ruộng lúa ĐBSCL",
          stats: [
            { label: "Chi phí làm đất", value: "1,2–1,8 tr đ/ha", color: "text-emerald-400" },
            { label: "Mật độ gieo sạ", value: "80–100 kg/ha", color: "text-teal-400" },
          ],
          evidence:
            "Vụ Đông Xuân 2023–2024, ĐBSCL: nông dân chọn giống ST25, Đài Thơm 8. Chi phí giống chiếm ~12% tổng chi phí sản xuất.",
        },
        {
          title: "Chăm sóc & bón phân",
          detail:
            "Bón phân NPK theo từng giai đoạn (đẻ nhánh, làm đòng, trổ bông), phun thuốc trừ sâu bệnh, quản lý tưới tiêu.",
          icon: "🌿",
          image: "https://khodulieu.sohoa.tuyenquang.gov.vn/congthongtin/media/8156d2fef832bea1a3c75097d5b0fd7a.jpg",
          imageAlt: "Ruộng lúa xanh tốt đang chăm sóc",
          stats: [
            { label: "Chi phí phân bón", value: "3,5–4,5 tr đ/ha", color: "text-emerald-400" },
            { label: "Số lần bón phân", value: "3–4 lần/vụ", color: "text-teal-400" },
            { label: "Thuốc BVTV", value: "1,2–2 tr đ/ha", color: "text-green-400" },
          ],
          evidence:
            "Giá Ure tăng từ 7.000 đ/kg (2020) lên 16.000 đ/kg (2022) khiến chi phí bón phân tăng hơn gấp đôi, bào mòn lợi nhuận nông dân.",
        },
        {
          title: "Thu hoạch & phơi sấy",
          detail:
            "Máy gặt đập liên hợp thu hoạch khi lúa chín 85–90%, tách hạt, sấy xuống độ ẩm 14% để bảo quản an toàn.",
          icon: "🌾",
          image: "https://i.ytimg.com/vi/aamf8k0JjOM/sddefault.jpg",
          imageAlt: "Máy gặt đập liên hợp thu hoạch lúa",
          stats: [
            { label: "Năng suất bình quân", value: "5,8–6,5 tấn/ha", color: "text-emerald-400" },
            { label: "Thất thoát sau TH", value: "10–13%", color: "text-red-400" },
            { label: "Chi phí thu hoạch", value: "1,5–2 tr đ/ha", color: "text-teal-400" },
          ],
          evidence:
            "Vụ Đông Xuân 2023–2024 ĐBSCL đạt năng suất bình quân 6,8 tấn/ha. Tuy nhiên, thất thoát sau thu hoạch lên tới 13% do thiếu lò sấy, gây thiệt hại ~$150 triệu USD/năm.",
        },
        {
          title: "Xay xát & chế biến",
          detail:
            "Nhà máy xay xát tách trấu, cám, đánh bóng hạt gạo. Công nhân vận hành dây chuyền và kiểm soát chất lượng.",
          icon: "⚙️",
          image: "https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/04/0604/1004/200420/gao-xk-220420.jpg",
          imageAlt: "Nhà máy xay xát gạo công nghiệp",
          stats: [
            { label: "Tỷ lệ thu hồi gạo", value: "65–68%/tấn lúa", color: "text-emerald-400" },
            { label: "Số nhà máy XS", value: ">4.000 cơ sở", color: "text-teal-400" },
            { label: "Giá gia công", value: "200–350 đ/kg", color: "text-green-400" },
          ],
          evidence:
            "Lộc Trời Group (An Giang) đầu tư hệ thống xay xát hiện đại, đạt tỷ lệ thu hồi 68%, giảm chi phí chế biến 35% so với xay xát thủ công.",
        },
        {
          title: "Đóng gói & phân phối",
          detail:
            "Đóng bao 5–50kg có nhãn hiệu; bảo quản kho lạnh; vận chuyển bằng xe tải, container lạnh đến siêu thị và cảng xuất khẩu.",
          icon: "📦",
          image: "https://haanhtech.com/wp-content/uploads/2024/10/3-44.jpg",
          imageAlt: "Kho gạo đóng gói xuất khẩu Việt Nam",
          stats: [
            { label: "Chi phí đóng gói", value: "150–300 đ/kg", color: "text-emerald-400" },
            { label: "Gạo XK qua ICD", value: "8,3 triệu tấn", color: "text-teal-400" },
            { label: "Thị trường tiêu thụ", value: ">150 quốc gia", color: "text-blue-400" },
          ],
          evidence:
            "Năm 2023, Việt Nam xuất khẩu 8,3 triệu tấn gạo trị giá $4,7 tỷ USD — kỷ lục lịch sử. Thị trường chính: Philippines (21%), Trung Quốc (14%), Indonesia (12%).",
        },
      ],
      conclusion:
        "Tất cả các lao động cụ thể này đều có đặc thù riêng, không thể thay thế cho nhau. Chúng cộng lại tạo thành chuỗi giá trị lúa gạo — từ hạt giống đến bát cơm người tiêu dùng.",
    },
    {
      id: "abstract",
      label: "Lao Động Trừu Tượng",
      icon: <Brain className="w-5 h-5" />,
      tagColor: "from-amber-500 to-orange-600",
      accentColor: "amber",
      description: "Khía cạnh xã hội của lao động — nguồn gốc của giá trị hàng hóa",
      marxDef:
        "Lao động trừu tượng là lao động của người sản xuất hàng hóa, khi đã gạt bỏ những hình thức cụ thể của nó, chỉ còn lại sự tiêu phí sức lao động của con người (cơ bắp, thần kinh, trí tuệ). Lao động trừu tượng tạo ra giá trị của hàng hóa.",
      steps: [
        {
          title: "Hao phí sức lao động trong nông nghiệp",
          detail:
            "Dù là nông dân cày bừa hay kỹ sư vận hành máy xay, tất cả đều tiêu hao sức lực thể chất và tinh thần — khi trừu tượng hóa, đây đều là hao phí sức lao động chung của xã hội.",
          icon: "💪",
          image: "https://img.baoninhbinh.org.vn/DATA/ARTICLES/2023/2/14/thay-doi-tu-duy-trong-san-xuat-lua-gao-ky-1-kho-khan-bua-vay-e74ac.jpg",
          imageAlt: "Nông dân làm việc trên cánh đồng lúa",
          stats: [
            { label: "Lao động nông nghiệp VN", value: "~14 triệu người", color: "text-amber-400" },
            { label: "Tỷ lệ cơ giới hóa ĐBSCL", value: "~95%", color: "text-orange-400" },
          ],
          evidence:
            "Năm 2023, nông nghiệp VN sử dụng khoảng 14 triệu lao động. Riêng ĐBSCL có tỷ lệ cơ giới hóa khâu thu hoạch lên tới 95%, nhưng lao động trừu tượng vẫn hiện diện trong từng kg gạo.",
        },
        {
          title: "Thời gian lao động xã hội cần thiết",
          detail:
            "Giá trị 1 tấn lúa do thời gian lao động xã hội trung bình quyết định. Nông dân giỏi có thể làm nhanh hơn — nhưng thị trường chỉ trả theo mức trung bình xã hội.",
          icon: "⏱️",
          image: "https://cdn.thesaigontimes.vn/wp-content/uploads/2022/04/Anh-bai1.jpg",
          imageAlt: "Thị trường gạo Việt Nam",
          stats: [
            { label: "Giá lúa tươi ĐBSCL 2024", value: "7.000–8.500 đ/kg", color: "text-amber-400" },
            { label: "Chi phí SX bình quân", value: "3.500–4.200 đ/kg", color: "text-orange-400" },
            { label: "Lợi nhuận biên", value: "3.000–4.300 đ/kg", color: "text-yellow-400" },
          ],
          evidence:
            "Vụ Đông Xuân 2024: giá lúa tươi ĐBSCL đạt 8.000–8.500 đ/kg — cao nhất 10 năm. Chi phí SX trung bình 3.800 đ/kg → lợi nhuận ~4.200 đ/kg, tương đương ~24 triệu đồng/ha.",
        },
        {
          title: "Lao động giản đơn và lao động phức tạp",
          detail:
            "Cấy lúa thủ công = lao động giản đơn. Lai tạo giống ST25 = lao động phức tạp. Lao động phức tạp tạo ra nhiều giá trị hơn trong cùng một đơn vị thời gian.",
          icon: "📊",
          image: "https://cdn.tuoitrethudo.vn/stores/news_dataimages/tuoitrethudocomvn/122019/06/10/thai-lan-hai-nam-lien-mat-danh-hieu-gao-ngon-nhat-the-gioi-22-.9031.jpg",
          imageAlt: "Gạo ST25 - gạo ngon nhất thế giới",
          stats: [
            { label: "Gạo ST25 xuất khẩu", value: "1.200–1.500 USD/tấn", color: "text-amber-400" },
            { label: "Gạo IR50404 thường", value: "480–520 USD/tấn", color: "text-orange-400" },
            { label: "Chênh lệch giá trị", value: "~2,5–3 lần", color: "text-yellow-400" },
          ],
          evidence:
            "ST25 (giải gạo ngon nhất thế giới 2019) do kỹ sư Hồ Quang Cua lai tạo — lao động trí tuệ phức tạp → giá trị gấp 2,5–3 lần so với giống thường IR50404 trên thị trường quốc tế.",
        },
        {
          title: "Lao động trừu tượng tạo ra giá trị",
          detail:
            "Người mua không quan tâm ai trồng lúa. Họ trả tiền cho lượng lao động xã hội kết tinh trong sản phẩm — đây chính là giá trị hàng hóa, biểu hiện qua giá cả thị trường.",
          icon: "💎",
          image: "https://i.ex-cdn.com/danviet.vn/files/content/2025/10/27/090833hinh-1-0905.jpg",
          imageAlt: "Giá cả thị trường hàng hóa",
          stats: [
            { label: "Tổng GTSX lúa gạo VN", value: "~360.000 tỷ đ/năm", color: "text-amber-400" },
            { label: "Đóng góp vào GDP nông nghiệp", value: "~18%", color: "text-orange-400" },
          ],
          evidence:
            "Năm 2023, ngành lúa gạo VN tạo ra giá trị sản xuất ước đạt 360.000 tỷ đồng, chiếm ~18% GDP toàn ngành nông nghiệp. Đây là biểu hiện tổng hợp của toàn bộ lao động trừu tượng kết tinh trong hạt lúa.",
        },
        {
          title: "Cơ sở trao đổi ngang giá",
          detail:
            "Nhờ lao động trừu tượng, lúa gạo có thể so sánh và trao đổi với hàng hóa khác loại. Không có lao động trừu tượng, không có nền kinh tế hàng hóa.",
          icon: "🔄",
          image: "https://cdn-i2.congthuong.vn/stores/news_dataimages/2025/052025/24/10/in_article/lua-gao-1151-thanh-minh20250524101109.jpg?rt=20250601095658",
          imageAlt: "Trao đổi hàng hóa tại chợ nông sản",
          stats: [
            { label: "1 tấn lúa trao đổi được", value: "~250 lít xăng A95", color: "text-amber-400" },
            { label: "Hoặc tương đương", value: "~90 kg phân Ure", color: "text-orange-400" },
          ],
          evidence:
            "Ví dụ thực tế (2024): 1 tấn lúa = 8 triệu đồng. Cùng 8 triệu đồng đó có thể mua ~250 lít xăng, ~90 kg phân Ure, hoặc 1 ngày công máy cày. Tiền tệ là hình thức biểu hiện của lao động trừu tượng kết tinh.",
        },
      ],
      conclusion:
        "Lao động trừu tượng là bản chất xã hội ẩn sau mỗi hạt lúa. Chính nó tạo ra giá trị — thứ mà thị trường và tiền tệ sẽ đo lường, lưu thông và phân phối trong xã hội.",
    },
  ];

  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-emerald-950/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">
            Phân Tích Chương 2 · Mục II
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Hai Mặt của Lao Động Sản Xuất Hàng Hóa
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            C.Mác phát hiện ra tính chất hai mặt của lao động sản xuất hàng hóa —{" "}
            <span className="text-emerald-400 font-semibold">lao động cụ thể</span> và{" "}
            <span className="text-amber-400 font-semibold">lao động trừu tượng</span>.
            Đây là chìa khóa để hiểu nguồn gốc giá trị hàng hóa.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white/5 backdrop-blur-sm p-1.5 rounded-xl border border-white/10 w-fit mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.tagColor} text-white shadow-lg`
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Top banner */}
          <div className={`bg-gradient-to-r ${active.tagColor} p-6`}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl text-white shrink-0">
                {active.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-1">{active.label}</h3>
                <p className="text-white/80 text-sm">{active.description}</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-8">
            {/* Marx definition */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <p className="text-white/60 text-sm leading-relaxed italic">
                <span className="not-italic font-bold text-white/80">C.Mác định nghĩa: </span>
                {active.marxDef}
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
                Biểu hiện qua chuỗi lúa gạo Việt Nam
              </h4>
              {active.steps.map((step, index) => {
                const isLast = index === active.steps.length - 1;
                const dotColor = active.id === "concrete" ? "bg-emerald-500" : "bg-amber-500";
                const lineColor = active.id === "concrete" ? "bg-emerald-500/20" : "bg-amber-500/20";
                const statBg = active.id === "concrete" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20";
                const evidenceBg = active.id === "concrete" ? "bg-teal-500/5 border-teal-500/15" : "bg-orange-500/5 border-orange-500/15";
                const evidenceText = active.id === "concrete" ? "text-teal-300/80" : "text-orange-300/80";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-5"
                  >
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center shrink-0 w-10">
                      <div className={`w-9 h-9 rounded-full ${dotColor} flex items-center justify-center text-white text-base shadow-lg z-10`}>
                        {step.icon}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[2rem] ${lineColor} my-1`} />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}>
                      <div className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all">
                        {/* Image */}
                        <div className="relative w-full h-44 overflow-hidden">
                          <Image
                            src={step.image}
                            alt={step.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                            unoptimized
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          {/* Step number + title on image */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
                            <div className={`w-8 h-8 rounded-full ${dotColor} flex items-center justify-center text-white text-sm font-black shrink-0`}>
                              {index + 1}
                            </div>
                            <h5 className="text-white font-black text-base leading-tight drop-shadow">
                              {step.title}
                            </h5>
                          </div>
                        </div>

                        <div className="p-5">
                          {/* Description */}
                          <p className="text-white/55 text-sm leading-relaxed mb-4">{step.detail}</p>

                          {/* Stats badges */}
                          {step.stats && step.stats.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {step.stats.map((stat, si) => (
                                <div key={si} className={`${statBg} border rounded-lg px-3 py-2 flex flex-col items-center min-w-[100px]`}>
                                  <span className={`text-base font-black ${stat.color} leading-tight`}>{stat.value}</span>
                                  <span className="text-white/40 text-[10px] mt-0.5 text-center">{stat.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Evidence */}
                          {step.evidence && (
                            <div className={`${evidenceBg} border rounded-xl p-3`}>
                              <p className={`text-xs leading-relaxed ${evidenceText}`}>
                                <span className="font-bold">📌 Dẫn chứng: </span>
                                {step.evidence}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Conclusion */}
            <div className={`bg-gradient-to-r ${active.tagColor} bg-opacity-10 rounded-xl p-5`}
              style={{ background: activeTab === "concrete" ? "rgba(16,185,129,0.07)" : "rgba(245,158,11,0.07)" }}
            >
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="font-bold text-white">🎯 Kết luận: </span>
                {active.conclusion}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid md:grid-cols-2 gap-4"
        >
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm">Lao động cụ thể</span>
            </div>
            <p className="text-white/50 text-sm">→ Tạo ra <span className="text-emerald-300 font-semibold">giá trị sử dụng</span></p>
            <p className="text-white/50 text-sm">→ Đa dạng, không thể so sánh trực tiếp</p>
            <p className="text-white/50 text-sm">→ Phạm trù vĩnh cửu</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">Lao động trừu tượng</span>
            </div>
            <p className="text-white/50 text-sm">→ Tạo ra <span className="text-amber-300 font-semibold">giá trị</span></p>
            <p className="text-white/50 text-sm">→ Đồng nhất, có thể so sánh qua thời gian</p>
            <p className="text-white/50 text-sm">→ Phạm trù lịch sử (kinh tế hàng hóa)</p>
          </div>
        </motion.div>

        {/* ── MINI-GAME ── */}
        <GameLaborTrueFalse />
      </div>
    </section>
  );
}
