import React, { useState } from "react"
import CodeWrapper from "./CodeWrapper"

export interface Example {
  source: {
    ts: string
  },
  name: string,
  load: () => { default: React.FC }
}

export interface ExampleContainerProps {
  example: Example
}

export const ExampleContainer = ({ example }: ExampleContainerProps) => {
  const [Component] = useState(() => loadExample(example))

  return (
    <>
      <div style={{borderRadius: 16, border: '1px solid rgb(190, 195, 201)', padding: 32}}>
        <Component />
      </div>
      <div style={{marginTop: 24, marginBottom: 24}}/>
      <CodeWrapper title="App.tsx">
        {example.source.ts}
      </CodeWrapper>
    </>
  )
}

/**
 * Loads the example and returns the component that will render the example app.
 * It's either the JSX passed to `ReactDOM.render` or otherwise the default export of the module.
 * This function hooks the `ReactDOM.render` so we can use it in examples and not crash the docs app.
 * Crash happens because the example tries to render into a '#root` component, which is not immediately available,
 * and could be repeated if there is more than one example in a mdx file.
 * 
 * @param example Result of importing the example script using `example-loader.js
 * @returns A renderable component
 */
function loadExample(example: Example): React.FC {
  const ReactDOM = require('react-dom');

  const originalRender = (ReactDOM as any).render;
  let renderJsx = undefined;
  (ReactDOM as any).render = (jsx: any) => {
    renderJsx = jsx;
    // Not rendering anything, overriding default behaviour of App examples.
  }
  const exports = example.load()
  const component = renderJsx ? () => renderJsx : exports.default
  ReactDOM.render = originalRender;
  
  return component;
}