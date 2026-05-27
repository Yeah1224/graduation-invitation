'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import CountdownCard from './CountdownCard'
import { FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa'

export default function Hero() {
  const graduationDate = new Date('2026-06-07T08:00:00')

  // ✅ FIX: stable function (solve eslint exhaustive-deps)
  const calculateTimeLeft = useCallback(() => {
    const difference = +graduationDate - +new Date()

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }, [])

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: `${(i * 4) % 100}%`,
    duration: 10 + (i % 10),
    delay: i * 0.3,
  }))

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-6">
      {/* particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-30 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
            initial={{ y: '100vh', x: particle.x }}
            animate={{ y: '-10vh' }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* main */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl backdrop-blur-xl bg-white/70 border border-amber-600/20 rounded-4xl p-8 md:p-16 shadow-[0_0_50px_rgba(217,119,6,0.1)] text-center mt-10 overflow-hidden"
      >
        <div className="absolute inset-4 md:inset-6 border border-amber-500/30 rounded-3xl pointer-events-none"></div>

        <div className="flex justify-center mb-6">
          <FaGraduationCap className="text-9xl text-amber-700 drop-shadow-[0_0_15px_rgba(217,119,6,0.2)]" />
        </div>

        <p className="tracking-[2px] uppercase text-amber-700/80 mb-4 text-2xl md:text-4xl font-light font-serif">
          Thiệp mời tham dự 
        </p>
        <p className="tracking-[2px] uppercase text-amber-700/80 mb-4 text-2xl md:text-4xl font-light font-serif">
          Lễ Tốt Nghiệp
        </p>

        <h1 className="text-5xl md:text-7xl font-black leading-[1.15] pb-2 mb-8 font-serif bg-linear-to-r from-amber-600 via-yellow-600 to-amber-800 text-transparent bg-clip-text">
          Đoàn Đại Nghĩa
        </h1>

        {/* avatar */}
        <div className="flex justify-center mb-10 w-full max-w-70 mx-auto overflow-hidden rounded-3xl border-4 border-amber-200 shadow-[0_0_30px_rgba(217,119,6,0.15)] relative group bg-white p-2">
          <Image
            src="/avatar.jpg"
            alt="Đoàn Đại Nghĩa"
            width={320}
            height={320}
            className="rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <p className="max-w-xl mx-auto text-amber-900/80 text-base md:text-lg leading-relaxed mb-10 italic font-light">
          “Cảm ơn vì đã từng xuất hiện trong cùng một hành trình. Sau này nhìn lại, mọi thứ có thể đã xa, nhưng cảm giác của thời điểm đó thì vẫn còn.”
        </p>

                  <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500"></div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>

          {/* Event Info Integrated into the Card - Smaller */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left bg-white/50 p-6 md:p-8 rounded-2xl border border-amber-200 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,119,6,0.1)]">
                <FaCalendarAlt className="text-lg text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-1 font-serif tracking-wide">Thời Gian: 10h - 12h</h3>
                <p className="text-amber-700/100 font-light mt-0.5 text-m">Chủ Nhật 07/06/2026</p>
                <p className="text-amber-700/100 font-light mt-0.5 text-m">Liên hệ: 0393107473</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,119,6,0.1)]">
                <FaMapMarkerAlt className="text-lg text-amber-600" />
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-900 mb-1 font-serif tracking-wide">Học Viện Hàng Không Việt Nam</h4>
                <p className="text-amber-700/100 font-light mt-0.5 text-sm">18A/1 Cộng Hòa, Phường  Tân Sơn Nhất, Hồ Chí Minh</p>
                <a
                  href="https://maps.app.goo.gl/UCoMsdmu1CHcbtw57"
                  target="_blank"
                  className="inline-block mt-2 text-sm italic underline text-amber-700 hover:text-amber-500 transition"
                >
                  Mở bản đồ
                </a>
              </div>
            </div>

            {/* Note */}
              <div className="md:col-span-2 border-t border-amber-200 pt-4 mt-1">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <span className="font-semibold">Lưu ý:</span>
                </p>

                <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-amber-700/90">
                  <li>
                    Thời gian có thể bị xê dịch nên mọi người liên hệ trước khi tới nhé!
                  </li>

                  <li>
                    Nếu có đi xe, mọi người có thể gửi ở Lotte Cộng Hoà (cách 200m)
                    hoặc Vincom Cộng Hoà (cách 650m).
                  </li>
                </ul>
              </div>
          </div>

        <div className="mt-12">
          <h3 className="text-lg tracking-[4px] uppercase text-amber-700/80 mb-6 font-serif">
            Đếm ngược đến sự kiện
          </h3>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <CountdownCard value={timeLeft.days} label="Ngày" />
            <CountdownCard value={timeLeft.hours} label="Giờ" />
            <CountdownCard value={timeLeft.minutes} label="Phút" />
            <CountdownCard value={timeLeft.seconds} label="Giây" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}