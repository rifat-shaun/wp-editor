/// <reference types="vite/client" />

// SVG Icons plugin
declare module "virtual:svg-icons-register" {
  const register: () => void;
  export default register;
}

// CSS inline imports
declare module "*.css?inline" {
  const content: string;
  export default content;
}