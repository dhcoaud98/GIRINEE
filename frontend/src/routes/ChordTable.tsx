import { TableContainer } from "../components/chordtable/TableContainer";
import "./ChordTable.css"
// Systems
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import { render } from "react-dom"
import { useAppDispatch, useAppSelector } from '../app/hooks'

// Other Component 
import C_chord from '../assets/images/chords/C_chord.png'
import Cm_chord from '../assets/images/chords/Cm_chord.png'
import D_chord from '../assets/images/chords/D_chord.png'
import Dm_chord from '../assets/images/chords/Dm_chord.png'
import E_chord from '../assets/images/chords/E_chord.png'
import Em_chord from '../assets/images/chords/Em_chord.png'
import F_chord from '../assets/images/chords/F_chord.png'
import Fm_chord from '../assets/images/chords/Fm_chord.png'
import G_chord from '../assets/images/chords/G_chord.png'
import Gm_chord from '../assets/images/chords/Gm_chord.png'
import A_chord from '../assets/images/chords/A_chord.png'
import Am_chord from '../assets/images/chords/Am_chord.png'
import B_chord from '../assets/images/chords/B_chord.png'
import Bm_chord from '../assets/images/chords/Bm_chord.png'
import { setCntChord } from "../features/chordgame/GameSlice";

// Material UI
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import StopIcon from '@mui/icons-material/Stop';
import MicIcon from '@mui/icons-material/Mic';
import { createTextSpanFromBounds } from 'typescript'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { withTheme } from '@emotion/react'

// -----------------------------------------------------------------------------------------------------



export function ChordTable() {
    // script
    const guitarChords = ['C', 'Cm', 'D', 'Dm', 'E', 'Em', 'F', 'Fm', 'G', 'Gm', 'A', 'Am', 'B', 'Bm']
    
    // 버튼 눌렀을 때 해당 코드 연습 화면으로 변경
    // const [cntChord, setCntChord] = useState('C_chord')
    const cntChord = useAppSelector((state)=>state.game.cntChord)
    const dispatch = useAppDispatch()
    const showChord = (event: SelectChangeEvent) => {
    dispatch(setCntChord(event.target.value as string))
    }

    // MUI select 테마 변경
    const theme = createTheme({
      palette: {
        primary: {
          main: '#ffffff',          
        },
      },
    })

    // JSX
    return (
      <div>
        <div id="chord-table-container">
          {/* 셀렉트 박스(코드 선택) */}
          <div id="chord-table-left-box">
            <div id="chord-select-box">
            <ThemeProvider theme={theme}>
              <FormControl variant="filled" sx={{ minWidth: 200 }}>
                <InputLabel id="chord-select-label">CHORD</InputLabel>
                  <Select
                    placeholder='Select Chord'
                    labelId="chord-select-label"
                    id="chord-select"
                    value={cntChord}
                    label="Chord"
                    onChange={showChord}            
                  >
                    {guitarChords.map((chord, idx) => (
                      <MenuItem key={idx} value={chord}>{chord}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ThemeProvider>
              </div>
          </div>
        <div id="chord-table-right-box">
          {/* 코드 관련 */}
          <div id="chord-box">
          {/* 코드 운지표 */}
            <img src={cntChord ==='C' ? C_chord : cntChord ==='Cm' ? Cm_chord :
                      cntChord ==='D' ? D_chord : cntChord ==='Dm' ? Dm_chord :
                      cntChord ==='E' ? E_chord : cntChord ==='Em' ? Em_chord :
                      cntChord ==='F' ? F_chord : cntChord ==='Fm' ? Fm_chord :
                      cntChord ==='G' ? G_chord : cntChord ==='Gm' ? Gm_chord :
                      cntChord ==='A' ? A_chord : cntChord ==='Am' ? Am_chord :
                      cntChord ==='B' ? B_chord : Bm_chord} id="chord-img" alt="..." />
          </div>
        </div>
      </div>
      <TableContainer></TableContainer>
      </div>
    )
}