import Link from 'next/link'

export default function Footer() {
  return <footer className="site-footer"><div className="shell footer-shell"><p>© {new Date().getFullYear()} Fahmi Ibadrurochman. Built for thoughtful data work.</p><div><Link href="/projects">Projects</Link><Link href="/learn">Learning Archive</Link></div></div></footer>
}
