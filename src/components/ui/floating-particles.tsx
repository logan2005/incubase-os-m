"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Sparse Floating Particles with subtle connections ─── */
function Particles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const connectionDistance = 3.2;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, [count]);

  const maxLines = count * 3;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    const posAttr = pointsRef.current.geometry.getAttribute("position");
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(arr[i * 3]) > 12) velocities[i * 3] *= -1;
      if (Math.abs(arr[i * 3 + 1]) > 12) velocities[i * 3 + 1] *= -1;
      if (Math.abs(arr[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Sparse connections — only nearby pairs
    let lineIdx = 0;
    for (let i = 0; i < count && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.15;

          linePositions[lineIdx * 6] = arr[i * 3];
          linePositions[lineIdx * 6 + 1] = arr[i * 3 + 1];
          linePositions[lineIdx * 6 + 2] = arr[i * 3 + 2];
          linePositions[lineIdx * 6 + 3] = arr[j * 3];
          linePositions[lineIdx * 6 + 4] = arr[j * 3 + 1];
          linePositions[lineIdx * 6 + 5] = arr[j * 3 + 2];

          lineColors[lineIdx * 6] = 0.08 * alpha * 6;
          lineColors[lineIdx * 6 + 1] = 0.72 * alpha * 6;
          lineColors[lineIdx * 6 + 2] = 0.65 * alpha * 6;
          lineColors[lineIdx * 6 + 3] = 0.08 * alpha * 6;
          lineColors[lineIdx * 6 + 4] = 0.72 * alpha * 6;
          lineColors[lineIdx * 6 + 5] = 0.65 * alpha * 6;

          lineIdx++;
        }
      }
    }

    const linePosAttr = linesRef.current.geometry.getAttribute("position");
    const lineColAttr = linesRef.current.geometry.getAttribute("color");
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
  });

  return (
    <>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.05}
          color="#14B8A6"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

/* ─── Gentle Wireframe Globe ─── */
function FloatingMesh() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    mesh.current.rotation.y = t * 0.15;
    mesh.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#0D6B6E"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

/* ─── Breathing Distort Blob ─── */
function DistortBlob() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.1;
    mesh.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={mesh} position={[3, -1, -2]} scale={1.5}>
      <icosahedronGeometry args={[1, 8]} />
      <meshStandardMaterial
        color="#0D6B6E"
        transparent
        opacity={0.08}
        roughness={0.5}
        metalness={0.3}
      />
    </mesh>
  );
}

/* ─── Export ─── */
export function FloatingParticles({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className ?? ""}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <Particles />
        <FloatingMesh />
        <DistortBlob />
      </Canvas>
    </div>
  );
}
