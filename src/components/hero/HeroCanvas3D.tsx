"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/* Full-bleed viewport card in 3D space                                        */
/* -------------------------------------------------------------------------- */

interface FullBleedCardProps {
  scrollProgress: number;
}

function FullBleedCard({ scrollProgress }: FullBleedCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Sharp foreground composite texture
  const sharpTexture = useTexture("/images/hero-composite.png");
  sharpTexture.colorSpace = THREE.SRGBColorSpace;

  // React states for dynamically generated canvas textures
  const [blurredTexture, setBlurredTexture] = useState<THREE.Texture | null>(null);
  const [blendTexture, setBlendTexture] = useState<THREE.Texture | null>(null);

  // Generate canvas-based textures on client side
  useEffect(() => {
    // 1. Seamless blending gradient texture
    const blendCanvas = document.createElement("canvas");
    blendCanvas.width = 128;
    blendCanvas.height = 16;
    const blendCtx = blendCanvas.getContext("2d");
    if (blendCtx) {
      const grad = blendCtx.createLinearGradient(0, 0, blendCanvas.width, 0);
      grad.addColorStop(0, "#02060e");
      grad.addColorStop(0.4, "rgba(2, 6, 14, 0.7)");
      grad.addColorStop(1, "rgba(2, 6, 14, 0)");
      blendCtx.fillStyle = grad;
      blendCtx.fillRect(0, 0, blendCanvas.width, blendCanvas.height);
    }
    const blendTex = new THREE.CanvasTexture(blendCanvas);
    blendTex.colorSpace = THREE.SRGBColorSpace;
    setBlendTexture(blendTex);

    // 2. Dynamic heavily blurred duplicate backdrop texture
    const img = new Image();
    img.src = "/images/hero-composite.png";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const blurCanvas = document.createElement("canvas");
      blurCanvas.width = img.width / 4;
      blurCanvas.height = img.height / 4;
      const blurCtx = blurCanvas.getContext("2d");
      if (blurCtx) {
        blurCtx.filter = "blur(14px) brightness(0.28)";
        blurCtx.drawImage(img, 0, 0, blurCanvas.width, blurCanvas.height);
      }
      const blurTex = new THREE.CanvasTexture(blurCanvas);
      blurTex.colorSpace = THREE.SRGBColorSpace;
      setBlurredTexture(blurTex);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const t = scrollProgress;

    // Rotation: subtle premium tilt on scroll
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (t - 0.5) * 0.18,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      (t - 0.5) * 0.06,
      0.06
    );

    // Subtle depth push
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      -t * 0.3,
      0.06
    );
  });

  // Scale planes to fill the viewport
  const planeW = viewport.width * 1.3;
  const planeH = viewport.height * 1.3;
  const fgW = planeW * 0.56; // foreground image takes right ~56%

  return (
    <group ref={groupRef}>
      {/* ─── 1. FULL-BLEED BACKGROUND: blurred/darkened image ─── */}
      {blurredTexture ? (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[planeW, planeH, 1, 1]} />
          <meshBasicMaterial
            map={blurredTexture}
            transparent
            opacity={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>
      ) : (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[planeW, planeH, 1, 1]} />
          <meshBasicMaterial color="#02060e" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* ─── 2. FOREGROUND: Sharp image, weighted right ─── */}
      <mesh position={[planeW * 0.22, 0, 0.005]}>
        <planeGeometry args={[fgW, planeH, 1, 1]} />
        <meshStandardMaterial
          map={sharpTexture}
          transparent
          opacity={0.98}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* ─── 3. EDGE BLENDING: dissolves the sharp left edge ─── */}
      {blendTexture && (
        <mesh position={[-planeW * 0.06, 0, 0.01]}>
          <planeGeometry args={[planeW * 0.2, planeH, 1, 1]} />
          <meshBasicMaterial
            map={blendTexture}
            transparent
            opacity={0.9}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Subtle dust particles — warm gray, very sparse                              */
/* -------------------------------------------------------------------------- */

function DustParticles() {
  const count = 50;
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      posAttr.array[ix + 1] += Math.sin(time * 0.15 + i) * 0.0008;
      posAttr.array[ix] += Math.cos(time * 0.1 + i * 0.4) * 0.0006;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#b0c4de"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/* Camera controller                                                           */
/* -------------------------------------------------------------------------- */

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 4.2 + scrollProgress * 0.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      scrollProgress * 0.1,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/* Loading fallback                                                            */
/* -------------------------------------------------------------------------- */

function SceneLoader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#b0c4de" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* Main 3D Canvas                                                              */
/* -------------------------------------------------------------------------- */

interface HeroCanvas3DProps {
  scrollProgress: number;
}

export default function HeroCanvas3D({ scrollProgress }: HeroCanvas3DProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<SceneLoader />}>
          {/* Studio-like dramatic blue/white lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 4, 6]}
            intensity={0.6}
            color="#e0f0ff"
          />
          <directionalLight
            position={[-5, 3, 4]}
            intensity={0.4}
            color="#0f294f"
          />

          <FullBleedCard scrollProgress={scrollProgress} />
          <DustParticles />
          <CameraController scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
