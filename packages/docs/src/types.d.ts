/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />

// Copied from @docusaurus/theme-classic/src/theme-classic.d.ts
// For some reason TSC could not pick it up automatically.
declare module '@theme/CodeBlock' {
  import type {ReactElement} from 'react';

  export interface Props {
    readonly children: string | ReactElement;
    readonly className?: string;
    readonly metastring?: string;
    readonly title?: string;
    readonly language?: string;
  }

  export default function CodeBlock(props: Props): JSX.Element;
}
