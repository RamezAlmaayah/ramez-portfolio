import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import { ResumeAction } from './ResumeAction'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { pathname } = useLocation()
  const current = pathname.startsWith('/projects/') ? 'projects' : active
  const { theme, toggleTheme } = useTheme()
  const reduced = useReducedMotion()
  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: 0 },
    )
    const observe = () =>
      document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    observe()
    const mutation = new MutationObserver(observe)
    mutation.observe(document.getElementById('main')!, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const resize = () => {
      if (window.innerWidth >= 1200) {
        setOpen(false)
        toggle.current?.blur()
      }
    }
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
      if (event.key === 'Tab') {
        const elements = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLElement>('a, button:not(:disabled)') ?? [],
          ),
        ].filter(Boolean) as HTMLElement[]
        const first = elements[0],
          last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', keyboard)
    window.addEventListener('resize', resize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', keyboard)
      window.removeEventListener('resize', resize)
    }
  }, [open])

  const navigate = (id: string) => {
    setActive(id)
    setOpen(false)
    if (pathname === '/')
      requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          to="/#home"
          className="brand"
          aria-label="Ramez Ahmad, home"
          onClick={() => navigate('home')}
        >
          <Logo decorative />
          <span className="brand-name">
            Ramez Ahmad<span>Full-Stack Developer</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              to={`/#${item.id}`}
              key={item.id}
              onClick={() => navigate(item.id)}
              aria-current={current === item.id ? 'location' : undefined}
            >
              {item.label}
              {current === item.id ? (
                <m.span
                  layoutId="active-nav"
                  className="active-line"
                  transition={{ duration: reduced ? 0 : 0.3 }}
                />
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="header-resume">
            <ResumeAction compact />
          </div>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <m.nav
            ref={menu}
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: reduced ? 'auto' : 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: reduced ? 'auto' : 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            {navigation.map((item, index) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                onClick={() => navigate(item.id)}
                aria-current={current === item.id ? 'location' : undefined}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={23} />
              </Link>
            ))}
            <div className="mobile-resume">
              <ResumeAction compact />
            </div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
