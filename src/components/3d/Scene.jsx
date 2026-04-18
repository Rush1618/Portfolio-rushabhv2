import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Stars from './Stars';
import FloatingOrbs from './FloatingOrbs';
// import NebulaCloud from './NebulaCloud'; // Will implement next

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 bg-bg-primary">
      <Canvas 
        camera={{ fov: 75, position: [0, 0, 5] }} 
        dpr={[1, 1.2]} 
        gl={{ 
          antialias: false, 
          stencil: false, 
          depth: true,
          powerPreference: "high-performance" 
        }}
      >
        <Suspense fallback={null}>
          <Stars />
          <FloatingOrbs />
        </Suspense>
        <ambientLight intensity={0.3} />
        <pointLight color="#00d4ff" intensity={1.5} position={[10, 10, 10]} />
        <pointLight color="#7c3aed" intensity={1.0} position={[-10, -10, -10]} />
      </Canvas>
    </div>
  );
}
