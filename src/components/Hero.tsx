import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { Magnetic } from './Button'
import { ResumeAction } from './ResumeAction'

export function Hero() {
  const reduced = useReducedMotion()
  return (
    <section id="home" tabIndex={-1} className="hero">
      <div className="container hero-main">
        <div className="hero-heading">
          <p className="eyebrow">
            <span className="small-line" />
            {portfolio.role.toUpperCase()}
          </p>
          <h1 tabIndex={-1}>
            {portfolio.heroHeading.map((line, index) => (
              <span className="headline-mask" key={line}>
                <m.span
                  initial={false}
                  animate={reduced ? {} : { y: ['110%', '0%'] }}
                  transition={{ duration: 0.9, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit-art">
            <m.div
              className="orbit-ring ring-one"
              initial={false}
              animate={reduced ? {} : { rotate: [0, 18, 0] }}
              transition={{ duration: 4.6, ease: 'easeInOut' }}
            />
            <m.div
              className="orbit-ring ring-two"
              initial={false}
              animate={reduced ? {} : { rotate: [45, 70, 45] }}
              transition={{ duration: 4.8, ease: 'easeInOut' }}
            />
            <div className="orbit-ring ring-three" />
            <div className="orbit-core">
              <span>&#123;</span>
              <i />
              <span>&#125;</span>
            </div>
            <span className="art-coordinate coordinate-top">LOGIC + INTENTION</span>
            <span className="art-coordinate coordinate-bottom">SYSTEMS / EXPERIENCES</span>
          </div>
        </div>
        <m.div
          className="hero-person"
          initial={false}
          animate={reduced ? {} : { y: [20, 0], opacity: [0.7, 1] }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <span className="hero-person-rule" />
          <p>{portfolio.name}</p>
          <span className="hero-location">
            <MapPin size={18} />
            {portfolio.location}
          </span>
        </m.div>
        <m.div
          className="hero-description"
          initial={false}
          animate={reduced ? {} : { y: [20, 0], opacity: [0.7, 1] }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p>{portfolio.introduction}</p>
          <div className="hero-actions flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className="button button-white">
                View Projects
                <ArrowUpRight size={21} />
              </a>
            </Magnetic>
            <ResumeAction />
            <a href="#contact" className="text-action">
              Contact Me
              <ArrowUpRight size={19} />
            </a>
          </div>
          {!portfolio.cv ? <p className="resume-note">Resume PDF not yet available.</p> : null}
        </m.div>
      </div>
      <div className="container hero-bottom">
        <span>From clear requirements to considered experiences.</span>
        <a href="#about">
          Scroll to explore
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  )
}
