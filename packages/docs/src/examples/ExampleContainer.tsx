import React, { useState } from "react"
import CodeWrapper from "./CodeWrapper"

export interface Example {
  source: {
    ts: string
  },
  load: () => { default: React.FC }
}

export interface ExampleContainerProps {
  example: Example
}

export const ExampleContainer = ({ example }: ExampleContainerProps) => {
  const [Component] = useState(() => loadExample(example))

  return (
    <>
      <Component />
      <CodeWrapper title="App.tsx">
        {example.source.ts}
      </CodeWrapper>
    </>
  )
}

function loadExample(example: Example): React.FC {
  const ReactDOM = require('react-dom');
  const originalRender = (ReactDOM as any).render;
  (ReactDOM as any).render = () => {
    // Not rendering anything, overriding default behaviour of App examples.
  }
  
  const component = example.load().default

  ReactDOM.render = originalRender;
  return component;
}