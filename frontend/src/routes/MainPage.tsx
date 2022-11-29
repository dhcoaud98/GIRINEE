import { Link, useNavigate } from "react-router-dom";
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import Button from '@mui/material/Button';
import React, { useEffect, useRef, useState, Suspense} from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Box } from '../components/mainpage/three'
import { Logo } from '../components/mainpage/Girinlogo'
import { Firstamp } from '../components/mainpage/Firstamp'
import { RotatingBtn } from "../widgets/RotatingBtn";
import { Secondamp } from '../components/mainpage/Secondamp';
import { PerspectiveCamera, Center, Backdrop, Float, Bounds } from '@react-three/drei';
import { MainContainer } from '../components/mainpage/mainContainer'
import { MainBtn } from "../widgets/MainBtn";
import { MenuContainer } from "../components/mainpage/menuContainer";
import './MainPage.css';
import { Navbar } from "../widgets/Navbar";
import { KakaoLogin } from "./KakaoLogin";
import { Switch } from "@mui/material";
/* swiper */
import { Spinner } from "../widgets/Spinner";
import 'swiper/css';
import SwiperCore, { Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { useSwiper } from 'swiper/react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Cookies } from 'react-cookie';
import { useAppDispatch } from "../app/hooks";
import { setRoBtnState } from "../features/rotatingbtn/RotateSlice";

// import "swiper/swiper.css";
// import "swiper/components/navigation/navigation.css";


export function MainPage() {

  // 로그인
  useEffect(() => {
    const code = window.location.search
    let param = new URLSearchParams(code);
    const accessToken = param.get('accessToken');
    console.log('code = ', code)
    console.log('accessToken = ', accessToken)
    dispatch(setRoBtnState(0))

    if(accessToken) {
      console.log("현재 login됨")
      console.log(accessToken)
      localStorage.setItem("accessToken", accessToken); // 토큰을 로컬 스토리지에 저장 === 로그인 함.
      console.log("localStorage = ", window.localStorage)
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  }, [])

  // script
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // cookie 값 사용하기
  // const cookies = new Cookies()
  // const getCookie = (refresh:string) => {
  //   return cookies.get(refresh)
  // }
  // console.log(cookies)


  // JSX
  return (
    <Swiper id="main-swiper"
      // install Swiper modules
      modules={[ Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, A11y]}
      
      // default
      spaceBetween={0}
      slidesPerView={1}
      // direction={'vertical'}
      centeredSlides={true}
      speed= {2000}
      // import 
      // loop={true}
      // mousewheel={true}
      touchRatio={0}
      navigation= {{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'swiper-button-disabled',
      }}
      // pagination={{ // 페이징 설정
      //   // nextEl: '.swiper-button-next',
      //   // prevEl: '.swiper-button-prev',
      //   el: '.swiper-pagination',
      //   clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
      // }}
      scrollbar={{ draggable: false }}
      onSwiper={(swiper) => console.log('swiper', swiper)}
      // onSlideChange={() => console.log('slide change')}
      keyboard={{enabled: true, onlyInViewport: false, pageUpDown:true, }}
    >
      
      <SwiperSlide id="main-canvas">
      {localStorage.getItem('accessToken') != null ? <Navbar /> : null }        
        <MainContainer />
        <RotatingBtn />
      </SwiperSlide>
      {localStorage.getItem('accessToken') != null ?
      <SwiperSlide>
      {({ isActive }) =>
        <div id="main2">
          {localStorage.getItem('accessToken') != null ? <Navbar /> : null }
          {isActive ? <MenuContainer num={0.65}/> : null }
          <div id="menu-span-container">
            <span className="menu-span">Chord Game</span>
            <span className="information">코드 게임을 진행할 수 있습니다.</span>
          </div>
          <h2 className="my-record" 
            onClick={() => {
              setTimeout(() => {
              navigate('/profile')
              }, 1000);
            }}>
            기록보기
          </h2>
        </div>
        }
    </SwiperSlide> : null }
      
    {localStorage.getItem('accessToken') != null ? <SwiperSlide>
        {({ isActive }) =>
          <div id="main2">
            {localStorage.getItem('accessToken') != null ? <Navbar /> : null }
            {isActive ? <MenuContainer num={0.83}/> : null}
            <div id="menu-span-container">
              <span className="menu-span">Chord Table</span>
              <span className="information">코드에 대한 설명을 확인할 수 있습니다.</span>
            </div>
            <h2 className="my-record" 
              onClick={() => {
                setTimeout(() => {
                navigate('/profile')
                }, 1000);
              }} >
              기록보기
            </h2>

          </div>
          }
      </SwiperSlide> : null}
      

      <div className="swiper-button-prev swiper-button-disabled"><MainBtn/></div>
      <div className="swiper-button-next"><MainBtn/></div>

    </Swiper>
  )
}