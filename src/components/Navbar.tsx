'use client'

import React from 'react'
import Link from 'next/link'
import { FiHome, FiEdit, FiZap, FiFolder, FiLayout } from 'react-icons/fi'

export default function Navbar() {
  return (
    <aside className="w-60 min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#14142A] to-[#1A1A3F] text-white p-6 flex flex-col justify-between shadow-xl">
      <div>
        <div className="flex justify-center mb-12">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#00FFFf] via-[#FF80FF] to-[#FF0070] bg-clip-text text-transparent tracking-wide">
            DARADIGU IA
          </h2>
        </div>

        <nav className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#14142A] hover:bg-[#00FFFF] hover:text-black transition">
            <FiHome /> Inicio
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#14142A] hover:bg-[#00FFFF] hover:text-black transition">
            <FiLayout /> Dashboard
          </Link>
          <Link href="/crear" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#14142A] hover:bg-[#00FFFF] hover:text-black transition">
            <FiEdit /> Crear
          </Link>
          <Link href="/automatizar" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#14142A] hover:bg-[#00FFFF] hover:text-black transition">
            <FiZap /> Automatizar
          </Link>
          <Link href="/proyectos" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#14142A] hover:bg-[#00FFFF] hover:text-black transition">
            <FiFolder /> Proyectos
          </Link>
        </nav>
      </div>

      <div className="flex justify-center">
        <div className="h-14 w-14 bg-gradient-to-r from-[#00FFFf] to-[#FF00FF] rounded-full flex items-center justify-center shadow-xl cursor-pointer">
          <span className="text-xl font-bold">D</span>
        </div>
      </div>
    </aside>
  )
}