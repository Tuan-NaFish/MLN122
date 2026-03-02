import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Hành Trình Hạt GẠO Việt Nam · MLN122 · Kinh Tế Chính Trị Chủ Nghĩa Marx–Lenin',
  description: 'Phân tích hạt gạo Việt Nam dưới góc độ lý luận hàng hóa — hai thuộc tính hàng hóa, hai mặt lao động, vai trò thị trường & tiền tệ, thách thức và giải pháp. Sản phẩm học tập môn MLN122 Chương 2.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
