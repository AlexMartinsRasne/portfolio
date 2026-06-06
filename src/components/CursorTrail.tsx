import React, { useEffect, useRef } from 'react'

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const positionsRef = useRef<Array<{ x: number; y: number; time: number }>>([])
  const rafRef = useRef<number | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/avatar.png'
    imgRef.current = img

    const previousCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      positionsRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, time: performance.now() })
      if (positionsRef.current.length > 60) positionsRef.current.shift()
    }

    window.addEventListener('mousemove', onMove)

    const lifespan = 600
    const CURSOR_SIZE = 50

    const render = () => {
      const now = performance.now()
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      const positions = positionsRef.current
      for (let i = 0; i < positions.length; i++) {
        const p = positions[i]
        const age = now - p.time
        if (age > lifespan) continue
        const t = 1 - age / lifespan
        const radius = 2 + 10 * t * t
        const alpha = Math.pow(t, 1.3) * 0.75

        ctx.beginPath()
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        grd.addColorStop(0, `rgba(99,102,241,${alpha})`)
        grd.addColorStop(0.5, `rgba(99,102,241,${alpha * 0.3})`)
        grd.addColorStop(1, `rgba(99,102,241,0)`)
        ctx.fillStyle = grd
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      const latest = positions[positions.length - 1]
      if (latest) {
        const size = CURSOR_SIZE
        const x = latest.x - size / 2
        const y = latest.y - size / 2

        if (imgRef.current && imgRef.current.complete) {
          ctx.save()
          ctx.beginPath()
          ctx.arc(latest.x, latest.y, size / 2, 0, Math.PI * 2)
          ctx.closePath()
          ctx.clip()
          ctx.drawImage(imgRef.current, x, y, size, size)
          ctx.restore()
        } else {
          ctx.beginPath()
          ctx.fillStyle = 'rgba(99,102,241,0.95)'
          ctx.arc(latest.x, latest.y, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      positionsRef.current = positions.filter(p => now - p.time <= lifespan)
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = previousCursor
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />
}

export default CursorTrail
