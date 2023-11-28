import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Attendify',
  description: 'An Attendance Management System built with Next.js and TypeScript.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bg-default-bg text-slate-900 antialiased light', inter.className)}>
      <body className='min-h-screen pt-12 bg-default-bg antialiased'>
        <Navbar />

        <div className='container max-w-7x1 mx-auto h-full pt-12'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
