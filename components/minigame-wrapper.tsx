"use client";

import { motion } from "framer-motion";
import { Gamepad2, Zap, Heart, Trophy, Timer, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MinigameWrapper() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-emerald-950">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-8 p-6 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 rounded-3xl"
          >
            <Gamepad2 className="w-14 h-14 text-emerald-400" />
          </motion.div>

          {/* Title */}
          <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-3">
            Kiểm Tra Kiến Thức
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thử Thách
          </h2>
          <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-lg mx-auto">
            Bạn chỉ có 30 giây để trả lời mỗi câu hỏi. Chọn đúng quy luật kinh
            tế, tích lũy combo, và chinh phục điểm cao!
          </p>

          {/* Rules */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-10 text-left">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Quy Tắc Trò Chơi
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Trophy className="w-5 h-5 text-amber-400" />,
                  text: "Mỗi câu đúng: +10 x combo điểm",
                },
                {
                  icon: <Heart className="w-5 h-5 text-rose-400" />,
                  text: "Sai hoặc hết giờ: mất 1 máu",
                },
                {
                  icon: <Zap className="w-5 h-5 text-emerald-400" />,
                  text: "Combo tăng khi đúng liên tiếp",
                },
                {
                  icon: <Timer className="w-5 h-5 text-blue-400" />,
                  text: "30 giây cho mỗi câu hỏi",
                },
              ].map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
                >
                  {rule.icon}
                  <span className="text-white/70 text-sm">{rule.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/game">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
            >
              Bắt Đầu Trò Chơi
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
