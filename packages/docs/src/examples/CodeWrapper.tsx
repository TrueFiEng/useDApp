import React, { ReactElement, ReactNode } from 'react';
import CodeBlock from '@theme/CodeBlock';

export interface CodeWrapperProps {
  title: string
  children?: string
}

export const CodeWrapper = ({title, children}: CodeWrapperProps) => {
  return (
    <CodeBlock language="tsx" title={title}>
      {children}
    </CodeBlock>
  );
}

export default CodeWrapper;
