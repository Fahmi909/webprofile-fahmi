'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const TARGET_SELECTOR = [
  'main > *',
  'main section',
  'main article',
  'main [data-animate]',
  'main .page-intro',
  'main .section-heading',
  'main .article-header',
  'main .article-layout',
  'main .article-section',
  'main .profile-hero > *',
  'main .education-card',
  'main .content-card',
  'main .archive-row',
  'main .skills-category',
  'main .card-grid > *',
  'main .archive-list > *',
  'main .skills-category-grid > *',
  'main h1',
  'main h2',
  'main h3',
  'main h4',
  'main p',
  'main img',
].join(', ')

const STAGGER_GROUP_SELECTOR =
  '.card-grid, .archive-list, .skills-category-grid, [data-animate-group], ul, ol, [role="list"]'

const isExcluded = (element: Element) =>
  Boolean(
    element.closest(
      'header, nav, footer, dialog, [role="dialog"], .modal, [data-modal], [aria-modal="true"]',
    ),
  )

export default function GlobalScrollAnimator() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('auto-reveal-is-visible', entry.isIntersecting)
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    const observed = new Set<HTMLElement>()

    const attachTargets = () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGET_SELECTOR)).filter(
        (element) => !isExcluded(element),
      )
      let attachedThisPass = 0

      targets.forEach((element) => {
        if (observed.has(element)) return

        element.classList.add('auto-reveal')

        const group = element.closest(STAGGER_GROUP_SELECTOR)
        const siblings = group
          ? Array.from(group.children).filter((child) => child instanceof HTMLElement)
          : []
        const siblingIndex = siblings.indexOf(element)

        element.style.setProperty(
          'transition-delay',
          `${Math.min(Math.max(siblingIndex, 0) * 80, 400)}ms`,
        )
        observed.add(element)
        observer.observe(element)
        attachedThisPass += 1
      })

      if (process.env.NODE_ENV !== 'production' && attachedThisPass > 0) {
        console.log(`[ScrollAnimator] Attached to ${observed.size} elements`)
      }
    }

    attachTargets()

    const mutationObserver = new MutationObserver(attachTargets)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      observed.forEach((element) => {
        element.classList.remove('auto-reveal', 'auto-reveal-is-visible')
        element.style.removeProperty('transition-delay')
      })
    }
  }, [pathname])

  return null
}
