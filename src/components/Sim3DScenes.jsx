import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Line, Sphere, Ring, Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * 1. 3D Chaos Strange Attractor Scene (Lorenz, Rossler, Thomas)
 */
function AttractorFlow({ points, animationSpeed, isPlaying, accentColor }) {
  const headRef = useRef(null);
  const trailRef = useRef(null);
  const progressRef = useRef(0);

  const linePoints = useMemo(() => {
    if (!points || points.length < 2) return [new THREE.Vector3(), new THREE.Vector3(1, 1, 1)];
    return points.map((p) => new THREE.Vector3(p.x, p.y, p.z));
  }, [points]);

  useFrame((_, delta) => {
    if (isPlaying && points.length > 2) {
      progressRef.current = (progressRef.current + delta * 140 * animationSpeed) % points.length;
    }
    const idx = Math.floor(progressRef.current);
    const pt = points[idx] || points[0];
    if (headRef.current && pt) {
      headRef.current.position.set(pt.x, pt.y, pt.z);
    }
    if (trailRef.current) {
      trailRef.current.rotation.y += delta * 0.08 * (isPlaying ? animationSpeed : 0);
    }
  });

  return (
    <group ref={trailRef}>
      <Line
        points={linePoints}
        color={accentColor || "#F43F5E"}
        lineWidth={2.2}
        transparent
        opacity={0.85}
      />
      {/* Glowing Phase Space Particle */}
      <mesh ref={headRef}>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      {/* Coordinate Reference Grid */}
      <gridHelper args={[14, 14, "#1e293b", "#0f172a"]} position={[0, -4.5, 0]} />
    </group>
  );
}

export function ChaosAttractor3DCanvas({ data, params, isPlaying }) {
  return (
    <Canvas camera={{ position: [9, 6, 11], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={["#05070e"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.4} color="#F43F5E" />
      <Stars radius={65} depth={35} count={1100} factor={3} fade speed={0.6} />
      <AttractorFlow
        points={data.points}
        animationSpeed={params.animationSpeed || 1.0}
        isPlaying={isPlaying}
        accentColor="#F43F5E"
      />
      <OrbitControls enableDamping dampingFactor={0.06} minDistance={4} maxDistance={26} />
    </Canvas>
  );
}

/**
 * 2. Keplerian 3D Orbital & Gravitational Scene
 */
function OrbitalSystemBody({ data, params, isPlaying }) {
  const planetRef = useRef(null);
  const moonGroupRef = useRef(null);
  const vectorArrowRef = useRef(null);
  const anomalyIndexRef = useRef(0);

  const orbitCurvePoints = useMemo(() => {
    if (!data.orbitPoints || data.orbitPoints.length < 2) {
      return [new THREE.Vector3(), new THREE.Vector3(1, 0, 0)];
    }
    return data.orbitPoints.map((p) => new THREE.Vector3(p.x, p.y, p.z));
  }, [data.orbitPoints]);

  // Focus offset: star is at origin (0,0,0), periapsis is at (a*(1-e), 0, 0)
  useFrame((_, delta) => {
    const pts = data.orbitPoints;
    if (!pts || pts.length < 2) return;

    if (isPlaying) {
      const currentPt = pts[Math.floor(anomalyIndexRef.current) % pts.length];
      // Angular speed scales inversely with r^2 (Kepler's 2nd Law)
      const speedMod = Math.max(0.3, Math.min(4.0, (currentPt?.v || 5) * 0.25));
      anomalyIndexRef.current =
        (anomalyIndexRef.current + delta * 28 * (params.animationSpeed || 1.0) * speedMod) %
        pts.length;
    }

    const idx = Math.floor(anomalyIndexRef.current) % pts.length;
    const pt = pts[idx];
    if (planetRef.current && pt) {
      planetRef.current.position.set(pt.x, pt.y, pt.z);
    }
    if (moonGroupRef.current && pt) {
      moonGroupRef.current.position.set(pt.x, pt.y, pt.z);
      if (isPlaying) {
        moonGroupRef.current.rotation.y += delta * 3.2 * (params.animationSpeed || 1.0);
      }
    }
    if (vectorArrowRef.current && pt) {
      const nextPt = pts[(idx + 2) % pts.length];
      vectorArrowRef.current.position.set(pt.x, pt.y, pt.z);
      vectorArrowRef.current.lookAt(nextPt.x, nextPt.y, nextPt.z);
    }
  });

  const starScale = 0.55 + Math.pow(params.starMass || 1.0, 0.35) * 0.3;

  return (
    <group>
      {/* Central Star at Focus (0,0,0) */}
      <Sphere args={[starScale, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FBBF24" toneMapped={false} />
      </Sphere>
      <Sphere args={[starScale * 1.45, 24, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.22} side={THREE.BackSide} />
      </Sphere>

      {/* Reference Ecliptic Grid */}
      <Ring args={[1.8, 8.5, 64]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.25} />
      </Ring>

      {/* 3D Elliptical Orbit Path */}
      <Line points={orbitCurvePoints} color="#38BDF8" lineWidth={2.5} transparent opacity={0.85} />

      {/* Periapsis & Apoapsis Markers */}
      {data.orbitPoints.length > 90 && (
        <>
          <group position={[data.orbitPoints[0].x, data.orbitPoints[0].y, data.orbitPoints[0].z]}>
            <Sphere args={[0.11, 12, 12]}>
              <meshBasicMaterial color="#10B981" />
            </Sphere>
            <Text position={[0, 0.4, 0]} fontSize={0.26} color="#10B981">
              Periapsis
            </Text>
          </group>
          <group position={[data.orbitPoints[90].x, data.orbitPoints[90].y, data.orbitPoints[90].z]}>
            <Sphere args={[0.11, 12, 12]}>
              <meshBasicMaterial color="#F43F5E" />
            </Sphere>
            <Text position={[0, 0.4, 0]} fontSize={0.26} color="#F43F5E">
              Apoapsis
            </Text>
          </group>
        </>
      )}

      {/* Orbiting Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#3B82F6" emissive="#1D4ED8" emissiveIntensity={0.4} roughness={0.3} />
      </mesh>

      {/* Orbiting Moon around Planet */}
      <group ref={moonGroupRef}>
        <Ring args={[0.68, 0.71, 32]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </Ring>
        <Sphere args={[0.09, 14, 14]} position={[0.7, 0, 0]}>
          <meshStandardMaterial color="#e2e8f0" />
        </Sphere>
      </group>
    </group>
  );
}

export function OrbitalGravity3DCanvas({ data, params, isPlaying }) {
  return (
    <Canvas camera={{ position: [0, 8.5, 11.5], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={["#04060c"]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 0]} intensity={3.2} distance={30} color="#FDE68A" />
      <Stars radius={80} depth={40} count={1500} factor={3.2} fade speed={0.5} />
      <OrbitalSystemBody data={data} params={params} isPlaying={isPlaying} />
      <OrbitControls enableDamping dampingFactor={0.06} minDistance={4} maxDistance={28} />
    </Canvas>
  );
}

/**
 * 3. 3D Two-Source Coherent Wave Superposition & Ripple Tank Scene
 */
const WAVE_GRID_SIZE = 28;
const WAVE_BOX_GEO = new THREE.BoxGeometry(0.28, 1, 0.28);

function WaveFieldMesh({ params, isPlaying }) {
  const instancedRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const gridCoords = useMemo(() => {
    const arr = [];
    const half = (WAVE_GRID_SIZE - 1) / 2;
    for (let r = 0; r < WAVE_GRID_SIZE; r++) {
      for (let c = 0; c < WAVE_GRID_SIZE; c++) {
        arr.push({
          x: (c - half) * 0.35,
          z: (r - half) * 0.35,
        });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    const mesh = instancedRef.current;
    if (!mesh) return;

    const t = isPlaying ? state.clock.elapsedTime : 1.0;
    const k = (2 * Math.PI) / Math.max(0.4, params.wavelength || 1.6);
    const omega = 2 * Math.PI * (params.frequency || 1.4);
    const phi = ((params.phaseShiftDeg || 0) * Math.PI) / 180;
    const sep = params.sourceSeparation ?? 3.6;
    const amp = params.amplitude ?? 0.9;
    const damp = params.damping ?? 0.04;

    const s1x = -sep / 2;
    const s2x = sep / 2;

    for (let i = 0; i < gridCoords.length; i++) {
      const { x, z } = gridCoords[i];
      const r1 = Math.hypot(x - s1x, z);
      const r2 = Math.hypot(x - s2x, z);

      const w1 = amp * Math.exp(-damp * r1) * Math.sin(k * r1 - omega * t);
      const w2 = amp * Math.exp(-damp * r2) * Math.sin(k * r2 - omega * t + phi);
      const waveSum = w1 + w2;

      dummy.position.set(x, waveSum * 0.45, z);
      dummy.scale.set(1, Math.max(0.18, 0.45 + Math.abs(waveSum) * 0.45), 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color crests cyan/emerald, troughs indigo, nodes slate
      const norm = (waveSum / (2 * Math.max(0.2, amp)) + 1) * 0.5;
      color.setHSL(0.48 + norm * 0.16, 0.85, 0.25 + Math.abs(waveSum) * 0.22);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  const sep = params.sourceSeparation ?? 3.6;

  return (
    <group>
      <instancedMesh
        ref={instancedRef}
        args={[WAVE_BOX_GEO, null, WAVE_GRID_SIZE * WAVE_GRID_SIZE]}
      >
        <meshStandardMaterial roughness={0.25} metalness={0.3} />
      </instancedMesh>

      {/* Coherent Source Markers S1 & S2 */}
      <Sphere args={[0.24, 20, 20]} position={[-sep / 2, 0.9, 0]}>
        <meshBasicMaterial color="#00F5A0" />
      </Sphere>
      <Sphere args={[0.24, 20, 20]} position={[sep / 2, 0.9, 0]}>
        <meshBasicMaterial color="#38BDF8" />
      </Sphere>
    </group>
  );
}

export function WaveInterference3DCanvas({ params, isPlaying }) {
  return (
    <Canvas camera={{ position: [0, 7.5, 9.5], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={["#05070e"]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 12, 8]} intensity={1.1} />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#00F5A0" />
      <WaveFieldMesh params={params} isPlaying={isPlaying} />
      <OrbitControls enableDamping dampingFactor={0.06} minDistance={4} maxDistance={22} />
    </Canvas>
  );
}
