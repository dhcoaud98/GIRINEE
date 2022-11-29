import "./Spinner.css"
import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RootState } from "@react-three/fiber"
import { setRoBtnState } from "../features/rotatingbtn/RotateSlice"

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

export function Spinner() {
    // script
    const dispatch = useAppDispatch()
    // circle 로테이션 값
    let [value,setValue] = useState(-90)

    // rotating 버튼 애니메이션용 state
    let [classState, setClass] = useState(false)
    const roBtnState = useAppSelector((state) => state.rotate.roBtnState)

    let divStyle = {
        transform: `rotate(${value}deg)`,
        'transform-origin': 'center'
    }
    let svgStyle = {
        transform: 'translate(0px, 0px)' 
    }

    let timer = useInterval(() => {
        setValue(value + 5)
    }, 10)

    const navigate = useNavigate()

    // jsx
    return (
        <button className="ro-button ro-button-start" id="rotating-btn" data-v-24c32f9e="" data-v-464974f8="">
            <div className="svg-container" id="rotating-div" data-v-24c32f9e="" style={divStyle}>
                <svg width="180" height="180" className="svg" id="rotating-svg" data-v-24c32f9e="" style={svgStyle}>
                    <circle cx="90" cy="90" r="90" className="circle" id={roBtnState === 0 ? "rotating-circle" : roBtnState === 1 ? "rotating-circle-out": "rotating-circle-fade"} data-v-24c32f9e="" >
                    </circle>
                </svg>
            </div>
            <span className={roBtnState === 0 ? "label" : roBtnState === 1 ? "label-out" : "label-fade"} data-v-24c32f9e="" id="rotating-span" >Loading</span>
        </button>
    )
}