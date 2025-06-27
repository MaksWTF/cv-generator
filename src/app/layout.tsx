import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profesjonalny generator CV",
  description: "Wygeneruj CV i list motywacyjny w jednym kliknięciu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8232036010222407"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>

<footer className="text-center text-sm text-gray-400 mt-10 py-4 border-t border-gray-700">
  <p>&copy; {new Date().getFullYear()} CV Generator</p>
  <div className="mt-2 flex flex-col items-center space-y-2">
    <a href="/privacy-policy" className="underline hover:text-white transition">Polityka prywatności   </a>
    <a href="/contact" className="underline hover:text-white transition">   Kontakt</a>
  </div>
</footer>

     </body>
    </html>
  );
}
