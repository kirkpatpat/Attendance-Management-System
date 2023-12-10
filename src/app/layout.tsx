import '@/styles/globals.css'
import { Inter, Nunito } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'Attendify',
  description: 'An Attendance Management System built with Next.js and TypeScript.',
}

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'] })

export default function RootLayout({
  children, 
  authModal
}: {
  children: React.ReactNode,
  authModal: React.ReactNode,
}) {
  return (
    <html lang='en' className={cn('bg-default-bg text-slate-900 antialiased light', nunito.className)}>
      <body className='min-h-screen pt-12 bg-default-bg antialiased'>
        {/* @ts-expects-error server component */}
        <Navbar />
        <Sidebar/>
        {authModal}

        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
      </body>
    </html>
  )
}
