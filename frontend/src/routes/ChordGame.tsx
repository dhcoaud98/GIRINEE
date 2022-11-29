// Systems
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'

// Other Component 
import GIRINEE from '../assets/images/GIRINEE.png'
import './ChordGame.css'
import './Display.css'
import '../assets/fonts/font.css'
import { LowLevelInfo } from '../components/game/LowLevelInfo'
import { LowLevelController } from '../components/game/LowLevelController'
import { NormalLevelInfo } from '../components/game/NormalLevelInfo'
import { NormalLevelController } from '../components/game/NormalLevelController'
import { HighLevelInfo } from '../components/game/HighLevelInfo'
import { HighLevelController } from '../components/game/HighLevelController'
import { setDegree, setSecond } from '../features/chordgame/GameSlice'
import { TableContainer } from '../components/chordtable/TableContainer'

// Material UI
import { Box } from '@mui/system'
import { Button, Stack, Grid, Slider, Typography } from '@mui/material'
import AlarmIcon from '@mui/icons-material/Alarm';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { setChordColor } from '../features/chordthree/ChordSlice'

// -----------------------------------------------------------------------------------------------------

export function ChordGame() {
    // script
    // 로그아웃
    const logout = () => {
      const logoutConfirm = window.confirm('로그아웃 하시겠습니까?')
  
      function deleteCookie(Name:any) {
        document.cookie = Name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
  
      if (logoutConfirm) {
        localStorage.removeItem('accessToken')
        deleteCookie("Reply");
        window.location.replace('https://j7a202.p.ssafy.io')
      }
    }
  
    // 카운트다운 숫자
    const countDownNumber:number = useAppSelector((state) => state.game.countDownNumber)

    const dispatch = useAppDispatch()

    // 레벨 선택 노브각도 조절
    const controllerDegree = useAppSelector((state) => state.game.controllerDegree)
    const clickLow = () => dispatch(setDegree(0))
    const clickMid = () => dispatch(setDegree(1))
    const clickHigh = () => dispatch(setDegree(2))
    
    // 디스패치로 사용자가 슬라이더로 선택하는 시간 초 변경, 설정된 초 가져오기
    const handleChange = (event: Event, newValue: number | number[]) => {
      dispatch(setSecond(newValue as number));
    }
    
    // three 색상
    const selectedColor = useAppSelector((state) => state.chord.chordColor)
    const handleColor = (color: string) => {
      dispatch(setChordColor(color))
    }

    const navigate = useNavigate()

    // 흰색 테마
    const theme = createTheme({
      palette: {
        primary: {
          main: '#fff',          
        },
      },
    })   

    // JSX
    return (
      <div id ="chord-game-container">
      <TableContainer/>
      <Box component="div" id="game-body" sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Box component="div" id="menu-bar" sx={{ mt: 4, px: 8, py:0, display: 'flex', justifyContent: 'space-between'}}>
          {/* 텍스트로고 */}
          <img id="girinee-img" src={GIRINEE} alt="GIRINEE.png" />
          <Stack spacing={2} direction="row">
            {/* 마이페이지 */}
            <Button variant="text" className="menu-btn">
              <Typography className="menu-text"><Link to="/profile" className="none-deco menu-text">MY PAGE</Link></Typography>
            </Button>

            {/* 로그아웃 */}
            <Button variant="text" className="menu-btn">
              <Typography className="menu-text" onClick={logout}>LOGOUT</Typography>
            </Button>
          </Stack>
        </Box>
      
        {/* Main Contents */}
        <Grid component="div" container>

          {/* Level Info */}
          <Grid item xs={3} pl={10} pt={15} id="info-box">
            {/* 선택한 난이도 따라서 나타나는 내용 */}
            {controllerDegree === 0 ? <LowLevelInfo/> : controllerDegree === 1 ? <NormalLevelInfo/> : <HighLevelInfo/>}
            {/* </Box> */}
          </Grid>

          {/* Three js를 위한 공간~ */}
          <Grid item xs={6}>
            <div className={countDownNumber===4? "d-none": "line-up countDownDiv"}>
              <div className="countDownNumber">{countDownNumber}</div>
            </div>
          </Grid>
      
          {/* 메인 컨트롤러 + Level별 컨트롤러 */}
          <Grid item xs={3} p={5} pt={15} pb={0} id="controller-box">
            {/* 메인 컨트롤러 */}
            <Stack spacing={10}>
              {/* 메인화면으로 돌아가기 */}
              <Box component="div" my={2} sx={{ display: 'flex', justifyContent: 'center'}}>
                <form id="quitLever" onClick={() => {
                  setTimeout(() => {navigate('/')}, 600)}}>
                  <label htmlFor="lever"><span className="white-text">Off</span></label>
                  <input type="checkbox" name="lever" className="lever pristine" id="lever" value="lever value" role="switch" aria-label="lever" aria-checked="false" />
                  <label htmlFor="lever"><span className='white-text'>On</span></label>
                </form>
              </Box>

              {/* <Grid container sx={{ display: 'flex', justifyContent: 'center'}}> */}
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Stack spacing={3}>
                  {/* 레벨 컨트롤러 */}
                  <Stack direction="row">
                    {/* 노브 */}
                    <div id="level-controller-outline" className={`degree${ controllerDegree } d-flex-row justify-content-center`}>
                      <div id="level-controller">
                        <div id="level-index"></div>
                      </div>
                    </div>

                    {/* 레벨버튼 누르면 해당하는 부분으로 위의 노브가 회전 */}
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
                  </Stack>

                  {/* 색상 컨트롤러 */}
                  <Stack direction="row">
                    {/* 노브 */}
                    <div id="color-controller-outline" className={`d-flex-row justify-content-center select${ selectedColor }`}>
                      <div id="color-controller">
                        <div id="color-index"></div>
                      </div>
                    </div>

                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <Button variant="text" onClick={() => handleColor('lightblue')}>
                        <p className="white-text new-font">BLUE</p>
                      </Button>
                      <Button variant="text" onClick={() => handleColor('lightyellow')}>
                        <p className="white-text new-font">YELLOW</p>
                      </Button>
                      <Button variant="text" onClick={() => handleColor('lightpink')}>
                        <p className="white-text new-font">PINK</p>
                      </Button>
                    </Box>
                  </Stack>
                </Stack>

                <div className='d-flex-row'>
                  <ThemeProvider theme={theme}>
                    <Slider marks onChange={handleChange} aria-label="Seconds" defaultValue={3} orientation="vertical" valueLabelDisplay="auto" step={1} min={2} max={6} disabled={controllerDegree===0 ? true : false}/>
                  </ThemeProvider>
                  <div>
                    <AlarmIcon sx={{ color: "white" }} />
                    <p className="white-text" style={{margin: 0}}>sec</p>
                  </div>
                </div>
              </Stack>              
              {/* </Grid> */}
  
              {/* 레벨별 컨트롤러 */}
              {controllerDegree === 0 ? <LowLevelController/> : controllerDegree === 1 ? <NormalLevelController /> : <HighLevelController/>}
            </Stack>
          </Grid>
        </Grid>
      </Box>
      </div>
    )
  }
  
  // Three Function
