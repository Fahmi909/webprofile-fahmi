'use client'

import { useState } from 'react'
import type { ElementType, ReactNode } from 'react'

type RichTextNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  children?: RichTextNode[]
  fields?: {
    code?: string
    language?: string
  }
  code?: string
  language?: string
  url?: string
  newTab?: boolean
  value?: string | number | { url?: string }
  [key: string]: unknown
}

type RichTextValue = {
  root?: RichTextNode
} | null | undefined

const languageLabels: Record<string, string> = {
  bash: 'Bash',
  javascript: 'JavaScript',
  json: 'JSON',
  python: 'Python',
  sql: 'SQL',
  typescript: 'TypeScript',
}

const keywordPattern = /(#.*$|--.*$|\/\/.*$|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b(?:and|as|async|await|class|const|def|else|for|from|function|if|import|in|is|let|not|null|or|return|select|from|where|with|while|true|false|None|True|False|var)\b|\b\d+(?:\.\d+)?\b)/gi

function highlightLine(line: string, language: string) {
  return line.split(keywordPattern).map((token, index) => {
    if (!token) return null
    const isComment = token.startsWith('#') || token.startsWith('--') || token.startsWith('//')
    const isString = token.startsWith('"') || token.startsWith("'")
    const isNumber = /^\d/.test(token)
    const isKeyword = /^(and|as|async|await|class|const|def|else|for|from|function|if|import|in|is|let|not|null|or|return|select|where|with|while|true|false|none|var)$/i.test(token)
    const className = isComment ? 'token-comment' : isString ? 'token-string' : isNumber ? 'token-number' : isKeyword ? `token-keyword token-${language}` : undefined
    return className ? <span className={className} key={`${token}-${index}`}>{token}</span> : token
  })
}

function getCodeData(node: RichTextNode) {
  const fields = node.fields ?? {}
  const code = fields.code ?? node.code
  const language = fields.language ?? node.language ?? 'text'

  return code !== undefined ? { code, language } : null
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)
  const label = languageLabels[language.toLowerCase()] ?? language

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="code-block">
      <div className="code-block__toolbar">
        <span className="code-block__language">{label}</span>
        <button className="copy-button" onClick={copyCode} type="button">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre>
        <code className={`language-${language}`}>{code.split('\n').map((line, index) => <span className="code-line" key={index}>{highlightLine(line, language)}{index < code.split('\n').length - 1 ? '\n' : ''}</span>)}</code>
      </pre>
    </div>
  )
}

function renderNode(node: RichTextNode, index: number): ReactNode {
  const codeData = node.type === 'code' || node.type === 'block' ? getCodeData(node) : null
  if (codeData) return <CodeBlock code={codeData.code} language={codeData.language} key={index} />

  const children = node.children?.map((child, childIndex) => renderNode(child, childIndex))
  const text = node.text ?? ''

  switch (node.type) {
    case 'root':
      return <>{children}</>
    case 'heading': {
      const Tag = (node.tag ?? 'h2') as ElementType
      return <Tag key={index}>{children}</Tag>
    }
    case 'quote':
      return <blockquote key={index}>{children}</blockquote>
    case 'list':
      return node.tag === 'ol' ? <ol key={index}>{children}</ol> : <ul key={index}>{children}</ul>
    case 'listitem':
      return <li key={index}>{children}</li>
    case 'link':
      return (
        <a href={node.url} key={index} rel={node.newTab ? 'noreferrer' : undefined} target={node.newTab ? '_blank' : undefined}>
          {children}
        </a>
      )
    case 'linebreak':
      return <br key={index} />
    case 'paragraph':
      return <p key={index}>{children}</p>
    case 'text':
      return <span key={index}>{text}</span>
    default:
      return <span key={index}>{children ?? text}</span>
  }
}

export function RichTextRenderer({ content }: { content: RichTextValue }) {
  if (!content?.root) return null
  return <div className="rich-text">{renderNode(content.root, 0)}</div>
}

export default RichTextRenderer
