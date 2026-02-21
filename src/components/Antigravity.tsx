/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleData {
  t: number;
  speed: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  randomRadiusOffset: number;
  color: THREE.Color;
}

const globalMouse = { x: 0, y: 0 };

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#BB8FCE', '#F1948A', '#85C1E9', '#82E0AA', '#E8A87C', '#D7BDE2'];

interface AntigravityInnerProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  autoAnimate?: boolean;
  rotationSpeed?: number;
  depthFactor?: number;
  fieldStrength?: number;
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron';
}

const AntigravityInner = ({
  count = 400,
  magnetRadius = 15,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 1.8,
  lerpSpeed = 0.06,
  autoAnimate = true,
  rotationSpeed = 0.05,
  depthFactor = 0.6,
  fieldStrength = 8,
  particleShape = 'capsule',
}: AntigravityInnerProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useRef<Float32Array>();

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp: ParticleData[] = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width * 1.5;
      const y = (Math.random() - 0.5) * height * 1.5;
      const z = (Math.random() - 0.5) * 15;

      temp.push({
        t: Math.random() * 100,
        speed: 0.005 + Math.random() / 300,
        mx: x, my: y, mz: z,
        cx: x, cy: y, cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
        color: new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]),
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  // Set per-instance colors
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    colorArray.current = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      colorArray.current![i * 3] = p.color.r;
      colorArray.current![i * 3 + 1] = p.color.g;
      colorArray.current![i * 3 + 2] = p.color.b;
    });
    mesh.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray.current, 3));
  }, [particles, count]);

  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v } = state;
    const mx = globalMouse.x;
    const my = globalMouse.y;

    const mouseDist = Math.sqrt(
      Math.pow(mx - lastMousePos.current.x, 2) + Math.pow(my - lastMousePos.current.y, 2)
    );

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: mx, y: my };
    }

    let destX = (mx * v.width) / 2;
    let destY = (my * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 3000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.15) * (v.width / 6);
      destY = Math.cos(time * 0.2) * (v.height / 6);
    }

    const smoothFactor = 0.02;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      const { speed, mx: pmx, my: pmy, mz: pmz, cz, randomRadiusOffset } = particle;
      particle.t += speed / 4;
      const t = particle.t;
      const elapsed = state.clock.getElapsedTime();
      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = pmx - projectedTargetX;
      const dy = pmy - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const targetPos = { x: pmx, y: pmy, z: pmz * depthFactor };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z = pmz * depthFactor + Math.sin(t) * waveAmplitude * depthFactor;
      }

      // Slow, dreamy lerp for floating feel
      const currentLerp = lerpSpeed;
      particle.cx += (targetPos.x - particle.cx) * currentLerp;
      particle.cy += (targetPos.y - particle.cy) * currentLerp;
      particle.cz += (targetPos.z - particle.cz) * currentLerp;

      // Add gentle idle floating bob
      const floatX = Math.sin(elapsed * 0.3 + i * 0.7) * 0.15;
      const floatY = Math.cos(elapsed * 0.25 + i * 0.5) * 0.2;

      dummy.position.set(particle.cx + floatX, particle.cy + floatY, particle.cz);
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
      );
      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      let scaleFactor = 1 - distFromRing / 15;
      scaleFactor = Math.max(0.03, Math.min(1, scaleFactor));

      const finalScale = scaleFactor * (0.7 + Math.sin(t * 2) * 0.3) * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.04, 0.25, 4, 8]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.12, 8, 8]} />}
      {particleShape === 'box' && <boxGeometry args={[0.15, 0.15, 0.15]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.15]} />}
      <meshBasicMaterial vertexColors transparent opacity={0.85} />
    </instancedMesh>
  );
};

interface AntigravityProps extends AntigravityInnerProps {
  className?: string;
}

const Antigravity = ({ className, ...props }: AntigravityProps) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <AntigravityInner {...props} />
      </Canvas>
    </div>
  );
};

export default Antigravity;
