import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Stars,
  Sparkles,
  Environment,
  OrbitControls,
  ContactShadows,
  RoundedBox,
  Box
} from '@react-three/drei';

/* ───────────────────────────────────────────────
   Procedural 3D Laptop Model
   (Zero external dependencies to prevent fetch errors)
──────────────────────────────────────────────── */
function StylizedLaptop(props) {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    // Gentle breathing effect
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group ref={group} {...props}>
      {/* Laptop Base */}
      <RoundedBox args={[3.2, 0.15, 2.4]} radius={0.05} smoothness={4} position={[0, -0.075, 0]}>
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Keyboard Bed */}
      <Box args={[2.8, 0.02, 1.2]} position={[0, 0.01, 0.3]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.8} />
      </Box>

      {/* Trackpad */}
      <Box args={[0.8, 0.02, 0.5]} position={[0, 0.01, 1.3]}>
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </Box>
      
      {/* Screen Assembly (hinged at the back) */}
      <group position={[0, 0, -1.1]}>
        {/* Tilt the screen back slightly */}
        <group rotation={[Math.PI * -0.15, 0, 0]} position={[0, 1.0, 0]}>
          {/* Lid */}
          <RoundedBox args={[3.2, 2.2, 0.1]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          
          {/* Glowing Display */}
          <Box args={[3.0, 2.0, 0.02]} position={[0, 0, 0.06]}>
            <meshStandardMaterial 
              color="#22d3ee" 
              emissive="#22d3ee" 
              emissiveIntensity={1.5} 
              toneMapped={false}
            />
          </Box>
        </group>
      </group>
    </group>
  );
}

/* ───────────────────────────────────────────────
   Floating Data Cubes
──────────────────────────────────────────────── */
function DataCubes() {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.2;
    group.current.children.forEach((child, i) => {
      child.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.1);
      child.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.1);
    });
  });

  const cubes = [
    { pos: [3, 2, -2], color: '#22d3ee', scale: 0.3 },
    { pos: [-3, 1, -1], color: '#8b5cf6', scale: 0.4 },
    { pos: [2, -1, 2], color: '#f59e0b', scale: 0.25 },
    { pos: [-2, -0.5, 3], color: '#6366f1', scale: 0.35 },
  ];

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <Box position={cube.pos} scale={cube.scale}>
            <meshStandardMaterial 
              color={cube.color} 
              emissive={cube.color} 
              emissiveIntensity={0.5} 
              wireframe 
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

/* ───────────────────────────────────────────────
   Main Scene
──────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />
      <pointLight position={[0, -5, 5]} intensity={0.8} color="#8b5cf6" />

      {/* Environment for realistic reflections */}
      <Environment preset="city" />

      {/* Background elements */}
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={80} scale={12} size={3} speed={0.4} opacity={0.6} color="#a78bfa" />

      {/* Procedural 3D Laptop */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <StylizedLaptop position={[0, -0.5, 0]} scale={[0.8, 0.8, 0.8]} rotation={[0.1, Math.PI / 6, 0]} />
      </Float>

      {/* Surrounding floating abstract geometry */}
      <DataCubes />

      {/* Fake shadow underneath */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000000" />

      {/* Camera control */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
      />
    </>
  );
}

/* ───────────────────────────────────────────────
   Exported Canvas Component
──────────────────────────────────────────────── */
const HeroScene = ({ style = {} }) => {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
