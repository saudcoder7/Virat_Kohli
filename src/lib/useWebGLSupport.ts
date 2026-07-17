"use client";

import { useState, useEffect } from "react";

/**
 * Detects whether the device supports WebGL and can handle a 3D scene.
 * Returns true if WebGL is available and the device has reasonable GPU power.
 * Falls back to false for low-end devices.
 */
export function useWebGLSupport(): boolean {
  // Start as false — safe default, upgrades to true after client-side WebGL check.
  // This prevents Three.js from attempting to initialize before the browser confirms GPU support.
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");

      if (!gl) {
        setSupported(false);
        return;
      }

      // Check for minimum capability: decent GPU
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Detect known software renderers
        const softwareRenderers = [
          "swiftshader",
          "llvmpipe",
          "mesa",
          "software",
        ];
        const isSoftware = softwareRenderers.some((sw) =>
          renderer.toLowerCase().includes(sw)
        );
        if (isSoftware) {
          setSupported(false);
          return;
        }
      }

      // Check if we're on a very low-end mobile device
      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const memory = (navigator as { deviceMemory?: number }).deviceMemory;
      if (isMobile && memory && memory < 4) {
        setSupported(false);
        return;
      }

      setSupported(true);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
