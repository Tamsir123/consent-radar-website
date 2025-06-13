"use client"

import { useMotionValue, motion, useMotionTemplate } from "motion/react"
import type React from "react"
import { type MouseEvent as ReactMouseEvent, useState } from "react"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { cn } from "@/lib/utils"

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#26b6ff", // Couleur du logo
  className,
  ...props
}: {
  radius?: number
  color?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)
  return (
    <div
      className={cn(
        "group/spotlight p-8 rounded-2xl relative border border-brand-200/20 bg-gradient-to-br from-white to-brand-50/30 dark:from-navy-900 dark:to-brand-900/10 dark:border-brand-800/20 shadow-lg hover:shadow-xl transition-all duration-300",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [38, 182, 255], // Couleur du logo
              [0, 153, 230], // Variante plus foncée
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      {children}
    </div>
  )
}
