import type { ReactNode } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export function Magnetic({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 25 })
  const springY = useSpring(y, { stiffness: 250, damping: 25 })
  return (
    <m.span
      className="magnetic"
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (
          reduced ||
          event.pointerType !== 'mouse' ||
          !window.matchMedia('(pointer: fine)').matches
        )
          return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * 0.09)
        y.set((event.clientY - rect.top - rect.height / 2) * 0.09)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.span>
  )
}
