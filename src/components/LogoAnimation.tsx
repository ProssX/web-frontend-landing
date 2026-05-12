import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const FRAME_COUNT = 43
const FRAME_PATH = (i: number) =>
  `/frames/catch-the-logo${String(i).padStart(2, '0')}.png`

interface LogoAnimationProps {
  isHovered: boolean
  isSubmitted: boolean
}

export default function LogoAnimation({ isHovered, isSubmitted }: LogoAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const framesRef  = useRef<HTMLImageElement[]>([])
  const tlRef      = useRef<gsap.core.Tween | null>(null)
  const proxyRef   = useRef({ frame: 0 })

  // Draw frame with object-fit: contain
  function drawFrame(index: number) {
    const canvas = canvasRef.current
    const img    = framesRef.current[Math.round(index)]
    if (!canvas || !img?.complete) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cw = canvas.width / dpr
    const ch = canvas.height / dpr
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.min(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    // Apply pixel ratio scale for sharp rendering
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  // Sync canvas buffer size to CSS display size considering devicePixelRatio
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sync = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      drawFrame(proxyRef.current.frame)
    }
    const ro = new ResizeObserver(sync)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (Math.round(proxyRef.current.frame) === i) {
          drawFrame(proxyRef.current.frame)
        }
      }
      img.src = FRAME_PATH(i)
      return img
    })
    framesRef.current = images
  }, [])

  // Create tween once
  useGSAP(() => {
    tlRef.current = gsap.to(proxyRef.current, {
      frame: FRAME_COUNT - 1,
      paused: true,
      ease: 'none',
      duration: 1.4,
      snap: { frame: 1 },
      onUpdate: () => drawFrame(proxyRef.current.frame),
    })
  }, [])

  // Desktop hover/submit logic and Mobile logic
  useGSAP(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    
    // Desktop logic
    if (isDesktop) {
      if (isSubmitted || isHovered) {
        tlRef.current?.play()
      } else if (!isSubmitted) {
        tlRef.current?.reverse()
      }
      return
    }

    // Mobile logic
    const canvas = canvasRef.current
    if (!canvas) return

    let timer: ReturnType<typeof setTimeout>
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            tlRef.current?.play()
          }, 500)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(canvas)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [isHovered, isSubmitted])

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'absolute', inset: 0, padding: '2rem' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
      {/* Vignette overlay */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'none',
          background: 'linear-gradient(to right, #000, transparent, #000);' 
        }} 
      />
    </div>
  )
}
