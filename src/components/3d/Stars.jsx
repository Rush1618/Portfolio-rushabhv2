import { Stars as DreiStars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';

export default function Stars() {
  const ref = useRef();
  
  // Responsive star count
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 50;
      ref.current.rotation.y -= delta / 60;
    }
  });

  return (
    <DreiStars 
      ref={ref}
      radius={100} 
      depth={50} 
      count={isMobile ? 1500 : 5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
}
