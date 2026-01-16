/// <reference types="vite/client" />

// Swiper CSS module declarations
declare module 'swiper/css' {
  const content: string;
  export default content;
}

declare module 'swiper/css/effect-coverflow' {
  const content: string;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: string;
  export default content;
}

declare module 'swiper/css/navigation' {
  const content: string;
  export default content;
}

declare module 'swiper/css/autoplay' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module 'react-type-animation' {
  import { FC } from 'react'
  interface TypeAnimationProps {
    sequence: (string | number)[]
    wrapper?: keyof JSX.IntrinsicElements
    speed?: number
    repeat?: number
    cursor?: boolean
    className?: string
    style?: React.CSSProperties
  }
  export const TypeAnimation: FC<TypeAnimationProps>
}

declare module 'granim' {
  interface GranimOptions {
    element: string | HTMLCanvasElement
    direction?: 'diagonal' | 'left-right' | 'top-bottom' | 'radial' | 'custom'
    isPausedWhenNotInView?: boolean
    scrollDebounceThreshold?: number
    stateTransitionSpeed?: number
    states: {
      [key: string]: {
        gradients: string[][]
        transitionSpeed?: number
        loop?: boolean
      }
    }
  }
  
  export default class Granim {
    constructor(options: GranimOptions)
    play(): void
    pause(): void
    changeState(stateName: string): void
    changeDirection(direction: string): void
    changeBlendingMode(blendingMode: string): void
    clear(): void
    destroy(): void
  }
}
