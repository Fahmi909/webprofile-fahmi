'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <button aria-label="Toggle color theme" className="theme-toggle" type="button"><span className="theme-toggle__icon">◐</span></button>

  const isDark = resolvedTheme === 'dark'
  return <button aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} className="theme-toggle" onClick={() => setTheme(isDark ? 'light' : 'dark')} type="button"><span className="theme-toggle__icon">{isDark ? '☼' : '◐'}</span><span className="theme-toggle__label">{isDark ? 'Light' : 'Dark'}</span></button>
}
