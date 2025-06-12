'use client';

import './globals.css';
import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#14142A] to-[#1A1A3F] text-white flex">
        <Navbar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}