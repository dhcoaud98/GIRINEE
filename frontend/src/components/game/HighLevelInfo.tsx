// Systems

// Other Component 

// Material UI
import { Stack } from '@mui/system'

// -----------------------------------------------------------------------------------------------------

export function HighLevelInfo() {
    // script

    // JSX
    return (
      <Stack alignItems="center" spacing={5}>
        <p id="level-value" className='line-up'>H A R D - L E V E L</p>
        <p id="level-discription" className='white-text'>
          랜덤으로 주어지는 4개의 코드들을 박자에 맞춰 연주하세요.<br/>
          <br/>
          우측 하단의 시작하기 버튼을 누르면 실제 음악에서 자주 사용되는 4개의 코드 진행이 랜덤으로 주어집니다.<br/>
          각 코드를 연주할 시간은 슬라이더로 설정 가능합니다.<br/>
          <br/>
          연주가 모두 끝나면 녹음이 자동으로 종료되고,<br/>
          활성화되는 채점 버튼을 눌러 연주를 올바르게 했는지 바로 확인할 수 있습니다.<br/>
          <br/>
          다만, 이 레벨에서는 참고할 수 있는 코드 운지표가 제공되지 않습니다.
        </p>
      </Stack>
    )    
  }
  
  // Three Function