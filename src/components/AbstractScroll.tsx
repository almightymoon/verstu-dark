import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AbstractScrollProps {
  progress: any; // MotionValue<number>
}

export default function AbstractScroll({ progress }: AbstractScrollProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = progress.get();
    
    // Move group based on scroll with heavy lerping
    const targetY = (p * -15) + 7.5;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    
    const targetRotY = p * Math.PI;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    
    // Mouse interaction
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.3, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, state.mouse.x * 0.3, 0.05);
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh
            position={[
              Math.sin(i * 1.5) * 3,
              i * 2 - 8,
              Math.cos(i * 1.5) * 2
            ]}
            rotation={[Math.random(), Math.random(), Math.random()]}
          >
            <boxGeometry args={[2, 0.1, 1]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.2}
              chromaticAberration={0.02}
              anisotropy={0.1}
              distortion={0}
              clearcoat={1}
              color="#ffffff"
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
