import React from 'react';
import ReactDOM from 'react-dom';

const originalRender: ReactDOM.Renderer = ReactDOM.render.bind(ReactDOM);
(ReactDOM as any).render = () => {
  // Not rendering anything, overriding default behaviour of App examples.
}
export interface SetupResult {
  render: (Component: any, root: string) => void
}

export const render = (Component, root) => {
  const intervalId = setInterval(() => {
    const rootElement = document.getElementById(root);
    if (rootElement) {
      clearInterval(intervalId);
      originalRender(<Component />, rootElement);
    }
  }, 200)
  return null;
}

export default render;
