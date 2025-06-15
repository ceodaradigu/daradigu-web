import './globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'

export const metadata = {
  title: 'Daradigu',
  description: 'IA para creativos y empresas: de la idea al impacto, en minutos.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-b from-[#0A0A0F] via-[#14142A] to-[#1A1A3F] text-white min-h-screen">
        <Navbar />
        <Header />
        <main className="p-8">{children}</main>
      </body>
    </html>
  )
}