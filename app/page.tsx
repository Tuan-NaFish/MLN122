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
