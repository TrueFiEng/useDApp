import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import CodeBlock from '@theme/CodeBlock';

const originalRender: ReactDOM.Renderer = ReactDOM.render.bind(ReactDOM);
(ReactDOM as any).render = () => {
  // Not rendering anything, overriding default behaviour of App examples.
}

export interface SetupOptions {
  root: string
}

export interface SetupResult {
  render: (Component: any) => void
}

export const setup = ({root}: SetupOptions): SetupResult => {
  return {
    render: (Component) => {
      const intervalId = setInterval(() => {
        const rootElement = document.getElementById(root);
        if (rootElement) {
          clearInterval(intervalId);
          originalRender(<Component />, rootElement);
        }
      }, 200)
      return null;
    }
  }
}

export interface CodeWrapperProps {
  title: string
  code: string
  children: ReactElement
}

export const CodeWrapper = ({title, code, children}: CodeWrapperProps) => {
  return (
      <CodeBlock language="jsx" title={title}>
        {children}
      </CodeBlock>
  );
}
