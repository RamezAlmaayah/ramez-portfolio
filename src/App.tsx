import { useEffect, useLayoutEffect, useRef } from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  MotionConfig,
  useReducedMotion,
} from 'motion/react'
import { Link, useLocation, useNavigationType } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { RouteEffects } from './components/RouteEffects'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { projects } from './data/portfolio'
import { normalizePathname } from './lib/routing'

function PageContent() {
  const location = useLocation()
  const pathname = normalizePathname(location.pathname)
  const navigationType = useNavigationType()
  const reduced = useReducedMotion()
  const positions = useRef(new Map<string, number>())
  const previousKey = useRef(location.key)
  useLayoutEffect(() => {
    // Capture before the exiting page unmounts and the document height changes.
    if (previousKey.current !== location.key)
      positions.current.set(previousKey.current, window.scrollY)
    previousKey.current = location.key
  }, [location.key])
  const project = projects.find((item) => pathname === `/projects/${item.slug}`)
  const restoreScroll = () => {
    if (navigationType === 'POP' && positions.current.has(location.key)) {
      window.scrollTo({ top: positions.current.get(location.key), behavior: 'instant' })
      document.getElementById(location.hash.slice(1))?.focus({ preventScroll: true })
    } else if (location.hash) {
      const destination = document.getElementById(location.hash.slice(1))
      destination?.scrollIntoView({ behavior: 'instant' })
      destination?.focus({ preventScroll: true })
    } else {
      window.scrollTo({
        top: navigationType === 'POP' ? (positions.current.get(location.key) ?? 0) : 0,
        behavior: 'instant',
      })
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
  }
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }}
    >
      <m.div
        key={location.pathname}
        ref={(node) => {
          if (node) requestAnimationFrame(restoreScroll)
        }}
        initial={false}
        animate={reduced ? {} : { y: [16, 0] }}
        exit={reduced ? {} : { y: -12 }}
        transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
      >
        {pathname === '/' ? (
          <HomePage />
        ) : project ? (
          <ProjectPage project={project} />
        ) : (
          <section className="not-found container">
            <p className="eyebrow">404 / PAGE NOT FOUND</p>
            <h1 tabIndex={-1}>A different path.</h1>
            <p>This page isn’t in the portfolio. Explore the work from the homepage.</p>
            <Link className="button" to="/">
              Return home
            </Link>
          </section>
        )}
      </m.div>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])
  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <RouteEffects />
        <main id="main" tabIndex={-1}>
          <PageContent />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
