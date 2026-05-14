import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'You&Family — Gemeinsame Zeit ist kein Luxus',
  description: 'Wir unterstützen Familien in Deutschland dabei, gemeinsam Urlaub zu machen — auch wenn das gerade nicht möglich scheint.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
