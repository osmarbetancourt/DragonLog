declare module "vanta/dist/vanta.fog.min" {
  import type * as THREE from "three";

  interface VantaInstance {
    destroy: () => void;
  }

  interface VantaFogOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    speed?: number;
    zoom?: number;
  }

  export default function VantaFog(options: VantaFogOptions): VantaInstance;
}
