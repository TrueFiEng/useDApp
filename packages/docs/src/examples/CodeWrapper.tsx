import React from 'react'
import CodeBlock from '@theme/CodeBlock'
import './styles/button.module.css'
import './styles/text.module.css'

export interface CodeWrapperProps {
  title: string
  children?: string
}

export const CodeWrapper = ({title, children}: CodeWrapperProps) => {
  return (
    <CodeBlock language="tsx" title={title}>
      {children}
    </CodeBlock>
  )
}

export default CodeWrapper
