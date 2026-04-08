import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Base rotation
    sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, time * 0.2 + state.mouse.y * 0.5, 0.1);
    sphereRef.current.rotation.y = THREE.MathUtils.lerp(sphereRef.current.rotation.y, time * 0.3 + state.mouse.x * 0.5, 0.1);
    
    // Subtle position shift based on mouse
    sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, state.mouse.x * 0.5, 0.1);
    sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, state.mouse.y * 0.5, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.2}>
        <MeshDistortMaterial
          color="#111111"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#ffffff" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        <AnimatedSphere />
        <Particles />
      </Canvas>
    </div>
  );
}
