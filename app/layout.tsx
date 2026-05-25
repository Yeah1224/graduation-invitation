import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["vietnamese", "latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["vietnamese", "latin"],
});

export const metadata: Metadata = {
  title: "Dai Nghia's Graduation Invitation",

  description:
    "Join Dai Nghia in celebrating a milestone achievement and unforgettable memories.",

  keywords: [
    "Graduation",
    "Invitation",
    "Dai Nghia",
    "Graduation Ceremony",
  ],

  authors: [
    {
      name: "Dai Nghia",
    },
  ],

  icons: {
    icon: "/graduation-cap.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
