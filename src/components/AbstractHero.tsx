import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Box } from '@react-three/drei';
import * as THREE from 'three';

function GlassShard({ position, rotation, scale }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Base rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
    
    // Floating motion
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
    
    // Mouse parallax (Depth-dependent for a true parallax feel)
    // Shards closer to the camera (higher Z) move more than those further away
    const depthFactor = (position[2] + 5) / 10; // Normalized depth 0 to 1
    const parallaxIntensity = 0.5 + depthFactor * 1.5; // Multiplier between 0.5 and 2.0
    
    const targetX = position[0] + state.mouse.x * parallaxIntensity;
    const targetY = position[1] + Math.sin(time + position[0]) * 0.1 + state.mouse.y * parallaxIntensity * 0.5;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </Box>
    </Float>
  );
}

export default function AbstractHero() {
  const shards = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: [Math.random() * 0.5 + 0.2, Math.random() * 2 + 0.5, Math.random() * 0.1 + 0.05],
    }));
  }, []);

  return (
    <group>
      {shards.map((props, i) => (
        <GlassShard key={i} {...props} />
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}
