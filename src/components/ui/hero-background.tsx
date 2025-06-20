'use client'

import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const nodes = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#090022'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.dx
        a.y += a.dy

        if (a.x < 0 || a.x > width) a.dx *= -1
        if (a.y < 0 || a.y > height) a.dy *= -1

        ctx.beginPath()
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#6EE7FF'
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  )
}
