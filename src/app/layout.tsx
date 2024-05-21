import './globals.css'
import {PropsWithChildren} from 'react'

import {Inter} from 'next/font/google'
import {Metadata} from 'next'
import PlausibleProvider from 'next-plausible'

import {cn} from 'common/helpers'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'i18n Playground',
  description: 'Debug different i18n formats instantly!',
  alternates: {
    canonical: 'https://i18n-playground.com',
    languages: {'en-US': 'https://i18n-playground.com'},
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
  },
}

const RootLayout = ({children}: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="i18n-playground.com" />
      </head>
      <body className={cn(inter.className, 'bg-slate-900')}>{children}</body>
    </html>
  )
}

export default RootLayout
