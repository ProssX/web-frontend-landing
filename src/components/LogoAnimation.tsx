import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const FRAME_COUNT = 43
const FRAME_PATH = (i: number) =>
  `/frames/catch-the-logo${String(i).padStart(2, '0')}.png`

interface LogoAnimationProps {
  triggerRef: React.RefObject<HTMLButtonElement | null>
  isSubmitted: boolean
}

export default function LogoAnimation({ triggerRef, isSubmitted }: LogoAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const framesRef  = useRef<HTMLImageElement[]>([])
  const tlRef      = useRef<gsap.core.Tween | null>(null)
  const proxyRef   = useRef({ frame: 0 })

  // Draw frame with object-fit: contain letterboxing
  function drawFrame(index: number) {
    const canvas = canvasRef.current
    const img    = framesRef.current[Math.round(index)]
    if (!canvas || !img?.complete) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.min(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  // Sync canvas buffer size to CSS display size
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sync = () => {
      canvas.width  = canvas.clientWidth
      canvas.height = canvas.clientHeight
      drawFrame(proxyRef.current.frame)
    }
    const ro = new ResizeObserver(sync)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  // Preload all frames; draw frame 0 as soon as ready
  useEffect(() => {
    const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.src = FRAME_PATH(i)
      if (i === 0) img.onload = () => drawFrame(0)
      return img
    })
    framesRef.current = images
  }, [])

  // Complete animation when form is submitted
  useEffect(() => {
    if (isSubmitted) tlRef.current?.play()
  }, [isSubmitted])

  // Desktop: hover-driven tween
  useGSAP(() => {
    const btn = triggerRef.current
    if (!btn) return

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isDesktop) return

    tlRef.current = gsap.to(proxyRef.current, {
      frame: FRAME_COUNT - 1,
      paused: true,
      ease: 'none',
      duration: 1.4,
      snap: { frame: 1 },
      onUpdate: () => drawFrame(proxyRef.current.frame),
    })

    const onEnter = () => tlRef.current?.play()
    const onLeave = () => { if (!isSubmitted) tlRef.current?.reverse() }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [triggerRef, isSubmitted])

  // Mobile: autoplay on viewport entry
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (isDesktop) return

    let timer: ReturnType<typeof setTimeout>
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            gsap.to(proxyRef.current, {
              frame: FRAME_COUNT - 1,
              ease: 'none',
              duration: 1.8,
              snap: { frame: 1 },
              onUpdate: () => drawFrame(proxyRef.current.frame),
            })
          }, 500)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(canvas)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'absolute', inset: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
