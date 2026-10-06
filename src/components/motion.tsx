// Motion-Primitives-style building blocks (TextEffect, InView, AnimatedGroup), built on `motion`.
import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 0.7, 0.2, 1] as const

/** Words blur-fade in one after another. Text stays in the DOM, so it is always readable. */
export function TextEffect({ text, className = '', delay = 0, as: Tag = 'span' }: { text: string; className?: string; delay?: number; as?: 'span' | 'h1' | 'h2' | 'p' }) {
  const reduce = useReducedMotion()
  const M = motion[Tag]
  if (reduce) return <Tag className={className}>{text}</Tag>
  return (
    <M className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ staggerChildren: 0.07, delayChildren: delay }}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} aria-hidden className="inline-block whitespace-pre"
          variants={{ hidden: { opacity: 0, filter: 'blur(8px)', y: 14 }, show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease } } }}>{w + ' '}</motion.span>
      ))}
    </M>
  )
}

/** Fades content up once when it scrolls into view. */
export function InView({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease, delay }}>{children}</motion.div>
}

const item: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }
/** Staggers its children in. Children are visible without JS motion if reduced motion is on. */
export function AnimatedGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.1 }} transition={{ staggerChildren: 0.14 }}>{children}</motion.div>
}
export const GroupItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => <motion.div variants={item} className={className}>{children}</motion.div>

/** Photo with a slow zoom-settle on hover. The image is always fully visible. */
export const Photo = ({ src, alt, className = '', pos = 'center', scale = 1 }: { src: string; alt: string; className?: string; pos?: string; scale?: number }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: pos, scale }} whileHover={{ scale: scale * 1.04 }} transition={{ duration: 1.2, ease }} />
  </div>
)

/** Magnetic: the child leans gently toward the pointer. */
import { useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
export function Magnetic({ children, strength = 0.12 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 }), y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block"
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength) }}
      onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
  )
}
