import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/context/AppContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dropout Tales - A 4-year degree in chaos",
  description: "Because failing quietly isn’t fun anymore - a 4-year degree in chaos, approved by no one, but relatable to all.",
  icons: {
    icon: "/dtt01.png",
    shortcut: "/dtt01.png",
    apple: "/dtt01.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}