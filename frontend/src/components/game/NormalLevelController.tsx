// Systems
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import axios from 'axios'
import Swal from 'sweetalert2'

// Other Component 
import useRecorder from "./useRecorder"
import { setSecond, setCountDownNumber, setCntChord } from '../../features/chordgame/GameSlice'

// Material UI
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Stack } from '@mui/system'

// -----------------------------------------------------------------------------------------------------

export function NormalLevelController() {
    // script
    // 준비된 기타 코드셋 5개
    const guitarChordSets = [['C', 'G', 'Am', 'F'], ['D', 'A', 'E', 'A'], ['Em', 'C', 'D', 'G'],['C', 'D', 'Em', 'Bm'],['G', 'D', 'Em', 'G']]

    const [whichSet, setWhichSet] = useState(['','','',''])

    // 녹음이 되었는지 확인하는 플래그
    const [recordedFlag, setRecoredFlag] = useState(false)

    // 녹음에 필요한 정보들
    let [audioURL, isRecording, startRecording, stopRecording]:any[] = useRecorder()

    // 디스패치로 사용자가 슬라이더로 선택하는 시간 초 변경, 설정된 초 가져오기
    const chordSecond:number = useAppSelector((state) => state.game.chordSecond
    )
    const dispatch = useAppDispatch()
    
    const theme = createTheme({
      palette: {
        primary: {
          main: '#fff',          
        },
      },
    })   

    // 버튼 눌렀을 때 해당 코드 연습 화면으로 변경
    let cntIdx = -2

    const startGame = () => {
      const randomIdx = Math.floor(Math.random() * 5)
      const cntChordset = guitarChordSets[randomIdx]

      cntIdx++

      function plusIdx() {
          startRecording()
          setRecoredFlag((prev) => true)
          if (cntIdx === -1) {
            cntIdx++
            dispatch(setCntChord(cntChordset[cntIdx] as string))
          }
        }

      function flipChord() {setInterval(function() {
          if (cntIdx === 0 || cntIdx === 1 || cntIdx === 2) {
            cntIdx++
            dispatch(setCntChord(cntChordset[cntIdx] as string))
          } else if (cntIdx === 3) {
            stopRecording()
            cntIdx = -2
          }
        }, chordSecond*1000)
      }

      function toThree() {
        dispatch(setCountDownNumber(3))
      }
      function toTwo() {
        dispatch(setCountDownNumber(2))
      }
      function toOne() {
        dispatch(setCountDownNumber(1))
      }
      function toFour() {
        dispatch(setCountDownNumber(4))
      }

      toThree()
      setTimeout(toTwo, 1000)
      setTimeout(toOne, 2000)
      setTimeout(toFour, 3000)
      setTimeout(plusIdx, 3000)
      setTimeout(flipChord, 3000)
      setWhichSet((prev) => cntChordset)
    }

    const accessToken = window.localStorage.getItem('accessToken')

    const checkRecord = () => {
      const fullFile = audioURL
      // Wav 파일 헤더 추출
      const wavHeader = fullFile.slice(0, 44)
      // 헤더를 제외한 나머지 파일
      const fullAudio = fullFile.slice(44)

      // 헤더를 제외한 나머지 파일의 사이즈
      const fullSize = fullAudio.size
      // 4등분 사이즈
      const quarterSize = Math.floor(fullSize / 4)

      // 4등분한 각 파일에 헤더 더하기
      const audio_1 = new Blob([wavHeader, fullAudio.slice(0, quarterSize, 'audio/wav')], {type: 'audio/wav'})
      const audio_2 = new Blob([wavHeader, fullAudio.slice(quarterSize, 2*quarterSize, 'audio/wav')], {type: 'audio/wav'})
      const audio_3 = new Blob([wavHeader, fullAudio.slice(2*quarterSize, 3*quarterSize, 'audio/wav')], {type: 'audio/wav'})
      const audio_4 = new Blob([wavHeader, fullAudio.slice(3*quarterSize, 4*quarterSize, 'audio/wav')], {type: 'audio/wav'})
      
      const [chord_1, chord_2, chord_3, chord_4] = whichSet

      const data = new FormData()
      data.append('files', audio_1, 'audio_1')
      data.append('files', audio_2, 'audio_2')
      data.append('files', audio_3, 'audio_3')
      data.append('files', audio_4, 'audio_4')
      data.append('chords', chord_1)
      data.append('chords', chord_2)
      data.append('chords', chord_3)
      data.append('chords', chord_4)
      data.append('difficulty', 'normal')

      // Axios
      axios.post('https://j7a202.p.ssafy.io/api/record/game', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const resultArr = response.data
          const scoreForChords:string[] = ["", "", "", ""]

          for (let i = 0; i < 4; i++) {
            if ( resultArr[i].is_correct === false) {
              // Bad
              scoreForChords[i] = "Bad"
            } else if (resultArr[i].is_correct === true && resultArr[i].score < 50) {
              // SoSo
              scoreForChords[i] = "SoSo"
            } else if (resultArr[i].is_correct === true && resultArr[i].score >= 50 && resultArr[i].score < 70) {
              // Good
              scoreForChords[i] = "Good"
            } else if (resultArr[i].is_correct === true && resultArr[i].score >= 70 && resultArr[i].score < 90) {
              // Great
              scoreForChords[i] = "Great"
            } else if (resultArr[i].is_correct === true && resultArr[i].score >= 90) {
              // perfect
              scoreForChords[i] = "Perfect"
            }
          }

          const resultString = `${chord_1} : ${scoreForChords[0]} / ${chord_2} : ${scoreForChords[1]} / ${chord_3} : ${scoreForChords[2]} / ${chord_4} : ${scoreForChords[3]} `

          Swal.fire({
            title: resultString,
            html: `이번 랜덤 코드세트는 ${chord_1} ➡ ${chord_2} ➡ ${chord_3} ➡ ${chord_4} 순으로 진행됐습니다.<br/>
            결과는 'Perfect', 'Great', 'Good', 'SoSo', 'Bad'순으로 높은 점수입니다.<br/>
            본인의 결과를 확인한 후 부족한 코드를 연습모드에서 연습해보세요!`,
            confirmButtonText: '확인',
            confirmButtonColor: '#777981',
            customClass: 'swal-wide'
          })
        })
        .catch((error)=> {
          // console.log(error)
        })
    }
      
    // JSX
    return (
      <Stack alignItems="center" spacing={5}>
        <ThemeProvider theme={theme}>
          <Button id="normal-start-btn" variant="outlined" className="white-text" disabled={isRecording} onClick={startGame}>시 작 하 기</Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button id="normal-check-btn" variant="outlined" className="white-text" disabled={isRecording || recordedFlag === false} onClick={checkRecord}>채 점 하 기</Button>
        </ThemeProvider>
      </Stack>
    )
}