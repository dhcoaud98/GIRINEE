import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber'
import { Logo } from './Girinlogo'
import { Firstamp } from './Firstamp'
import { Secondamp } from './Secondamp'
import { Gtwo } from './G-2'
import { PerspectiveCamera, Center, Backdrop, Float, Bounds, MeshReflectorMaterial, Reflector } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useEffect } from 'react'
import useInterval from '../../utils/timer'

// Timer Interval
// function useInterval(callback, delay) {
//     const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.
  
//     useEffect(() => {
//       savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
//     }, [callback]);
  
//     useEffect(() => {
//       function tick() {
//         savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
//       }
//       if (delay !== null) {
//         setTimeout(() => {
//           clearInterval(id)
//         }, 6240) // 만약 delay가 null이 아니라면 
//         let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
//         return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
//       }
//     }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
//   }


export function MainContainer() {
    // max 1.5
    let [whiteIntensity, setWhite] = useState(0)
    // max 2.5
    let [pointIntensity, setPoint] = useState(0)
    let timer = useInterval(() => {setWhite(whiteIntensity + 0.015, 6240)
        setPoint(pointIntensity + 0.025)}, 60, 6240)
    return (
    <Canvas shadows camera={{ position: [0, 1, 10], fov: 60 }} dpr={window.devicePixelRatio}>
      {/* <fog attach="fog" args={["white", 0, 40]} /> */}
      {/* <ambientLight intensity={0.4} /> */}
      {/* <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      <pointLight position={[-10, 0, -20]} color={localStorage.getItem('accessToken') != null ? "red" : "lightblue"} intensity={pointIntensity} />
      <pointLight position={[10, 0, -20]} color={localStorage.getItem('accessToken') != null ? "red" : "lightblue"} intensity={pointIntensity} />
      <pointLight position={[0, -10, 0]} intensity={whiteIntensity} />
      <group position={[0, -3.2, 0]} scale={[3,3,3]}>
        {/* <mesh receiveShadow castShadow>
          <boxBufferGeometry attach="geometry" args={[4, 1, 1]} />
          <meshStandardMaterial attach="material" />
        </mesh> */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0, 0]} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#151515"
            metalness={0.6}
            roughness={1}
          />
          <shadowMaterial attach="material" transparent opacity={0.4}   />
        </mesh>
        <Logo position={[-1.1, 2.2, 1.8]} />
        {/* <Firstamp position={[-1.5,0.95,0]} rotation={[0,0.4,0]}/>
        <Secondamp position={[1.5,1.0,0]} rotation={[0,-0.5,0]}/> */}
      </group>
      <EffectComposer>
        <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
    )
    
}
