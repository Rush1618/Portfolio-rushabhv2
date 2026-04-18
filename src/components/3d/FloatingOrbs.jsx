import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ color, position, scale, edgeColor }) {
  const meshRef = useRef();

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={edgeColor}
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingOrbs() {
  const orbs = useMemo(() => [
    { id: 1, pos: [-4, 2, -5], scale: 1.5, color: '#00d4ff', edge: '#00d4ff' },
    { id: 2, pos: [5, -3, -8], scale: 2.0, color: '#7c3aed', edge: '#7c3aed' },
    { id: 3, pos: [-6, -4, -10], scale: 1.8, color: '#040812', edge: '#00d4ff' },
    { id: 4, pos: [6, 4, -15], scale: 3.0, color: '#040812', edge: '#7c3aed' },
    { id: 5, pos: [0, -6, -6], scale: 1.2, color: '#00d4ff', edge: '#040812' },
  ], []);

  const groupRef = useRef();

  useFrame((state) => {
    // Subtle overall rotation based on mouse or time
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map(orb => (
        <Orb 
          key={orb.id} 
          position={orb.pos} 
          scale={orb.scale} 
          color={orb.color} 
          edgeColor={orb.edge} 
        />
      ))}
    </group>
  );
}
