import './globals.css'
import AuthProvider from '../provider/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HighFlix',
  description: 'The semester 8 production of HighTeam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body
          className={`${inter.className} px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[10rem]`}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
