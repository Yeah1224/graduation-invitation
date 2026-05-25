'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import WelcomeScreen from '@/components/WelcomeScreen'
import AttendanceForm from '@/components/AttendanceForm'
import Fireworks from '@/components/Fireworks'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestInfo, setGuestInfo] = useState<{ name: string, prefix: string } | null>(null)

  const handleOpen = (info: { name: string, prefix: string }) => {
    setGuestInfo(info)
    setIsOpen(true)

    // Optional: Smooth scroll to top when opening the card
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    // ---------------------------------------------------------
    // BẠN MUỐN ĐỔI MÀU NỀN? HÃY CHỈNH SỬA Ở CÁC THUỘC TÍNH DƯỚI ĐÂY:
    // 1. Màu nền cơ bản: bg-[#f4ede0]
    // 2. Màu gradient nền: from-[#fbf4eb] via-[#eee1cd] to-[#e3d0b8]
    // (Lưu ý: bạn có thể thay thế mã hex bằng các màu như bg-blue-100, etc.)
    // ---------------------------------------------------------
    <main className="bg-[#f4ede0] text-amber-900 min-h-screen font-sans selection:bg-amber-200/50 relative overflow-hidden">
      {/* Global Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fbf4eb] via-[#eee1cd] to-[#e3d0b8] z-0" />

      {/* Decorative blurred blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-amber-300/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 z-0"></div>

      {/* Global Fireworks Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Fireworks />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
            >
              <div className="relative z-10 w-full">
                <WelcomeScreen onOpen={handleOpen} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative"
            >
              <Hero />

              <div className="relative z-20 bg-gradient-to-b from-transparent via-[#fcfaf5]/90 to-[#f9f6ef]">
                <section className="relative z-10 py-16 px-6">
                  <AttendanceForm guestInfo={guestInfo || undefined} />
                </section>

                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}