import "./MainBtn.css"
import { useState } from 'react'


export function MainBtn() {
    // script
    let [opacity , setOpacity] = useState(1)

    // jsx
    return (
        <a className="go-main-button-start loader-start" onMouseOver={() => setOpacity(0)} onMouseOut={() => setOpacity(1)} id={opacity===0? "":""} href="#">
          <div className="go-main-button-top" id={opacity === 0 ? "transform0": "transform1"}></div>
          <div className="go-main-button-middle" id={opacity === 0 ? "transform0": "transform1"}></div>
          <div className="go-main-button-bottom" id={opacity === 0 ? "transform2": ''}></div>
          <div className="inner" id={opacity === 0? "transform3":''}></div>
        </a>
    )
}

export default MainBtn;