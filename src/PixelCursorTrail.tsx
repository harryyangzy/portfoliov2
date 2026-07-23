import { useEffect, useRef, useState } from 'react'
import './pixelCursorTrail.css'

type TrailPixel = {
  id: string
  x: number
  y: number
  size: number
}

const TRAIL_GRID = 10
const TRAIL_MAX = 56
const TRAIL_SIZES = [6, 8, 10] as const

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export default function PixelCursorTrail({
  tone = 'blue',
  listenClosest,
}: {
  tone?: 'blue' | 'beige'
  /** Closest ancestor to attach pointer listeners to. Defaults to the parent element. */
  listenClosest?: string
}) {
  const layerRef = useRef<HTMLDivElement>(null)
  const lastCellRef = useRef<{ x: number; y: number } | null>(null)
  const [pixels, setPixels] = useState<TrailPixel[]>([])

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const host = (
      listenClosest ? layer.closest(listenClosest) : layer.parentElement
    ) as HTMLElement | null
    if (!host) return

    const onPointerMove = (event: PointerEvent) => {
      const rect = layer.getBoundingClientRect()
      const localX = event.clientX - rect.left
      const localY = event.clientY - rect.top
      if (
        localX < -TRAIL_GRID ||
        localY < -TRAIL_GRID ||
        localX > rect.width + TRAIL_GRID ||
        localY > rect.height + TRAIL_GRID
      ) {
        return
      }

      const cellX = Math.floor(localX / TRAIL_GRID) * TRAIL_GRID
      const cellY = Math.floor(localY / TRAIL_GRID) * TRAIL_GRID
      const last = lastCellRef.current
      if (last && last.x === cellX && last.y === cellY) return
      lastCellRef.current = { x: cellX, y: cellY }

      const size = TRAIL_SIZES[Math.floor(Math.random() * TRAIL_SIZES.length)]!
      const offset = Math.floor((TRAIL_GRID - size) / 2)
      const pixel: TrailPixel = {
        id: createId(),
        x: cellX + offset,
        y: cellY + offset,
        size,
      }

      setPixels((prev) => {
        const next = prev.length >= TRAIL_MAX ? prev.slice(prev.length - TRAIL_MAX + 1) : prev
        return [...next, pixel]
      })
    }

    const onPointerLeave = () => {
      lastCellRef.current = null
    }

    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave)
    return () => {
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [listenClosest])

  return (
    <div
      ref={layerRef}
      className={`pixel-trail pixel-trail--${tone}`}
      aria-hidden
    >
      {pixels.map((pixel) => (
        <span
          key={pixel.id}
          className="pixel-trail__dot"
          style={{
            left: pixel.x,
            top: pixel.y,
            width: pixel.size,
            height: pixel.size,
          }}
          onAnimationEnd={() => {
            setPixels((prev) => prev.filter((item) => item.id !== pixel.id))
          }}
        />
      ))}
    </div>
  )
}
