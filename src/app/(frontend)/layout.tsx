import React from 'react'
import GlobalScrollAnimator from '@/components/GlobalScrollAnimator'
import ThemeProvider from '@/components/ThemeProvider'
import './styles.css'

export const metadata = {
  description: 'Portfolio and learning archive of Fahmi Ibadrurochman, Information Systems Student & Data Analyst.',
  title: 'Fahmi Ibadrurochman — Data Analyst',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange><GlobalScrollAnimator />{children}</ThemeProvider></body>
    </html>
  )
}
