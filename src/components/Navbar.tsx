'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { label: "Diseñar", href: "/disenar" },
  { label: "Imagen IA", href: "/imagen-ia" },
  { label: "Voz IA", href: "/voz-ia" },
  { label: "Automatizar", href: "/automatizar" },
  { label: "Mis Proyectos", href: "/proyectos" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0c29]/50 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo o nombre */}
        <Link href="/">
          <span className="text-white font-extrabold text-2xl tracking-wide hover:opacity-90 transition">
            Daradigu IA
          </span>
        </Link>

        {/* Navegación */}
        <nav className="flex space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-white text-sm font-medium hover:text-orange-400 transition ${
                  isActive ? "text-orange-500" : ""
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-orange-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
