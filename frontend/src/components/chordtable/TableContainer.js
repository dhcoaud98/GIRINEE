import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial, Center, OrbitControls, Sparkles } from '@react-three/drei'
import { Spinner } from '../../widgets/Spinner'
import { dividerClasses } from '@mui/material'
import { ContactlessOutlined } from '@mui/icons-material'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useNavigate } from 'react-router-dom'
import useInterval from '../../utils/timer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

// redux
import { setRoBtnState } from '../../features/rotatingbtn/RotateSlice'

// three.Js
import { C } from './C'
import { Firstamp } from '../mainpage/Firstamp'
import { Cm } from './Cm'
import { D } from './D'
import { Dm } from './Dm'
import { E } from './E'
import { Em } from './Em'
import { F } from './F'
import { Fm } from './Fm'
import { G } from './G'
import { Gm } from './Gm'
import { A } from './A'
import { Am } from './Am'
import { B } from './B'
import { Bm } from './Bm'


export function TableContainer(props) {

  const chordColor = useAppSelector((state) => state.chord.chordColor)

  const cntChord = useAppSelector((state) => state.game.cntChord)
  
  return (
    <div className='canvas-container'>
      <Canvas dpr={window.decivePixelRatio} shadows camera={{ position: [0,0,5], fov: 35 }} gl={{ alpha: false }}  id={'menu-canvas'}>
        <directionalLight castShadow intensity={1.2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}> 
        </directionalLight>
      <Suspense fallback={null}>
          
        <Center onCentered={({ container, height }) => container.scale.setScalar(1)}>
        {cntChord ==='C' ? <C position={[-0.6,-0.16,0]} clr={chordColor}/> : cntChord ==='Cm' ? <Cm position={[-0.6,-0.16,0]} clr={chordColor}/> :
                                                      cntChord ==='D' ? <D position={[-0.6,-0.16,0]} clr={chordColor}/> : cntChord ==='Dm' ? <Dm position={[-0.6,-0.16,0]} clr={chordColor}/> :
                                                      cntChord ==='E' ? <E position={[-0.6,-0.16,0]} clr={chordColor}/> : cntChord ==='Em' ? <Em position={[-0.6,-0.16,0]} clr={chordColor}/> :
                                                      cntChord ==='F' ? <F position={[-0.6,-0.16,0]} clr={chordColor}/> : cntChord ==='Fm' ? <Fm position={[-0.6,-0.16,0]} clr={chordColor}/> :
                                                      cntChord ==='G' ? <G position={[-0.6,-0.16,0]} clr={chordColor}/> : cntChord ==='Gm' ? <Gm position={[-0.6,-0.16,0]} clr={chordColor}/> :
                                                      cntChord ==='A' ? <A position={[-0.6,-0.16,0]} clr={chordColor}/> : cntChord ==='Am' ? <Am position={[-0.6,-0.16,0]} clr={chordColor}/> :
                                                      cntChord ==='B' ? <B position={[-0.6,-0.16,0]} clr={chordColor}/> : <Bm position={[-0.6,-0.16,0]}/>}
        </Center>
        <Sparkles count={100} scale={8} size={2.5} speed={0.4} color={chordColor} />

        <mesh position={[0, -0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[500000, 500000]} />
          <MeshReflectorMaterial
            blur={[200, 100]}
            resolution={2024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.55}
            color="rgb(25,25,25)"
            metalness={0.6}
            roughness={1}
          />
        </mesh>

      </Suspense>
      {/* <Environment preset ="dawn" /> */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.01} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
    
    </div>
    
  )
}