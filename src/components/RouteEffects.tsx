import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMetadata } from '../data/seo'

export function RouteEffects() {
  const location = useLocation()
  useEffect(() => {
    const metadata = getPageMetadata(location.pathname)
    document.title = metadata.title
    for (const [selector, content] of [
      ['meta[name="description"]', metadata.description],
      ['meta[property="og:title"]', metadata.title],
      ['meta[property="og:description"]', metadata.description],
      ['meta[name="twitter:title"]', metadata.title],
      ['meta[name="twitter:description"]', metadata.description],
      ['link[rel="canonical"]', metadata.canonical],
      ['meta[property="og:url"]', metadata.canonical],
    ])
      document.querySelector(selector)?.setAttribute(selector.startsWith('link') ? 'href' : 'content', content)
  }, [location.pathname])
  useEffect(() => {
    if (!location.hash) return
    const frame = requestAnimationFrame(() => {
      const destination = document.getElementById(location.hash.slice(1))
      destination?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
      destination?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.key, location.hash])
  return null
}
