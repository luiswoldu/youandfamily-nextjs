import type { Metadata } from 'next'
import { LanguageProvider } from '@/lib/i18n'
import { ConsentProvider } from '@/lib/consent'
import { ConditionalAnalytics } from '@/components/conditional-analytics'
import { CookieConsent } from '@/components/cookie-consent'
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
          <ConsentProvider>
            {children}
            <CookieConsent />
            <ConditionalAnalytics />
          </ConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
