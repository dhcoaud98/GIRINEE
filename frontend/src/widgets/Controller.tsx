import './Controller.css'
import { useState } from 'react'

import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'



export function Controller() {
  const [controllerDegree, setDegree] = useState(0)
  const clickLow = () => setDegree((prev) => 0)
  const clickMid = () => setDegree((prev) => 1)
  const clickHigh = () => setDegree((prev) => 2)
  
  let levelValue = "E A S Y - L E V E L"
  let levelExplanation = "쉬워요"
  if (controllerDegree === 0) {
    levelValue = 'E A S Y - L E V E L'
    levelExplanation = "연습하기 원하는 코드를 직접 선택하여 진행하세요."  
  } else if (controllerDegree === 1) {
    levelValue = 'N O R M A L - L E V E L'
    levelExplanation = "'N O R M A L - L E V E L'에서는 실제 음악에서 자주 사용되는 코드 진행을 랜덤으로"
  } else {
    levelValue = 'H A R D - L E V E L'
    levelExplanation = "어려워요"
  }

  return (
    <Grid item xs={2} component="div" sx={{ display: 'flex'}}>
      {/* 컨트롤러 */}
      <div id="level-controller" className={`degree${ controllerDegree }`}>
        <div id="level-index"></div>
      </div>

      {/* 레벨버튼 누르면 해당하는 부분으로 위의 컨트롤러가 회전 */}
      <Box component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Button id="low-level-btn" variant="text" onClick={clickLow}>
          <p className="white-text new-font">LOW</p>
        </Button>
        <Button id="mid-level-btn" variant="text" onClick={clickMid}>
          <p className="white-text new-font">MID</p>
        </Button>
        <Button id="high-level-btn" variant="text" onClick={clickHigh}>
          <p className="white-text new-font">HIGH</p>
        </Button>
      </Box>
    </Grid>
  )
}

export default Controller