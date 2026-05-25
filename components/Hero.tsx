'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import CountdownCard from './CountdownCard'
import { FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa'

export default function Hero() {
  const graduationDate = new Date('2026-06-07T08:00:00')

  const calculateTimeLeft = () => {
    const difference = +graduationDate - +new Date()

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Floating particles data
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: `${(i * 4) % 100}%`,
    duration: 10 + (i % 10),
    delay: i * 0.3,
  }))

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-6">
      {/* Floating Lights (Gold) */}
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

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl backdrop-blur-xl bg-white/70 border border-amber-600/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_0_50px_rgba(217,119,6,0.1)] text-center mt-10 overflow-hidden"
      >
        {/* Decorative inner border */}
        <div className="absolute inset-4 md:inset-6 border border-amber-500/30 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none"></div>


        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <FaGraduationCap className="text-4xl md:text-9xl text-amber-700 drop-shadow-[0_0_15px_rgba(217,119,6,0.2)]" />
          </div>

          <p className="tracking-[8px] uppercase text-amber-700/80 mb-4 text-2xl md:text-4xl font-light font-serif mt-1">
            Lễ Tốt Nghiệp
          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-8 font-serif bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 text-transparent bg-clip-text drop-shadow-sm leading-tight">
            Đoàn Đại Nghĩa
          </h1>

          {/* Full body portrait */}
          <div className="flex justify-center mb-10 w-full max-w-[280px] md:max-w-[320px] mx-auto overflow-hidden rounded-3xl border-4 border-amber-200 shadow-[0_0_30px_rgba(217,119,6,0.15)] relative group bg-white p-2">
            <img
              src="/avatar.jpg"
              alt="Đoàn Đại Nghĩa"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=Đoàn+Đại+Nghĩa&background=fdf8f5&color=b45309&size=600'
              }}
            />
          </div>

          <p className="max-w-xl mx-auto text-amber-900/80 text-base md:text-lg leading-relaxed mb-10 italic font-light">
            "Hành trình ngàn dặm bắt đầu từ một bước chân. Cảm ơn vì đã là một phần trong thanh xuân của mình."
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
                <h3 className="text-lg font-bold text-amber-900 mb-1 font-serif tracking-wide">Thời Gian: 00:00pm</h3>
                <p className="text-amber-700/100 font-light mt-0.5 text-m">Chủ Nhật, 7 Tháng 6, 2026</p>
                <p className="text-amber-700/100 font-light mt-0.5 text-m">Liên hệ: 0393107473</p>
                <p className="text-amber-700/100 font-light mt-0.5 text-m">Lưu ý: thời gian có thể bị xê dịch nên hãy liên hệ với em trước khi tới nhé</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(217,119,6,0.1)]">
                <FaMapMarkerAlt className="text-lg text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-900 mb-1 font-serif tracking-wide">1 Cộng Hòa, Tân Sơn Nhất, Hồ Chí Minh</h3>
                <p className="text-amber-900/100 text-m">Hội Trường F100</p>
                <p className="text-amber-700/100 font-light mt-0.5 text-sm">Học Viện Hàng Không Việt Nam</p>
                <a
                  href="https://maps.app.goo.gl/i1DPEaYGoRcqpLZ28"
                  target="_blank"
                  className="inline-block mt-2 text-sm italic underline text-amber-700 hover:text-amber-500 transition"
                >
                  Mở bản đồ
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-lg tracking-[4px] uppercase text-amber-700/80 mb-6 font-serif">Đếm ngược đến sự kiện</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <CountdownCard value={timeLeft.days} label="Ngày" />
              <CountdownCard value={timeLeft.hours} label="Giờ" />
              <CountdownCard value={timeLeft.minutes} label="Phút" />
              <CountdownCard value={timeLeft.seconds} label="Giây" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}