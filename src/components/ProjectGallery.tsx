import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { Project, ProjectScreenshot } from '../data/portfolio'

export function ProjectGallery({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const images: ProjectScreenshot[] = project.gallery ?? [{
    src: project.image,
    title: project.title,
    caption: project.imageAlt + ' Editorial illustration; not a project screenshot.',
    width: 1200,
    height: 840,
  }]
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)
  const thumbnails = images.some((item) => item.thumbnail)
  const image = images[index]
  const move = (direction: number) => setIndex((current) => (current + direction + images.length) % images.length)
  const startSwipe = (event: TouchEvent) => {
    swiped.current = false
    touchStart.current = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null
  }
  const endSwipe = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || !event.changedTouches.length) return
    const dx = event.changedTouches[0].clientX - start.x
    const dy = event.changedTouches[0].clientY - start.y
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.25 && images.length > 1) {
      swiped.current = true
      move(dx < 0 ? 1 : -1)
    }
  }

  useEffect(() => {
    if (!open) return
    const element = dialog.current!
    const returnFocus = trigger.current
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = overflow
      returnFocus?.focus({ preventScroll: true })
    }
  }, [open])

  const frame = (enlarged: boolean) => (
    <figure className="gallery-figure">
      <div className="gallery-image-stack" onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={() => { touchStart.current = null }}>
        {images.map((item, position) => (
          <m.img key={item.src} src={item.src} alt={`${item.title}: ${item.caption}`}
            srcSet={item.srcSet} sizes={enlarged ? '(min-width: 1472px) 1400px, 95vw' : '(min-width: 900px) 680px, 92vw'}
            width={item.width} height={item.height} decoding="async"
            loading={enlarged || !thumbnails ? 'eager' : 'lazy'}
            initial={false}
            whileInView={reduced || project.gallery || enlarged ? {} : { scale: [1.035, 1] }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={position === index ? 'is-active' : ''}
            aria-hidden={position !== index} />
        ))}
      </div>
      <figcaption id={enlarged ? 'lightbox-caption' : 'gallery-caption'} aria-live="polite" aria-atomic="true">
        <strong>{image.title}</strong><span>{image.caption}</span>
      </figcaption>
    </figure>
  )

  const controls = () => images.length > 1 ? (
    <div className="gallery-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous screenshot"><ChevronLeft aria-hidden="true" /></button>
      <span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
      <button type="button" onClick={() => move(1)} aria-label="Next screenshot"><ChevronRight aria-hidden="true" /></button>
    </div>
  ) : null

  return (
    <section className={`project-gallery${thumbnails ? ' gallery-with-thumbnails' : ''}`} aria-label={`${project.title} screenshot gallery`}
      onKeyDown={(event) => {
        if (dialog.current?.contains(event.target as Node)) return
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}>
      <div className="gallery-heading"><p className="eyebrow">{project.gallery ? `INSIDE ${project.title.toUpperCase()} / REAL PROJECT SCREENS` : 'PROJECT / CONCEPT ARTWORK'}</p>{controls()}</div>
      <div className="gallery-stage">
        {frame(false)}
        <button ref={trigger} type="button" className="gallery-enlarge" style={{ aspectRatio: `${image.width} / ${image.height}` }} aria-label={`Enlarge ${image.title}`} aria-haspopup="dialog" aria-describedby="gallery-caption"
          onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={() => { touchStart.current = null }}
          onClick={() => { if (swiped.current) { swiped.current = false; return }; setOpen(true) }}>
          <span className="gallery-enlarge-label"><Maximize2 size={18} aria-hidden="true" /> Enlarge screenshot</span>
        </button>
      </div>
      {images.length > 1 ? <div className="gallery-selectors" aria-label="Choose a screenshot">
        {images.map((item, position) => (
          <button type="button" key={item.src} aria-pressed={position === index} onClick={() => setIndex(position)}>
            {item.thumbnail ? <img src={item.thumbnail} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" /> : null}
            <span className="gallery-selector-label"><span>0{position + 1}</span>{item.title}</span>
          </button>
        ))}
      </div> : null}
      <dialog ref={dialog} className="project-lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-caption"
        onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
            const first = buttons[0]
            const last = buttons[buttons.length - 1]
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first.focus()
            }
          }
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            move(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}>
        {open ? <>
          <div className="lightbox-heading">
            <h2 id="lightbox-title">{project.title} / {project.gallery ? 'Screenshots' : 'Concept artwork'}</h2>
            <button type="button" autoFocus aria-label="Close screenshot viewer" onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
          </div>
          {frame(true)}
          <div className="lightbox-footer"><p>{images.length > 1 ? 'Use the arrow keys to explore. Escape to close.' : 'Escape to close.'}</p>{controls()}</div>
        </> : null}
      </dialog>
    </section>
  )
}
