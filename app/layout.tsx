import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "KIPLAN Notary Public Office | Notarial & Translation Services",
  description:
    "KIPLAN Notary Public Office — Notarial and Translation Services with Professional Care. Authorized by Nepal Notary Public Council.",
  keywords:
    "notary public Nepal, translation services Kathmandu, document certification, KIPLAN, Kamal Khadka",
  verification: {
    google: "iS9CSXhRwrdLSmuSNH6dBt0iuHCbsaGlzN2Ju5rOv6Q",
  },
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

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}