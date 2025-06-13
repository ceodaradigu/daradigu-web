import './globals.css'
import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

export const metadata = {
  title: 'Daradigu',
  description: 'IA para creativos y empresas: de la idea al impacto, en minutos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <Header />
        {children}
      </body>
    </html>
  )
}