import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/i18n'
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
    <html lang="de" dir="ltr">
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
