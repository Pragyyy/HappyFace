import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import { TextEffect, InView, Photo } from './components/motion'

import { reviews } from './reviews'
const IG = 'https://instagram.com/the_happyfaces_'
const TEL = 'tel:+919558901904'
const MAIL = 'mailto:thehappyfaces19@gmail.com'
const ease = [0.22, 0.7, 0.2, 1] as const

const Logo = ({ dark = false }: { dark?: boolean }) => (
  <a href="#top" aria-label="The Happy Faces" className={`inline-block leading-none ${dark ? 'text-emerald' : 'text-champagne'}`}>
    <span className="block font-display text-[1.45rem] font-medium">The Happy Faces</span>
    <svg viewBox="0 0 120 10" className="ml-auto mt-1 h-2 w-24 text-gold" fill="none"><path d="M2 2c20 9 36 9 58 6s40-3 58-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  </a>
)
const Btn = ({ href, children, solid = false }: { href: string; children: ReactNode; solid?: boolean }) => (
  <a href={href} className={`inline-flex items-center justify-center px-8 py-4 text-[0.95rem] font-medium transition-colors ${solid ? 'bg-champagne text-emerald hover:bg-blush' : 'border border-champagne text-champagne hover:bg-champagne hover:text-emerald'}`}>{children}</a>
)

/* One orchestrated moment: emerald curtains part over the wordmark. */
function Curtain() {
  const reduce = useReducedMotion(); const [done, setDone] = useState(false)
  if (reduce || done) return null
  const t = { duration: 1.15, ease: [0.76, 0, 0.24, 1] as const, delay: 0.7 }
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-emerald" initial={{ x: 0 }} animate={{ x: '-100%' }} transition={t} onAnimationComplete={() => setDone(true)} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-emerald" initial={{ x: 0 }} animate={{ x: '100%' }} transition={t} />
      <motion.div className="absolute inset-0 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.7, times: [0, 0.3, 0.7, 1] }}><Logo /></motion.div>
    </div>
  )
}

function Header() {
  const [solid, setSolid] = useState(false)
  useEffect(() => { const f = () => setSolid(scrollY > 60); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  const { scrollYProgress } = useScroll(); const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${solid ? 'bg-emerald shadow-[0_1px_0_rgba(184,151,90,.35)]' : 'bg-gradient-to-b from-emerald/80 to-transparent'}`}>
      <div className="flex h-16 items-center justify-between px-5 pt-[env(safe-area-inset-top)] md:px-10" style={{ boxSizing: "content-box" }}>
        <Logo />
        <nav className="hidden gap-9 text-base font-medium text-champagne md:flex">
          {[['Portfolio', '#portfolio'], ['Looks', '#looks'], ['Artist', '#artist'], ['Book', '#book']].map(([l, h]) => <a key={l} href={h} className="transition hover:text-blush">{l}</a>)}
        </nav>
        <a href="#book" className="border border-champagne px-5 py-2 text-[0.95rem] font-medium text-champagne md:hidden">Book</a>
      </div>
      <motion.div className="h-[2px] origin-left bg-gold" style={{ scaleX: w }} />
    </header>
  )
}

/* HERO: three portraits rise in turn, each framed to keep the face and head in view. */
const panels = [
  { src: '/img/front.jpg', alt: 'Rose eyes, nude lip and emerald jewellery', pos: '54% 0%', h: '84%', d: 1.05 },
  { src: '/img/seated.jpg', alt: 'Ivory and emerald look, seated', pos: '43% 0%', h: '100%', d: 1.2 },
  { src: '/img/side.jpg', alt: 'Profile with soft waves and bridal jewellery', pos: '61% 0%', h: '90%', d: 1.35 },
]
function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-emerald">
      <motion.img src="/img/seated.jpg" alt="Ivory and emerald look by The Happy Faces" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover md:hidden" style={{ objectPosition: '50% 0%' }} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease, delay: 0.7 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/60 to-transparent md:hidden" />
      <div className="absolute inset-y-0 right-0 hidden w-[60%] items-end gap-2 pr-3 md:flex">
        {panels.map((p) => (
          <motion.div key={p.src} className="flex-1 overflow-hidden" style={{ height: p.h }} initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, ease, delay: p.d }}>
            <img src={p.src} alt={p.alt} className="h-full w-full object-cover" style={{ objectPosition: p.pos }} />
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 md:w-[46%] md:justify-center md:px-10 md:pb-0 md:pt-16">
        <TextEffect as="h1" text="Behind every look is a happy face." delay={1.2} className="font-display text-[3.3rem] font-medium leading-[0.98] text-champagne md:text-[5.2rem]" />
        <InView delay={1.9} className="mt-6 max-w-md">
          <p className="text-[1.1rem] leading-relaxed text-champagne">Makeup by Dhruvi Thakkar. Radiant, festive and party-glam looks in Ahmedabad. Travel available.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Btn href={IG} solid>DM to book your look</Btn><Btn href="#portfolio">See the work</Btn></div>
        </InView>
      </div>
    </section>
  )
}

const Gem = () => <svg viewBox="0 0 20 20" className="mx-8 h-4 w-4 shrink-0 text-gold" fill="currentColor"><path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" /></svg>
function Ticker() {
  const items = ['Radiant', 'Festive', 'Party glam', 'Ahmedabad', 'Travel available']
  const row = items.map((t) => <span key={t} className="flex shrink-0 items-center font-display text-3xl italic text-emerald md:text-5xl">{t}<Gem /></span>)
  return <div className="overflow-hidden border-y border-emerald/25 bg-champagne py-5" aria-hidden><div className="ticker flex w-max">{row}{row}{row}{row}</div></div>
}

/* PORTFOLIO: vertical scroll pans a horizontal strip of full-height photographs. */
const work = [
  { src: '/img/macro.jpg', alt: 'Close-up of a soft smile, rose eyes and emerald necklace', pos: '50% 30%' },
  { src: '/img/closeup.jpg', alt: 'Glowing skin and soft rose eye', pos: '50% 30%' },
  { src: '/img/profile.jpg', alt: 'Back-turned look with sleek parting and waves', pos: '50% 15%' },
  { src: '/img/pose.jpg', alt: 'Ivory and emerald look with hand jewellery and a poised frontal pose', pos: '50% 12%' },
  { src: '/img/backstage.jpg', alt: 'At work, finishing a bridal hairstyle', pos: '85% 40%' },
]
function Portfolio() {
  const sec = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null); const [max, setMax] = useState(0)
  useEffect(() => { const m = () => setMax(Math.max(0, track.current!.scrollWidth - innerWidth)); m(); addEventListener('resize', m); addEventListener('load', m); return () => { removeEventListener('resize', m); removeEventListener('load', m) } }, [])
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -max])
  return (
    <section id="portfolio" ref={sec} className="relative bg-paper" style={{ height: `calc(100svh + ${max}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-20">
        <div className="mb-5 flex items-end justify-between px-5 md:px-10">
          <TextEffect as="h2" text="The ivory and emerald edit" className="max-w-xl font-display text-[2.4rem] leading-[1] md:text-6xl" />
          <span className="hidden text-sm font-medium md:block">Keep scrolling</span>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-3 px-5 md:gap-5 md:px-10">
          {work.map((w) => <div key={w.src + w.pos} className="h-[58svh] shrink-0 overflow-hidden md:h-[64svh]" style={{ aspectRatio: '3 / 4' }}><Photo src={w.src} alt={w.alt} pos={w.pos} className="h-full w-full" /></div>)}
          <a href={IG} className="flex h-[58svh] w-[70vw] shrink-0 flex-col justify-end bg-emerald p-6 text-champagne md:h-[64svh] md:w-[26rem]">
            <span className="font-display text-4xl italic leading-tight md:text-5xl">New looks go up on Instagram first.</span>
            <span className="mt-4 border-b border-gold pb-1 text-base font-medium w-fit">@the_happyfaces_</span>
          </a>
        </motion.div>
        <motion.div className="mx-5 mt-6 h-px origin-left bg-emerald md:mx-10" style={{ scaleX: scrollYProgress }} />
      </div>
    </section>
  )
}

/* LOOKS: large type; the active look lights up. No image swap, so nothing can flicker. */
const looks = [
  { t: 'Radiant', d: 'Soft, skin-first makeup that photographs as well as it looks in person.' },
  { t: 'Festive', d: 'Colour, kajal and gold for Navratri, Diwali and family occasions.' },
  { t: 'Party glam', d: 'Defined eyes and long wear for receptions, sangeets and nights out.' },
]
function Looks() {
  const [i, setI] = useState(0)
  return (
    <section id="looks" className="anchor bg-emerald px-5 py-16 text-champagne md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <TextEffect as="h2" text="Three kinds of look" className="font-display text-[2.6rem] leading-none md:text-6xl" />
          <p className="mt-6 max-w-xs text-[1.1rem] leading-relaxed">For pricing and availability, send a message with your date and occasion.</p>
        </div>
        <div className="border-t border-champagne/30 md:col-span-8">
          {looks.map((l, n) => (
            <button key={l.t} onClick={() => setI(n)} onMouseEnter={() => setI(n)} onFocus={() => setI(n)} aria-pressed={i === n} className="block w-full border-b border-champagne/30 py-8 text-left md:py-10">
              <span className="flex items-center justify-between gap-4">
                <span className={`font-display text-5xl italic transition-colors duration-500 md:text-7xl ${i === n ? 'text-blush' : 'text-champagne'}`}>{l.t}</span>
                <motion.span animate={{ scaleX: i === n ? 1 : 0.2, opacity: i === n ? 1 : 0.5 }} transition={{ duration: 0.5, ease }} className="h-px w-20 origin-right bg-gold md:w-32" />
              </span>
              <span className="mt-3 block max-w-xl text-[1.1rem] leading-relaxed">{l.d}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Artist() {
  return (
    <section id="artist" className="grid anchor bg-champagne md:grid-cols-12">
      <Photo src="/img/portrait.jpg" alt="Dhruvi Thakkar, makeup artist" className="aspect-square md:col-span-5 md:aspect-auto md:min-h-[36rem]" pos="50% 20%" />
      <div className="flex flex-col justify-center px-5 py-14 md:col-span-4 md:px-12">
        <TextEffect as="h2" text="Dhruvi Thakkar" className="font-display text-5xl leading-none text-emerald md:text-6xl" />
        <InView className="mt-7 space-y-4 text-[1.1rem] leading-[1.7] text-ink">
          <p>I'm a makeup artist based in Ahmedabad. Every booking begins with a conversation about the occasion, your outfit and how you want to feel.</p>
          <p>Then I build the look around you. I can travel for your event.</p>
          <a href={IG} className="inline-block border-b-2 border-emerald pb-1 font-medium text-emerald">Follow @the_happyfaces_</a>
        </InView>
      </div>
      <Photo src="/img/festive.jpg" alt="Dhruvi in a festive Navratri outfit" className="aspect-[3/4] md:col-span-3 md:aspect-auto" pos="50% 25%" />
    </section>
  )
}

/* Renders only when real, permissioned client words exist in src/reviews.ts */
function Reviews() {
  if (!reviews.length) return null
  return (
    <section className="anchor bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <TextEffect as="h2" text="Kind words" className="font-display text-5xl leading-none md:col-span-4 md:text-6xl" />
        <div className="space-y-10 md:col-span-8">
          {reviews.map((r) => (
            <InView key={r.name}><blockquote className="font-display text-2xl italic leading-snug md:text-3xl">{r.quote}</blockquote><p className="mt-4 text-base font-medium">{r.name}{r.occasion ? `, ${r.occasion}` : ''}</p></InView>
          ))}
        </div>
      </div>
    </section>
  )
}

function Book() {
  const rows = [['Instagram', '@the_happyfaces_', IG], ['Call', '95589 01904', TEL], ['Email', 'thehappyfaces19@gmail.com', MAIL]]
  return (
    <section id="book" className="anchor bg-emerald text-champagne">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-24">
        <div className="md:col-span-7">
          <TextEffect as="h2" text="Tell me about your dream look." className="font-display text-[2.8rem] leading-[1.02] md:text-7xl" />
          <InView className="mt-6">
            <p className="max-w-md text-[1.15rem] leading-relaxed">Send the date, the occasion and your outfit. I'll reply with availability. Based in Ahmedabad, travel available.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn href={IG} solid>Message on Instagram</Btn><Btn href={TEL}>Call now</Btn></div>
          </InView>
        </div>
        <div className="border-t border-champagne/30 md:col-span-5 md:self-end">
          {rows.map(([l, v, h]) => (
            <a key={l} href={h} className="group flex flex-col border-b border-champagne/30 py-5 transition-colors hover:text-blush">
              <span className="text-sm font-medium text-gold">{l}</span>
              <span className="mt-1 break-all font-display text-2xl md:text-3xl">{v}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 border-t border-champagne/30 px-5 py-8 pb-28 text-sm md:flex-row md:px-10 md:pb-8">
        <Logo /><span>Ahmedabad. Travel available.</span><span>© {new Date().getFullYear()} The Happy Faces</span>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div id="top">
      <Curtain /><Header /><Hero /><Ticker /><Portfolio /><Looks /><Artist /><Reviews /><Book />
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-emerald p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">
        <a href={IG} className="flex-1 bg-champagne py-3.5 text-center text-[0.95rem] font-medium text-emerald">Book on Instagram</a>
        <a href={TEL} className="border border-champagne px-5 py-3.5 text-[0.95rem] font-medium text-champagne">Call</a>
      </div>
    </div>
  )
}
