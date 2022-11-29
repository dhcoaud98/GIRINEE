// Systems
import { useAppSelector } from '../../app/hooks'

// Other Component 
import useRecorder from "./useRecorder"
import C_chord from '../../assets/images/chords/C_chord.png'
import Cm_chord from '../../assets/images/chords/Cm_chord.png'
import D_chord from '../../assets/images/chords/D_chord.png'
import Dm_chord from '../../assets/images/chords/Dm_chord.png'
import E_chord from '../../assets/images/chords/E_chord.png'
import Em_chord from '../../assets/images/chords/Em_chord.png'
import F_chord from '../../assets/images/chords/F_chord.png'
import Fm_chord from '../../assets/images/chords/Fm_chord.png'
import G_chord from '../../assets/images/chords/G_chord.png'
import Gm_chord from '../../assets/images/chords/Gm_chord.png'
import A_chord from '../../assets/images/chords/A_chord.png'
import Am_chord from '../../assets/images/chords/Am_chord.png'
import B_chord from '../../assets/images/chords/B_chord.png'
import Bm_chord from '../../assets/images/chords/Bm_chord.png'

// Material UI
import { Stack } from '@mui/system'

// -----------------------------------------------------------------------------------------------------

export function NormalLevelInfo() {
    // script
    // 현재 기타코드
    const cntChord:string = useAppSelector((state) => state.game.cntChord)

    // JSX
    return (
      <Stack spacing={10}>
        <Stack alignItems="center" spacing={5}>
          <p id="level-value" className='line-up'>N O R M A L - L E V E L</p>
          <p id="level-discription" className='white-text'>
            랜덤으로 주어지는 4개의 코드들을 박자에 맞춰 연주하세요.<br/>
            <br/>
            우측 하단의 시작하기 버튼을 누르면 실제 음악에서 자주 사용되는 4개의 코드 진행이 랜덤으로 주어집니다.<br/>
            각 코드를 연주할 시간은 슬라이더로 설정 가능합니다.<br/>
            <br/>
            연주가 모두 끝나면 녹음이 자동으로 종료되고,<br/>
            활성화되는 채점 버튼을 눌러 연주를 올바르게 했는지 바로 확인할 수 있습니다.
          </p>
        </Stack>
        <Stack id="chord-box" alignItems="center">
          {/* 여기서 대기 화면을 넣던가 해야겠음 */}
          <img src={cntChord ==='C' ? C_chord : cntChord ==='Cm' ? Cm_chord :
                    cntChord ==='D' ? D_chord : cntChord ==='Dm' ? Dm_chord :
                    cntChord ==='E' ? E_chord : cntChord ==='Em' ? Em_chord :
                    cntChord ==='F' ? F_chord : cntChord ==='Fm' ? Fm_chord :
                    cntChord ==='G' ? G_chord : cntChord ==='Gm' ? Gm_chord :
                    cntChord ==='A' ? A_chord : cntChord ==='Am' ? Am_chord :
                    cntChord ==='B' ? B_chord : Bm_chord} id="chord-img" alt="..." />
        </Stack>
      </Stack>
    )
  }
  
  // Three Function