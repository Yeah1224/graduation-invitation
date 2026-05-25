import {
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-amber-200 py-10 text-center">
      <div className="flex justify-center gap-8 text-2xl mb-6">
        <a href="https://www.facebook.com/ainghia.90417" className="text-amber-700 hover:text-amber-600 hover:scale-110 transition-transform">
          <FaFacebook />
        </a>

        <a href="https://www.instagram.com/dai_nghia1209/" className="text-amber-700 hover:text-amber-600 hover:scale-110 transition-transform">
          <FaInstagram />
        </a>
      </div>

      <p className="text-amber-900/60 font-medium">
        Designed with ❤️ for Graduation Day by Đại Nghĩa
      </p>
    </footer>
  )
}