// Systems
import { useAppSelector } from '../../app/hooks'
import { useRef } from 'react'

// Other Component 
import '../../routes/Display.css'
import C_chord from '../../assets/images/chords/C_chord.png'
import C_sound from '../../assets/chord_sounds/C_sound.wav'
import Cm_chord from '../../assets/images/chords/Cm_chord.png'
import Cm_sound from '../../assets/chord_sounds/Cm_sound.wav'
import D_chord from '../../assets/images/chords/D_chord.png'
import D_sound from '../../assets/chord_sounds/D_sound.wav'
import Dm_chord from '../../assets/images/chords/Dm_chord.png'
import Dm_sound from '../../assets/chord_sounds/Dm_sound.wav'
import E_chord from '../../assets/images/chords/E_chord.png'
import E_sound from '../../assets/chord_sounds/E_sound.wav'
import Em_chord from '../../assets/images/chords/Em_chord.png'
import Em_sound from '../../assets/chord_sounds/Em_sound.wav'
import F_chord from '../../assets/images/chords/F_chord.png'
import F_sound from '../../assets/chord_sounds/F_sound.wav'
import Fm_chord from '../../assets/images/chords/Fm_chord.png'
import Fm_sound from '../../assets/chord_sounds/Fm_sound.wav'
import G_chord from '../../assets/images/chords/G_chord.png'
import G_sound from '../../assets/chord_sounds/G_sound.wav'
import Gm_chord from '../../assets/images/chords/Gm_chord.png'
import Gm_sound from '../../assets/chord_sounds/Gm_sound.wav'
import A_chord from '../../assets/images/chords/A_chord.png'
import A_sound from '../../assets/chord_sounds/A_sound.wav'
import Am_chord from '../../assets/images/chords/Am_chord.png'
import Am_sound from '../../assets/chord_sounds/Am_sound.wav'
import B_chord from '../../assets/images/chords/B_chord.png'
import B_sound from '../../assets/chord_sounds/B_sound.wav'
import Bm_chord from '../../assets/images/chords/Bm_chord.png'
import Bm_sound from '../../assets/chord_sounds/Bm_sound.wav'

// Material UI
import Stack from '@mui/material/Stack'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// -----------------------------------------------------------------------------------------------------

export function LowLevelInfo() {
    // script
    // ?????? ?????? ????????????
    const cntChord = useAppSelector((state)=>state.game.cntChord)
    const audioRef = useRef<HTMLAudioElement>(null)

    // ??????????????? ??????
    const playAudio = () => {
      if (audioRef.current != null) {
        audioRef.current.play()
        }
    }
    
    // JSX
    return (
      <Stack spacing={10}>
        <Stack alignItems="center" spacing={5}>
          <p id="level-value" className='line-up'>L O W - L E V E L</p>
          <p id="level-discription" className='white-text'>
            ????????? ????????? ?????? ???????????? ???????????????.<br/>
            <br/>
            ?????? ????????? ?????? ???????????? ???????????????.<br/>
            ????????? ????????? ?????? ????????? ?????? ????????? ???????????????.<br/>
            <br/>
            ?????? ????????? ????????? ???????????? ???????????? ????????????.<br/>
            ????????? ???????????? ?????? ????????? ?????? ????????? ????????????, <br/>
            ??????????????? ?????? ????????? ?????? ????????? ???????????? ????????? ?????? ????????? ??? ????????????.<br/>
          </p>
        </Stack>          
        
        <Stack id="chord-box" alignItems="center" spacing={5}>
          {/* ?????? ????????? */}
          <img src={cntChord ==='C' ? C_chord : cntChord ==='Cm' ? Cm_chord :
                    cntChord ==='D' ? D_chord : cntChord ==='Dm' ? Dm_chord :
                    cntChord ==='E' ? E_chord : cntChord ==='Em' ? Em_chord :
                    cntChord ==='F' ? F_chord : cntChord ==='Fm' ? Fm_chord :
                    cntChord ==='G' ? G_chord : cntChord ==='Gm' ? Gm_chord :
                    cntChord ==='A' ? A_chord : cntChord ==='Am' ? Am_chord :
                    cntChord ==='B' ? B_chord : Bm_chord} id="chord-img" alt="..." />
          {/* ?????? ?????? */}
          <audio src={cntChord ==='C' ? C_sound : cntChord ==='Cm' ? Cm_sound :
                      cntChord ==='D' ? D_sound : cntChord ==='Dm' ? Dm_sound :
                      cntChord ==='E' ? E_sound : cntChord ==='Em' ? Em_sound :
                      cntChord ==='F' ? F_sound : cntChord ==='Fm' ? Fm_sound :
                      cntChord ==='G' ? G_sound : cntChord ==='Gm' ? Gm_sound :
                      cntChord ==='A' ? A_sound : cntChord ==='Am' ? Am_sound :
                      cntChord ==='B' ? B_sound : Bm_sound} ref={audioRef}></audio>

          <Stack alignItems="center">
            <button id="audio-play-btn" onClick={() => playAudio()}>
              <PlayArrowIcon id="audio-play-icon" fontSize="large"/>
            </button>
            <p id="audio-play-btn-name" className="white-text">{cntChord} ?????? ??????</p>
          </Stack>          
        </Stack>
      </Stack>
    )
  }
  
  // Three Function
