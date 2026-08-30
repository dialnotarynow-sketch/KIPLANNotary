import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KIPLAN Notary Public Office | Notarial & Translation Services",
  description: "KIPLAN Notary Public Office — Notarial and Translation Services with Professional Care. Authorized by Nepal Notary Public Council.",
  keywords: "notary public Nepal, translation services Kathmandu, document certification, KIPLAN, Kamal Khadka",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
