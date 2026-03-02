"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowDown, Play, Pause, Volume2, VolumeX, ChevronRight, SkipBack } from "lucide-react";

const SECTIONS = [
  { num: "I", label: "Hai thuộc tính hàng hóa" },
  { num: "II", label: "Hai mặt của lao động" },
  { num: "III", label: "Vai trò thị trường & tiền tệ" },
  { num: "IV", label: "Thách thức & giải pháp" },
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Đặt muted=true qua ref ngay khi mount (JSX attribute muted không reactive)
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  const scrollToContent = () => {
    document.getElementById("properties-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      // Unmute khi user chủ động nhấn play — trình duyệt cho phép sau gesture
      videoRef.current.muted = false;
      setMuted(false);
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#050f08]">

      {/* ══════════════════════════════════
          VIDEO — full width, tall
      ══════════════════════════════════ */}
      <div className="relative w-full" style={{ aspectRatio: "16/8.5" }}>
        <video
          ref={videoRef}
          src="/videolua.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Gradient overlay — pointer-events-none để không chặn click */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f08] via-[#050f08]/20 to-transparent pointer-events-none" />

        {/* Top bar — tên môn + controls góc phải */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-12 py-3"
        >
          <div className="flex items-center gap-2 text-white text-xs bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-white">Kinh Tế Chính Trị Chủ Nghĩa Marx–Lenin</span>
            <span className="text-white/40">·</span>
            <span className="text-white/80">MLN122 · Chương 2</span>
          </div>

          {/* Controls: restart + play/pause + volume — góc trên phải */}
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full">
            <button
              onClick={() => {
                if (!videoRef.current) return;
                videoRef.current.currentTime = 0;
                videoRef.current.muted = false;
                setMuted(false);
                videoRef.current.play();
              }}
              title="Xem lại từ đầu"
              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white hover:text-emerald-400 transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              {playing
                ? <Pause className="w-3.5 h-3.5 fill-current" />
                : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              }
            </button>
            <button
              onClick={toggleMute}
              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              {muted
                ? <VolumeX className="w-3.5 h-3.5" />
                : <Volume2 className="w-3.5 h-3.5" />
              }
            </button>
          </div>
        </motion.div>

        {/* Play button — center when paused */}
        {!playing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={togglePlay}
            className="absolute inset-0 z-10 flex items-center justify-center group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full border-2 border-white/40 bg-black/30 backdrop-blur-md flex items-center justify-center group-hover:border-emerald-400/80 group-hover:bg-emerald-500/20 transition-all duration-300 shadow-2xl"
            >
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* ══════════════════════════════════
          TEXT PANEL — below video
      ══════════════════════════════════ */}
      <div className="relative z-10 -mt-24 md:-mt-36 lg:-mt-48 px-6 md:px-12 pb-0">
        <div className="max-w-[1280px] mx-auto">

          {/* Main text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-white/40 text-[11px] font-semibold uppercase tracking-[0.2em] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Sản phẩm sáng tạo học tập · MLN122 Chương 2
            </span>

            {/* H1 */}
            <h1 className="font-black leading-[1.0] tracking-tight mb-4">
              <span className="block text-[clamp(3rem,6.5vw,5.5rem)] text-white">
                Hành Trình Hạt Lúa
              </span>
              <span className="block text-[clamp(1.8rem,3.5vw,3rem)] text-emerald-400 font-bold mt-2">
                Việt Nam
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/50 text-sm md:text-base italic mb-6">
              Từ ruộng đồng đến tay người tiêu dùng
            </p>

            {/* Description */}
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mb-8">
              Việt Nam sản xuất{" "}
              <span className="text-white font-bold">44 triệu tấn</span> lúa mỗi năm,
              xuất khẩu đạt{" "}
              <span className="text-white font-bold">$4.7 tỷ USD</span> (2023), đứng{" "}
              <span className="text-white font-bold">Top 2</span> thế giới —
              nuôi sống <span className="text-white font-bold">90 triệu</span> người tiêu dùng.
              Phân tích dưới góc nhìn Kinh Tế Chính Trị Chủ Nghĩa Marx–Lenin về hàng hóa, lao động,
              thị trường &amp; tiền tệ.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={scrollToContent}
                className="flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                Bắt đầu khám phá
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="flex items-center gap-2.5 px-6 py-3.5 border border-white/15 hover:border-white/30 text-white/60 hover:text-white/80 font-semibold text-sm rounded-xl transition-all duration-200"
              >
                <span className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center shrink-0">
                  {playing
                    ? <Pause className="w-2.5 h-2.5 text-white fill-white" />
                    : <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                  }
                </span>
                {playing ? "Tạm dừng video" : "Phát video"}
              </button>
            </div>
          </motion.div>

          {/* Mục lục */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="border-t border-white/[0.08] pt-8 pb-10"
          >
            <p className="text-white/35 text-[11px] uppercase tracking-[0.25em] font-semibold mb-6">Nội dung chính</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SECTIONS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 px-6 py-5 border border-white/[0.08] rounded-2xl hover:bg-white/[0.04] transition-colors cursor-default"
                >
                  <span className="text-emerald-400 text-2xl font-black w-8 shrink-0 leading-none">{s.num}</span>
                  <span className="w-px h-8 bg-white/[0.1] shrink-0" />
                  <span className="text-white text-base font-semibold leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="relative z-10 w-full flex justify-center pb-6 text-white/20 hover:text-white/40 transition-colors"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>

    </section>
  );
}