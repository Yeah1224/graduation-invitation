'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

export default function AttendanceForm({ guestInfo }: { guestInfo?: { name: string, prefix: string } }) {
  const [status, setStatus] = useState<'attending' | 'not_attending' | null>(null)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!status) return

    setIsLoading(true)

    try {
      // Gửi email qua Web3Forms
      // BẠN CẦN LÀM: Truy cập https://web3forms.com/ nhập email của bạn để lấy Access Key và thay vào "YOUR_ACCESS_KEY_HERE"
      const accessKey = "13f9a409-b838-43a5-acf6-d59ef155149c"

      if (accessKey !== "13f9a409-b838-43a5-acf6-d59ef155149c") {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `[RSVP] Xác nhận tham dự từ ${guestInfo?.prefix || 'Khách'} ${guestInfo?.name || ''}`,
            from_name: "Hệ thống Thư mời TN",
            Khách_Mời: `${guestInfo?.prefix || ''} ${guestInfo?.name || ''}`,
            Xác_Nhận: status === 'attending' ? 'Sẽ có mặt 🎉' : 'Không sắp xếp được 😢',
            Lời_Nhắn: message || 'Không có lời nhắn'
          })
        })
      } else {
        console.warn("")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto backdrop-blur-xl bg-white/70 border border-amber-600/20 rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(217,119,6,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-6xl text-amber-600 drop-shadow-[0_0_15px_rgba(217,119,6,0.2)]" />
        </div>
        <h3 className="text-2xl font-bold font-serif text-amber-800 mb-4 tracking-wide">
          Cảm ơn {guestInfo?.prefix} {guestInfo?.name}!
        </h3>
        <p className="text-amber-900/80 text-lg leading-relaxed">
          Phản hồi của {guestInfo?.prefix} đã được ghi nhận.
          <br />
          {status === 'attending'
            ? `Rất mong được gặp ${guestInfo?.prefix} tại buổi lễ nhé!`
            : `Rất tiếc vì ${guestInfo?.prefix} không thể tham gia, cảm ơn ${guestInfo?.prefix} đã báo trước.`}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/70 border border-amber-600/20 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(217,119,6,0.1)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <h2 className="text-3xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 text-transparent bg-clip-text">
        Xác Nhận Tham Dự
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            type="button"
            onClick={() => setStatus('attending')}
            className={`flex-1 py-5 px-6 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-3 ${status === 'attending'
              ? 'bg-amber-50 text-amber-800 border-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.15)]'
              : 'bg-white/50 text-amber-900/60 border-amber-200 hover:border-amber-400/70 hover:bg-amber-50/50'
              }`}
          >
            <span className="text-2xl">🎉</span> Sẽ tham dự
          </button>

          <button
            type="button"
            onClick={() => setStatus('not_attending')}
            className={`flex-1 py-5 px-6 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-3 ${status === 'not_attending'
              ? 'bg-amber-50 text-amber-800 border-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.15)]'
              : 'bg-white/50 text-amber-900/60 border-amber-200 hover:border-amber-400/70 hover:bg-amber-50/50'
              }`}
          >
            <span className="text-lg">😢</span>Không sắp xếp được
          </button>
        </div>

        <div>
          <label className="block text-m font-medium text-amber-800 mb-3 uppercase tracking-widest text-center">
            Lời nhắn nhủ
          </label>
          <textarea
            rows={4}
            placeholder="Gửi lời chúc hoặc nhắn nhủ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white/50 border border-amber-200 text-amber-900 outline-none focus:border-amber-500 transition-all focus:shadow-[0_0_20px_rgba(217,119,6,0.15)] resize-none placeholder-amber-900/30"
          />
        </div>

        <button
          type="submit"
          disabled={!status || isLoading}
          className={`w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${status && !isLoading
            ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(217,119,6,0.2)]'
            : 'bg-white/80 text-amber-900/30 cursor-not-allowed border border-amber-200'
            }`}
        >
          {isLoading ? 'Đang gửi...' : (
            <>
              Gửi Phản Hồi <FaPaperPlane />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
