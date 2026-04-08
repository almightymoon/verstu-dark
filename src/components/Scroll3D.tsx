import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, TorusKnot, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Scroll3DProps {
  progress: any; // MotionValue<number>
}

export default function Scroll3D({ progress }: Scroll3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const p = progress.get(); // 0 to 1
    
    // Rotation based on scroll
    meshRef.current.rotation.x = p * Math.PI * 2;
    meshRef.current.rotation.y = p * Math.PI;
    
    // Position based on scroll
    const targetY = (p * -12) + 6;
    const targetX = Math.sin(p * Math.PI) * 2;
    
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + state.mouse.y * 0.5, 0.1);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + state.mouse.x * 0.5, 0.1);
    
    // Subtle tilt based on mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.2, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.2, 0.1);
    
    // Floating effect
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <TorusKnot ref={meshRef} args={[1.2, 0.4, 256, 64]}>
          <MeshDistortMaterial
            color="#ffffff"
            speed={2}
            distort={0.2}
            radius={1}
            metalness={1}
            roughness={0.05}
            transparent
            opacity={0.8}
          />
        </TorusKnot>
      </Float>
      
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#ffffff" />
    </group>
  );
}
