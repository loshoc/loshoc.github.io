import React, { useRef, useEffect, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import FloatingPanel from './FloatingPanel'; // Make sure to import the FloatingPanel component

// Custom shader material
const GradientShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    varying vec2 vUv;

    vec3 colorA = vec3(0.03137, 0.48235, 0.57255); // #087B92
    vec3 colorB = vec3(0.40000, 0.69412, 0.50196); // #66B180
    vec3 colorC = vec3(0.95294, 0.83922, 0.01176); // #F3D603
    vec3 colorD = vec3(1.00000, 0.62353, 0.21961); // #FF9F38
    vec3 colorE = vec3(0.95294, 0.36863, 0.31765); // #F35E51
    vec3 colorF = vec3(0.49804, 0.42353, 0.68627); // #7F6CAF
    vec3 colorG = vec3(0.40392, 0.52157, 0.81961); // #6785D1
    vec3 colorH = vec3(0.49412, 0.71373, 0.86667); // #7EB6DD

    vec3 getGradientColor(float t) {
      if (t < 0.1429) return mix(colorA, colorB, t * 7.0);
      if (t < 0.2858) return mix(colorB, colorC, (t - 0.1429) * 7.0);
      if (t < 0.4287) return mix(colorC, colorD, (t - 0.2858) * 7.0);
      if (t < 0.5716) return mix(colorD, colorE, (t - 0.4287) * 7.0);
      if (t < 0.7145) return mix(colorE, colorF, (t - 0.5716) * 7.0);
      if (t < 0.8574) return mix(colorF, colorG, (t - 0.7145) * 7.0);
      return mix(colorG, colorH, (t - 0.8574) * 7.0);
    }

    void main() {
      vec3 color = getGradientColor(vUv.y);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ GradientShaderMaterial });

const Model = () => {
  const { scene } = useGLTF('/assets/kiwi.glb');
  const modelRef = useRef();
  const gradientMaterial = useRef();
  const orangeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFF9F38,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name.toLowerCase().includes('sphere')) {
            child.material = orangeMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          } else {
            child.material = gradientMaterial.current;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (gradientMaterial.current) {
      gradientMaterial.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <group ref={modelRef} scale={0.5} position={[0, 0.5, 0]}> {/* Move the model up by 1 unit */}
      <gradientShaderMaterial ref={gradientMaterial} />
      <primitive object={scene} />
    </group>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);

  return null;
};

const MouseRotation = ({ mouseRef }) => {
  const { scene } = useThree();

  useFrame(() => {
    if (scene) {
      scene.rotation.y = mouseRef.current.x * Math.PI / 12;
      // Invert the vertical rotation
      scene.rotation.x = -mouseRef.current.y * Math.PI / 12;
    }
  });

  return null;
};

const ThreeModel = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [, forceRender] = useState();

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Force a re-render after a short delay to ensure proper initialization
    const timer = setTimeout(() => forceRender({}), 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', // Add this to allow absolute positioning of children
    }}>
      <Canvas 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <CameraController />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model />
        <MouseRotation mouseRef={mouseRef} />
      </Canvas>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none', // This allows interactions with the 3D model underneath
      }}>
        <FloatingPanel />
      </div>
    </div>
  );
};

export default ThreeModel;