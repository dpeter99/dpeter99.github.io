declare module '*.scss?lit' {
  import { CSSResult } from 'lit';
  const css: CSSResult;
  export default css;
}

interface IconifyIcon {
  body: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}