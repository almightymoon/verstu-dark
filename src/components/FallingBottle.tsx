import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FallingBottleProps {
  progress: any; // MotionValue<number>
}

export default function FallingBottle({ progress }: FallingBottleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bottleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !bottleRef.current) return;
    
    const p = progress.get(); // 0 to 1
    
    // Falling logic: moves from top to bottom
    // We'll map 0-1 to a Y range (e.g., 8 to -8)
    groupRef.current.position.y = (p * -20) + 10;
    
    // Rotation logic: spins more as it falls
    bottleRef.current.rotation.z = p * Math.PI * 4;
    bottleRef.current.rotation.y = p * Math.PI * 2;
    
    // Horizontal sway
    groupRef.current.position.x = Math.sin(p * Math.PI * 3) * 2;
    
    // Subtle floating
    const time = state.clock.getElapsedTime();
    bottleRef.current.position.y = Math.sin(time * 2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <group ref={bottleRef}>
        {/* Simple Bottle Shape */}
        {/* Body */}
        <Cylinder args={[0.5, 0.5, 2, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.9} 
            roughness={0.1} 
            transmission={0.5} 
            thickness={1}
            envMapIntensity={2}
          />
        </Cylinder>
        {/* Neck */}
        <Cylinder args={[0.2, 0.5, 0.5, 32]} position={[0, 1.25, 0]}>
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.9} 
            roughness={0.1} 
            transmission={0.5} 
            thickness={1}
          />
        </Cylinder>
        {/* Cap */}
        <Cylinder args={[0.22, 0.22, 0.2, 32]} position={[0, 1.55, 0]}>
          <meshStandardMaterial color="#333333" metalness={1} roughness={0.2} />
        </Cylinder>
      </group>
      
      {/* Dynamic Lights following the bottle */}
      <pointLight position={[2, 2, 2]} intensity={1} color="#ffffff" />
      <pointLight position={[-2, -2, -2]} intensity={0.5} color="#ffffff" />
    </group>
  );
}
