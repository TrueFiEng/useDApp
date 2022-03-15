import React, { ReactElement } from 'react';
import CodeBlock from '@theme/CodeBlock';

export interface CodeWrapperProps {
  title: string
  children: ReactElement
}

export const CodeWrapper = ({title, children}: CodeWrapperProps) => {
  return (
      <CodeBlock language="tsx" title={title}>
        {children}
      </CodeBlock>
  );
}

export default CodeWrapper;
