import { cn } from 'common/helpers'
import './globals.css'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react' 
import { Metadata } from 'next'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'i18n Playground',
  description: 'Debug different i18n formats instantly!',
  alternates: {
    canonical: 'https://i18n-playground.com',
    languages: { 'en-US': 'https://i18n-playground.com' },
  },
  authors: {
    name: 'Mikhail Grechka',
  },
  creator: 'Mikhail Grechka',
  openGraph: {
    title: 'i18n Playground',
    description: 'Debug different i18n formats instantly!',
    images: {
      url: 'https:/i18n-playground.com/images/opengraph.png',
    },
    url: 'https:/i18n-playground.com',
    siteName: 'Mikhail Grechka',
    type: 'website',
  }
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E7NY2W59JZ"
        />

        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}></Script>
        <Script id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </head>
      <body className={cn(inter.className, 'bg-slate-900')}>{children}</body>
    </html>
  )
}

export default RootLayout
