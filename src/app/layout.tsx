import './globals.css'
import { ToastProvider } from '@/components/ui/toast-provider'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        <ToastProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </ToastProvider>
      </body>
    </html>
  )
}
