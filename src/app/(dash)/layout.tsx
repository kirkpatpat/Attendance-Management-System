import Link from "next/link"
import { Inter, Nunito } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'] })

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode,
  }) {
    return (
      <html lang='en' className={nunito.className}>
        <body className="bg-default-bg text-slate-900">
            <div>{children}</div>
        </body>
      </html>
    )
  }