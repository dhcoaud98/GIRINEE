// Systems
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import axios from 'axios'
import Swal from 'sweetalert2'

// Other components
import useRecorder from "./useRecorder"
import { setCntChord } from '../../features/chordgame/GameSlice'

// MUI
import { InputLabel, FormControl, Stack, Button, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import StopIcon from '@mui/icons-material/Stop';
import MicIcon from '@mui/icons-material/Mic';
import { createTheme, ThemeProvider } from '@mui/material/styles'

// -----------------------------------------------------------------------------------------------------

export function LowLevelController() {
    // script
    const guitarChords = ['C', 'Cm', 'D', 'Dm', 'E', 'Em', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'Bm']
    
    // 버튼 눌렀을 때 해당 코드 연습 화면으로 변경
    // const [cntChord, setCntChord] = useState('C_chord')
    const cntChord = useAppSelector((state)=>state.game.cntChord)
    const dispatch = useAppDispatch()
    const showChord = (event: SelectChangeEvent) => {
      dispatch(setCntChord(event.target.value as string))
    }

    // 녹음이 되었는지 확인하는 플래그
    const [recordedFlag, setRecoredFlag] = useState(false)

    // 녹음에 필요한 것
    const [audioURL, isRecording, startRecording, stopRecording]:any[] = useRecorder()

    // MUI select 테마 변경
    const theme = createTheme({
      palette: {
        primary: {
          main: '#fff',          
        },
      },
    })

    // 엑세스 토큰 정보
    const accessToken = window.localStorage.getItem('accessToken')

    // 녹음시작
    const startRecordingNFlag = () => {
      startRecording()
      setRecoredFlag((prev) => true)
    }

    // 녹음파일 채점하기
    const checkRecord = () => {
      // axios body에 담을 멀티파트 폼 데이터 생성
      const data = new FormData()

      // file과 chord 추가
      data.append('file', audioURL, 'audioName')
      data.append('chord', cntChord)

      // Axios
      axios.post('https://j7a202.p.ssafy.io/api/record/practice', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: 'Correct Chord!',
              text: '코드가 정확합니다.',
              icon: 'success',
              confirmButtonText: '확인',
              confirmButtonColor: '#777981'
            })
          } else {
            Swal.fire({
              title: 'Wrong Chord...',
              html: '코드가 정확하지 않습니다.<br/>다음 사항들을 체크해보세요! <br/> 1. 주변 잡음이 없는지 체크해주세요<br/> 2. 운지표대로 맞게 눌렀는지 체크해주세요<br/>3. 기타줄을 확실하게 눌렀는지 확인해주세요',
              icon: 'error',
              confirmButtonText: '확인',
              confirmButtonColor: '#777981'
            })
          }
        })
        .catch((error)=> {
          // console.log(error)
        })
    }

    // JSX
    return (
      <Stack my={5} spacing={4} alignItems="center">
        {/* 셀렉트 박스(코드 선택) */}
        <div className="selectBox justify-content-center">
          <p className="white-text" style={{margin:0}}>SELECT CHORD</p>
          <ThemeProvider theme={theme}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel variant="standard" id="chord-select-label"></InputLabel>
              <Select
                placeholder='Select Chord'
                labelId="chord-select-label"
                id="chord-select"
                value={cntChord}
                // label="Chord"
                onChange={showChord}          
              >
                {guitarChords.map((chord, idx) => (
                  <MenuItem key={idx} value={chord}>{chord}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>
        
        {/* 코드 관련 */}
        <Stack id="chord-box" alignItems="center" spacing={5}>
          {/* 녹음버튼 */}
          <Stack direction="row" spacing={5}>
            {/* 녹음 시작 */}
            <Stack>
              <button id="record-btn" onClick={startRecordingNFlag} disabled={isRecording}>
                <MicIcon id="record-icon" fontSize="large"/>
              </button>
            </Stack>

            {/* 녹음 정지 */}
            <Stack>
              <button id="stop-btn" onClick={stopRecording} disabled={!isRecording}>
                <StopIcon id="stop-icon" fontSize="large"/>
              </button>
            </Stack>

          </Stack>

          {/* 녹음 파일 보내기 */}
          <ThemeProvider theme={theme}>
            <Button id="easy-check-btn" variant="outlined" className="white-text" onClick={checkRecord} disabled={isRecording || recordedFlag === false}>
            채 점 하 기</Button>
          </ThemeProvider>
        </Stack>
      </Stack>
    )
}