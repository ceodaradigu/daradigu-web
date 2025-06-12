'use client';

import React from 'react';
import Link from 'next/link';
import { FiHome, FiEdit3, FiZap, FiFolder } from 'react-icons/fi';

export default function Navbar() {
  return (
    <aside className="w-60 min-h-screen bg-gradient-to-b from-[#0A0A0F] to-[#12121C] border-r border-[#00FFFF] p-6 flex flex-col justify-between shadow-lg">
      
      <div>
        <div className="flex items-center justify-center mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00FFFF] to-[#FF00FF] flex items-center justify-center shadow-lg mr-3 text-black font-bold text-xl">
            D
          </div>
          <h2 className="text-2xl font-extrabold text-[#00FFFF] tracking-wide">DARADIGU</h2>
        </div>

        <nav className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 text-white font-semibold px-4 py-3 rounded-xl bg-[#141420] hover:bg-[#00FFFF] hover:text-black transition">
            <FiHome /> Inicio
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 text-white font-semibold px-4 py-3 rounded-xl bg-[#141420] hover:bg-[#00FFFF] hover:text-black transition">
            <FiHome /> Dashboard
          </Link>
          <Link href="/crear" className="flex items-center gap-3 text-white font-semibold px-4 py-3 rounded-xl bg-[#141420] hover:bg-[#FF00FF] hover:text-black transition">
            <FiEdit3 /> Crear
          </Link>
          <Link href="/automatizar" className="flex items-center gap-3 text-white font-semibold px-4 py-3 rounded-xl bg-[#141420] hover:bg-[#FFD700] hover:text-black transition">
            <FiZap /> Automatizar
          </Link>
          <Link href="/proyectos" className="flex items-center gap-3 text-white font-semibold px-4 py-3 rounded-xl bg-[#141420] hover:bg-[#00FFFF] hover:text-black transition">
            <FiFolder /> Proyectos
          </Link>
        </nav>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="w-14 h-14 bg-gradient-to-tr from-[#00FFFF] to-[#FF00FF] rounded-full flex items-center justify-center shadow-xl cursor-pointer">
          <span className="text-white text-xl font-bold">👤</span>
        </div>
      </div>
    </aside>
  );
}