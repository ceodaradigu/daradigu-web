'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, Rocket, Image, Mic, Settings, User, Sparkles } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

const menuItems = [
  { name: 'Inicio', icon: <Home size={20} />, href: '/' },
  { name: 'Diseñar', icon: <Sparkles size={20} />, href: '/crear' },
  { name: 'Imágenes IA', icon: <Image size={20} />, href: '/imagen' },
  { name: 'Voz IA', icon: <Mic size={20} />, href: '/voz' },
  { name: 'Automatizar', icon: <Rocket size={20} />, href: '/automatizar' },
  { name: 'Mis Proyectos', icon: <Settings size={20} />, href: '/proyectos' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="h-screen w-60 bg-[#0b0f19] border-r border-[#1f2937] flex flex-col justify-between text-white">
      {/* Logo y nombre */}
      <div>
        <div className="p-6 text-2xl font-bold tracking-tight text-center">
          <span className="text-[#00ffcc]">Daradigu</span> IA
        </div>

        {/* Menú */}
        <nav className="flex flex-col gap-1 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#1f2937] transition',
                pathname === item.href && 'bg-[#1f2937]'
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Usuario */}
      <div className="p-4 text-sm text-center text-gray-400">
        <User size={16} className="inline-block mr-1" />
        Usuario Activo
      </div>
    </aside>
  )
}
