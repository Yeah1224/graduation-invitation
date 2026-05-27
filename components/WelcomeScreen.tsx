'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

export default function WelcomeScreen({
  onOpen,
}: {
  onOpen: (info: { name: string; prefix: string }) => void
}) {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('male')
  const [birthYear, setBirthYear] = useState<number | null>(null)
  const [showInvite, setShowInvite] = useState(false)

  const [openYear, setOpenYear] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const years = Array.from({ length: 60 }, (_, i) => 2015 - i)

  // click outside + ESC close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenYear(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenYear(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const getPrefix = () => {
    if (!birthYear) return ''
    if (birthYear < 2004) return gender === 'male' ? 'Anh' : 'Chị'
    if (birthYear === 2004) return 'Bạn'
    return 'Em'
  }

  const getGreeting = () => {
    if (!birthYear) return ''
    if (birthYear < 2004) return 'Trân trọng kính mời'
    return 'Thân mời'
  }

  const getMessage = () => {
    if (!birthYear) return ''
    if (birthYear < 2004)
      return 'để cùng chia sẻ niềm vui và khoảnh khắc đáng nhớ này cùng với em.'
    if (birthYear === 2004)
      return 'để cùng chia sẻ niềm vui và khoảnh khắc đáng nhớ này cùng với mình.'
    return 'để cùng chia sẻ niềm vui và khoảnh khắc đáng nhớ này cùng anh nhé.'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && birthYear) {
      setShowInvite(true)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative z-10">
      <AnimatePresence mode="wait">
        {!showInvite ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="backdrop-blur-xl bg-white/70 border border-amber-600/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(217,119,6,0.1)]"
          >
            {/* ICON */}
            <div className="flex justify-center mb-6">
              <FaGraduationCap className="text-5xl text-amber-700 drop-shadow-[0_0_15px_rgba(217,119,6,0.2)]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-800 text-transparent bg-clip-text">
              Vui lòng nhập thông tin
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-amber-800/80 mb-2 uppercase tracking-widest">
                  Tên của bạn
                </label>
                <input
                  placeholder="VD: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white/50 border border-amber-200 text-amber-900 outline-none focus:border-amber-500 transition-all focus:shadow-[0_0_20px_rgba(217,119,6,0.15)] placeholder-amber-900/30"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* GENDER */}
                <div>
                  <label className="block text-sm font-medium text-amber-800/80 mb-2 uppercase tracking-widest">
                    Giới tính
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl bg-white/50 border border-amber-200 text-amber-900 outline-none appearance-none focus:border-amber-500 transition-all focus:shadow-[0_0_20px_rgba(217,119,6,0.15)]"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>

                {/* YEAR DROPDOWN */}
                <div ref={dropdownRef} className="relative">
                  <label className="block text-sm font-medium text-amber-800/80 mb-2 uppercase tracking-widest">
                    Năm sinh
                  </label>

                  {/* BUTTON */}
                  <div
                    onClick={() => setOpenYear(!openYear)}
                    className="w-full px-6 py-4 rounded-xl bg-white/50 border border-amber-200 text-amber-900 cursor-pointer flex justify-between items-center"
                  >
                    <span
                      className={
                        birthYear
                          ? 'text-amber-900 font-medium'
                          : 'text-amber-800/100'
                      }
                    >
                      {birthYear ?? 'Chọn năm sinh'}
                    </span>

                    <span
                      className={`text-amber-700 transition-transform ${
                        openYear ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </div>

                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {openYear && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl bg-white border border-amber-200 shadow-xl"
                      >
                        {years.map((year) => (
                          <div
                            key={year}
                            onClick={() => {
                              setBirthYear(year)
                              setOpenYear(false)
                            }}
                            className={`px-4 py-3 cursor-pointer transition hover:bg-amber-100 ${
                              birthYear === year
                                ? 'bg-amber-200 font-bold text-amber-900'
                                : ''
                            }`}
                          >
                            {year}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-bold text-lg rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(217,119,6,0.2)] uppercase tracking-widest"
              >
                Tiếp tục
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="invite"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-white/80 border border-amber-600/30 rounded-[2rem] p-10 md:p-14 text-center shadow-[0_0_60px_rgba(217,119,6,0.1)] relative overflow-hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h3 className="text-2xl md:text-3xl text-amber-800 font-serif mb-6 italic tracking-wider">
                {getGreeting()}
              </h3>

              <div className="text-3xl md:text-4xl font-bold mb-8 font-serif bg-gradient-to-b from-amber-600 via-yellow-600 to-amber-900 text-transparent bg-clip-text">
                {getPrefix()} {name}
              </div>

              <p className="text-xl md:text-2xl leading-relaxed text-amber-900 mb-12 font-light">
                Đến tham dự buổi Lễ Tốt Nghiệp <br />
                {getMessage()}
              </p>

              <button
                onClick={() => onOpen({ name, prefix: getPrefix() })}
                className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-amber-900 border border-amber-500/50 rounded-full overflow-hidden hover:scale-105 transition-transform bg-amber-50/50 hover:bg-amber-100"
              >
                <span className="relative z-10 text-xl tracking-widest">
                  Mở Thiệp
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}