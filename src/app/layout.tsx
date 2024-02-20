import { cn } from 'common/helpers'
import './globals.css'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react' 
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'i18n Playground',
  description: 'i18n Playground',
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-[100dvh] bg-slate-900')}>{children}</body>
    </html>
  )
}

export default RootLayout
