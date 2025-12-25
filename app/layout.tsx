import type { Metadata } from "next";
import { Geist_Mono, Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "oksia | פלטפורמת ליווי מנטלי, עסקי וטכנולוגי",
    template: "%s | oksia",
  },
  description:
    "מערכת ליווי חכמה שמרכזת מנטלי + עסקי + AI במקום אחד, עם משימות, מדידה, תכנים וכלים מבוססי בינה מלאכותית.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
