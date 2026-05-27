'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa'

export default function AttendanceForm({
  guestInfo,
}: {
  guestInfo?: {
    name: string
    prefix: string
  }
}) {
  const [status, setStatus] = useState<
    'attending' | 'not_attending' | null
  >(null)

  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] =
    useState(false)

  const [isLoading, setIsLoading] =
    useState(false)

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!status) return

    setIsLoading(true)

    try {
      const accessKey =
        '13f9a409-b838-43a5-acf6-d59ef155149c'

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            access_key: accessKey,

            subject: `🎓 RSVP từ ${
              guestInfo?.prefix || ''
            } ${guestInfo?.name || ''}`,

            from_name:
              'Graduation Invitation',

            guest_name: `${
              guestInfo?.prefix || ''
            } ${guestInfo?.name || ''}`,

            attendance:
              status === 'attending'
                ? 'Sẽ tham dự 🎉'
                : 'Phân vân / Chưa biết nữa 😢',

            message:
              message ||
              'Không có lời nhắn',
          }),
        }
      )

      const result = await response.json()

      console.log(result)

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert(
          'Gửi thất bại: ' +
            result.message
        )
      }
    } catch (error) {
      console.error(error)

      alert('Có lỗi xảy ra!')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="max-w-2xl mx-auto backdrop-blur-xl bg-white/70 border border-amber-600/20 rounded-3xl p-10 text-center"
      >
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-6xl text-amber-600" />
        </div>

        <h3 className="text-2xl font-bold text-amber-800 mb-4">
          Cảm ơn {guestInfo?.prefix}{' '}
          {guestInfo?.name}!
        </h3>

        <p className="text-amber-900/80 text-lg leading-relaxed">
          Phản hồi của{' '}
          {guestInfo?.prefix} đã được ghi
          nhận.
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

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* attending */}
          <button
            type="button"
            onClick={() =>
              setStatus('attending')
            }
            className={`flex-1 py-5 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 flex items-center justify-center gap-3 ${
              status === 'attending'
                ? 'bg-amber-50 text-amber-800 border-amber-400 scale-[1.02] shadow-lg'
                : 'bg-white/50 text-amber-900/60 border-amber-200 hover:border-amber-300'
            }`}
          >
            <span className="text-2xl">
              🥳
            </span>

            Chắc chắn rồi
          </button>

          {/* unsure */}
          <button
            type="button"
            onClick={() =>
              setStatus(
                'not_attending'
              )
            }
            className={`flex-1 py-5 px-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 flex items-center justify-center gap-3 ${
              status === 'not_attending'
                ? 'bg-amber-50 text-amber-800 border-amber-400 scale-[1.02] shadow-lg'
                : 'bg-white/50 text-amber-900/60 border-amber-200 hover:border-amber-300'
            }`}
          >
            <span className="text-xl">
              😢
            </span>

            Chưa biết nữa
          </button>
        </div>

        {/* message */}
        <div>
          <label className="block text-m font-medium text-amber-800 mb-3 uppercase tracking-widest text-center">
            Lời nhắn nhủ
          </label>

          <textarea
            rows={4}
            placeholder={
              status === 'attending'
                ? 'Gửi lời chúc hoặc nhắn nhủ...'
                : 'Để lại đôi lời nếu muốn...'
            }
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full px-6 py-4 rounded-xl bg-white/50 border border-amber-200 text-amber-900 outline-none resize-none focus:border-amber-400 transition-all"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={!status || isLoading}
          className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest ${
            status && !isLoading
              ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white hover:scale-[1.01] shadow-lg'
              : 'bg-white/80 text-amber-900/30 cursor-not-allowed border border-amber-200'
          }`}
        >
          {isLoading ? (
            'Đang gửi...'
          ) : status === 'attending' ? (
            <>
              Gửi Lời Chúc ❤️
              <FaPaperPlane />
            </>
          ) : status ===
            'not_attending' ? (
            <>
              Gửi Phản Hồi 😢
              <FaPaperPlane />
            </>
          ) : (
            <>
              Gửi Phản Hồi
              <FaPaperPlane />
            </>
          )}
        </button>
      </form>
    </div>
  )
}