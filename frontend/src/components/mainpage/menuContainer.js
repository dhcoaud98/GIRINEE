import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial, Center, OrbitControls } from '@react-three/drei'
import { Firstamp } from './Firstamp'
import { Secondamp } from './Secondamp'
import { Spinner } from '../../widgets/Spinner'
import { dividerClasses } from '@mui/material'
import "./menuContainer.css"
import { ContactlessOutlined } from '@mui/icons-material'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useNavigate } from 'react-router-dom'
import useInterval from '../../utils/timer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setRoBtnState } from '../../features/rotatingbtn/RotateSlice'


export function MenuContainer(props) {
  let [flag, setFlag] = useState(false)
  setTimeout(() => setFlag(true), 3000)
  let [envFlag, setenvFlag] = useState(false)
  let [threshold, setThreshold] =useState(0.35)
  let [directIntensity,setDirectIntensity] =useState(2)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const directIntensity = useAppSelector((state) => state.main.directIntensity)
  

  const OnClickRoute = () => {
    dispatch(setRoBtnState(3))
    setTimeout(() => {
      setDirectIntensity(0.15)
      setThreshold(0.001)
      setenvFlag(true)},300)
    
    setTimeout(() => {
      dispatch(setRoBtnState(0))
      if (props.num === 0.65) {
        navigate('/game')
      }
      else {
        navigate('/table')
      }
      
    },3000)
  }



  return (
    <div id={flag === false ? "menu-container" : null} className='canvas-container'>
      <h1 id ="menu-h1" onClick={() => {OnClickRoute()}}>Enter</h1>
      {envFlag === true ? <Spinner/> : null}
      {flag === false ? <Spinner/> : 
      <Canvas dpr={window.decivePixelRatio} shadows camera={{ position: [0,0,5], fov: 35 }} gl={{ alpha: false }}  id={'menu-canvas'}>
        <OrbitControls enable/>
      {/* <fog attach="fog" args={['#17171b', 30, 40]} />
      <color attach="background" args={['#17171b']} /> */}
      {/* <ambientLight intensity={0.25} /> */}
        <directionalLight castShadow intensity={directIntensity} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}> 
        </directionalLight>
      <Suspense fallback={null}>
          <Center onCentered={({ container, height }) => container.scale.setScalar(3)}>
            {props.num === 0.65 ? <Firstamp position={[-1.8,1.36,0]} /> : props.num === 0.83 ? <Secondamp position={[1.4,1.5,0.3]}/> : null}
            
          </Center>
        <mesh position={[0, -props.num, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[500, 500]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={2024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="rgb(25,25,25)"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
        {envFlag === false ? <Environment preset="dawn" /> : null}
      </Suspense>
      <EffectComposer>
        <Bloom luminanceThreshold={threshold} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>}
    
    </div>
    
  )
}