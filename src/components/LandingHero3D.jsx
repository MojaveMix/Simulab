import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles, Line } from "@react-three/drei";
import * as THREE from "three";
import { computeChaosAttractor } from "../engine/mathModels";

const MICRO_PILLAR_GEO = new THREE.BoxGeometry(0.18, 1, 0.18);
const NODE_OCTA_GEO = new THREE.OctahedronGeometry(0.22, 0);
const ORBIT_SPHERE_GEO = new THREE.SphereGeometry(0.22, 24, 24);

/**
 * Undulating 3D Harmonic Wave Floor (13x13 = 169 instanced micro-pillars)
 */
function HarmonicWaveFloor({ primaryColor }) {
  const meshRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  const coords = useMemo(() => {
    const list = [];
    const size = 13;
    const half = (size - 1) / 2;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const x = (c - half) * 0.52;
        const z = (r - half) * 0.52;
        list.push({ x, z, dist: Math.hypot(x, z) });
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    colorObj.set(primaryColor);

    for (let i = 0; i < coords.length; i++) {
      const { x, z, dist } = coords[i];
      const wave = Math.sin(t * 2.4 - dist * 1.35) * 0.28;
      const h = Math.max(0.12, 0.35 + wave);
      dummy.position.set(x, -2.35 + h * 0.5, z);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, colorObj);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[MICRO_PILLAR_GEO, null, coords.length]}
    >
      <meshStandardMaterial
        roughness={0.25}
        metalness={0.6}
        transparent
        opacity={0.42}
      />
    </instancedMesh>
  );
}

/**
 * Mode 1: Sacred Torus Knot, Gyroscopic Rings & 9 Vedic Harmonic Crystal Nodes
 */
function SacredHarmonicSculpture({ primaryColor, secondaryColor, harmonicDigit = 5 }) {
  const groupRef = useRef(null);
  const torusRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const nodesGroupRef = useRef(null);

  // 9 evenly spaced sacred circle nodes + star polygon chords governed by harmonicDigit
  const { nodePositions, chordPoints } = useMemo(() => {
    const radius = 2.55;
    const nodes = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      nodes.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.35,
          Math.sin(angle) * radius
        )
      );
    }

    const pts = [];
    const step = Math.max(1, harmonicDigit % 9 || 4);
    let curr = 0;
    for (let k = 0; k <= 9; k++) {
      pts.push(nodes[curr]);
      curr = (curr + step) % 9;
    }
    return { nodePositions: nodes, chordPoints: pts };
  }, [harmonicDigit]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Subtle pointer-reactive tilt
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.25,
        0.05
      );
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.55;
      torusRef.current.rotation.y = t * 0.38;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.45;
      ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.25;
    }
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y = -t * 0.32;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.25, 0]}>
      {/* Central Luminous Torus Knot */}
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[0.92, 0.22, 128, 24, 2, 3]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.45}
          roughness={0.18}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Sacred Cage */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={secondaryColor}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Gyroscopic Sacred Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.95, 0.025, 16, 96]} />
        <meshBasicMaterial color={primaryColor} transparent opacity={0.75} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.22, 0.02, 16, 96]} />
        <meshBasicMaterial color={secondaryColor} transparent opacity={0.55} />
      </mesh>

      {/* 9 Orbiting Vedic Nodes + Star Chords */}
      <group ref={nodesGroupRef}>
        <Line
          points={chordPoints}
          color={secondaryColor}
          lineWidth={2}
          transparent
          opacity={0.75}
        />
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos} geometry={NODE_OCTA_GEO}>
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#ffffff" : primaryColor}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Mode 2: 3D Keplerian & Quantum Orbital Field
 */
function OrbitalQuantumSculpture({ primaryColor, secondaryColor }) {
  const body1Ref = useRef(null);
  const body2Ref = useRef(null);
  const body3Ref = useRef(null);
  const coreRef = useRef(null);

  const orbits = useMemo(() => {
    const buildEllipse = (rx, rz, tiltX, tiltZ) => {
      const pts = [];
      const euler = new THREE.Euler(tiltX, 0, tiltZ);
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        const v = new THREE.Vector3(Math.cos(a) * rx, 0, Math.sin(a) * rz);
        v.applyEuler(euler);
        pts.push(v);
      }
      return pts;
    };
    return [
      buildEllipse(2.5, 1.9, 0.45, 0.25),
      buildEllipse(2.3, 2.3, -0.55, -0.35),
      buildEllipse(2.7, 1.6, 0.15, -0.65),
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.06;
      coreRef.current.scale.setScalar(pulse);
    }
    const idx1 = Math.floor((t * 28) % 96);
    const idx2 = Math.floor((t * 22 + 32) % 96);
    const idx3 = Math.floor((t * 34 + 64) % 96);
    if (body1Ref.current) body1Ref.current.position.copy(orbits[0][idx1]);
    if (body2Ref.current) body2Ref.current.position.copy(orbits[1][idx2]);
    if (body3Ref.current) body3Ref.current.position.copy(orbits[2][idx3]);
  });

  return (
    <group position={[0, 0.25, 0]}>
      {/* Central Star / Nucleus */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#F59E0B"
          emissiveIntensity={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh scale={1.38}>
        <sphereGeometry args={[0.72, 24, 24]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.22}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 3 Tilted Keplerian / Quantum Orbits */}
      <Line points={orbits[0]} color={primaryColor} lineWidth={2.2} transparent opacity={0.85} />
      <Line points={orbits[1]} color={secondaryColor} lineWidth={2.2} transparent opacity={0.8} />
      <Line points={orbits[2]} color="#10B981" lineWidth={2.0} transparent opacity={0.75} />

      <mesh ref={body1Ref} geometry={ORBIT_SPHERE_GEO}>
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={body2Ref} geometry={ORBIT_SPHERE_GEO}>
        <meshBasicMaterial color={secondaryColor} />
      </mesh>
      <mesh ref={body3Ref} geometry={ORBIT_SPHERE_GEO}>
        <meshBasicMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

/**
 * Mode 3: 3D Lorenz Strange Attractor Ribbon
 */
function LorenzHeroSculpture({ primaryColor, secondaryColor }) {
  const groupRef = useRef(null);
  const head1Ref = useRef(null);
  const head2Ref = useRef(null);

  const lorenzPoints = useMemo(() => {
    const res = computeChaosAttractor({
      system: "lorenz",
      sigma: 10,
      rho: 28,
      beta: 2.667,
      steps: 1400,
    });
    return res.points.map((p) => new THREE.Vector3(p.x * 0.55, p.y * 0.55 + 0.3, p.z * 0.55));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.32;
    }
    const t = state.clock.elapsedTime;
    const i1 = Math.floor((t * 90) % lorenzPoints.length);
    const i2 = Math.floor((t * 90 + lorenzPoints.length / 2) % lorenzPoints.length);
    if (head1Ref.current && lorenzPoints[i1]) {
      head1Ref.current.position.copy(lorenzPoints[i1]);
    }
    if (head2Ref.current && lorenzPoints[i2]) {
      head2Ref.current.position.copy(lorenzPoints[i2]);
    }
  });

  return (
    <group ref={groupRef}>
      <Line
        points={lorenzPoints}
        color={primaryColor}
        lineWidth={2.4}
        transparent
        opacity={0.9}
      />
      <mesh ref={head1Ref} geometry={ORBIT_SPHERE_GEO}>
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={head2Ref} geometry={ORBIT_SPHERE_GEO}>
        <meshBasicMaterial color={secondaryColor} />
      </mesh>
    </group>
  );
}

export default function LandingHero3D({
  mode = "sacred",
  harmonicDigit = 5,
  primaryColor = "#A855F7",
  secondaryColor = "#22D3EE",
}) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 6.8], fov: 44 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05070e"]} />
      <fog attach="fog" args={["#05070e", 8, 18]} />

      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} color="#ffffff" />
      <pointLight position={[4, 4, 4]} intensity={2.2} distance={15} color={primaryColor} />
      <pointLight position={[-4, -2, -4]} intensity={1.6} distance={15} color={secondaryColor} />

      <Stars radius={55} depth={30} count={1100} factor={3} fade speed={0.7} />
      <Sparkles
        count={45}
        scale={[6, 4, 6]}
        size={2}
        speed={0.4}
        opacity={0.55}
        color={secondaryColor}
      />

      {mode === "sacred" && (
        <SacredHarmonicSculpture
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          harmonicDigit={harmonicDigit}
        />
      )}
      {mode === "orbital" && (
        <OrbitalQuantumSculpture
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
      {mode === "chaos" && (
        <LorenzHeroSculpture
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}

      <HarmonicWaveFloor primaryColor={primaryColor} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4.2}
        maxDistance={11}
        enableDamping
        dampingFactor={0.06}
      />
    </Canvas>
  );
}
