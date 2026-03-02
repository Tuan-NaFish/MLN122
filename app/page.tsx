import { HeroSection } from "@/components/hero-section";
import { PropertyCards } from "@/components/property-cards";
import { LaborTabs } from "@/components/labor-tabs";
import { MarketFlow } from "@/components/market-flow";
import { ChallengesSection } from "@/components/challenges-section";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <PropertyCards />
      <LaborTabs />
      <MarketFlow />
      <ChallengesSection />

      {/* ChatGPT academic process */}
      <section className="px-6 py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Cam kết học thuật
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                🛡️ QUY TRÌNH SỬ DỤNG CHATGPT TRONG HỌC THUẬT
              </h2>
              <p className="text-white/50 text-sm mt-4">
                Tuyên bố cách sử dụng ChatGPT có kiểm soát, minh bạch và phù hợp với chuẩn mực học thuật.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  1. Minh bạch hóa việc tham khảo
                </h3>
                <div className="space-y-2 text-white/60 text-sm leading-relaxed">
                  <p>
                    ChatGPT: Được sử dụng như một cộng sự để gợi ý cấu trúc bài viết, giải thích các thuật ngữ chuyên môn phức tạp và hỗ trợ tìm kiếm từ khóa liên quan đến đề tài.
                  </p>
                  <p>
                    <span className="text-emerald-300 font-semibold">Mục tiêu:</span> Tối ưu hóa thời gian xây dựng khung sườn (Outline) và cải thiện khả năng diễn đạt ngôn ngữ sao cho chuyên nghiệp hơn.
                  </p>
                  <p>
                    <span className="text-emerald-300 font-semibold">Lưu ý:</span> AI chỉ cung cấp nguyên liệu thô, không quyết định nội dung cuối cùng.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-bold text-lg mb-3">
                  2. Kiểm chứng và Đối chiếu dữ liệu
                </h3>
                <div className="space-y-3 text-white/60 text-sm leading-relaxed">
                  <p>
                    Dữ liệu từ ChatGPT thường có độ trễ hoặc lỗi logic, vì vậy quy trình kiểm chứng là bắt buộc:
                  </p>
                  <div className="space-y-2">
                    <p><span className="text-emerald-300 font-semibold">Nguồn chính thống:</span> Mọi lý thuyết và con số đều được đối chiếu trực tiếp với giáo trình học phần và các tài liệu nghiên cứu từ thư viện số.</p>
                    <p><span className="text-emerald-300 font-semibold">Xác thực:</span> Kiểm tra lại các trích dẫn (citations) mà AI gợi ý để đảm bảo chúng thực sự tồn tại và đúng ngữ cảnh.</p>
                    <p><span className="text-emerald-300 font-semibold">Trách nhiệm:</span> Sinh viên chịu trách nhiệm 100% về tính xác thực của thông tin trong sản phẩm cuối cùng.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-bold text-lg mb-3">
                  3. Quy trình "Tiếp nhận &amp; Chuyển hóa"
                </h3>
                <div className="space-y-2 text-white/60 text-sm leading-relaxed">
                  <p>Để đảm bảo tính cá nhân hóa, bài làm tuân thủ quy trình 3 bước:</p>
                  <p><span className="text-emerald-300 font-semibold">Phân tích:</span> Đặt câu hỏi (Prompt) chi tiết để ChatGPT đưa ra các góc nhìn đa chiều.</p>
                  <p><span className="text-emerald-300 font-semibold">Sàng lọc:</span> Loại bỏ những thông tin chung chung, giữ lại các ý tưởng có giá trị thực tiễn.</p>
                  <p><span className="text-emerald-300 font-semibold">Viết lại:</span> Tự tay biên soạn lại toàn bộ nội dung dựa trên kiến thức đã học, lồng ghép ví dụ thực tế từ kinh nghiệm cá nhân.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-bold text-lg mb-3">
                  4. Cam kết về Liêm chính học thuật
                </h3>
                <div className="space-y-2 text-white/60 text-sm leading-relaxed">
                  <p><span className="text-emerald-300 font-semibold">Không lạm dụng:</span> Không sử dụng ChatGPT để tạo ra toàn bộ nội dung bài làm (copy-paste).</p>
                  <p><span className="text-emerald-300 font-semibold">Bản sắc cá nhân:</span> Sản phẩm cuối cùng là kết quả của quá trình đọc - hiểu - phân tích.</p>
                  <p><span className="text-emerald-300 font-semibold">Dấu ấn tư duy:</span> AI chỉ đóng vai trò "gợi mở", tư duy phản biện và giải quyết vấn đề thuộc về sinh viên.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <h3 className="text-emerald-200 font-bold text-lg mb-2">
                  Cam kết
                </h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  Việc sử dụng ChatGPT được thực hiện một cách có kiểm soát, minh bạch và đúng mục đích học tập; đề cao sự trung thực và nỗ lực tự thân trong học thuật.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-950 border-t border-white/8">
        <div className="max-w-5xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-2xl">🌾</span>
                <span className="text-white font-black text-lg tracking-tight">Hành Trình Hạt GẠO</span>
              </div>
              <p className="text-white/35 text-sm">Việt Nam · Từ ruộng đồng đến tay người tiêu dùng</p>
            </div>

            {/* Subject info */}
            <div className="text-center md:text-right space-y-1">
              <p className="text-emerald-400/80 text-xs font-bold uppercase tracking-widest">Thông tin môn học</p>
              <p className="text-white/70 text-sm font-semibold">Kinh Tế Chính Trị Chủ Nghĩa Marx–Lenin</p>
              <p className="text-white/40 text-xs">Mã môn: MLN122 · Chương 2</p>
              <p className="text-white/40 text-xs">Hàng hóa, Thị trường & Vai trò của Tiền tệ</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs text-center sm:text-left">
              © 2026 · Sản phẩm sáng tạo học tập · Trường Đại học FPT phân hiệu TP.HCM · SE1833 (FPTU)
            </p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400/70 text-xs font-medium">
                MLN122
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400/70 text-xs font-medium">
                Chương 2
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40 text-xs font-medium">
                Năm học 2026–2027
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
