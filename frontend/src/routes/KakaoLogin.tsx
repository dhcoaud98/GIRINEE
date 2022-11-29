// import { useState } from 'react';
// import { createAction } from '@reduxjs/toolkit'
import kakaoImage from '../assets/images/kakao_login_large_wide.png';
import './KakaoLogin.css';
import { RotatingBtn } from '../widgets/RotatingBtn';
import { MainContainer } from '../components/mainpage/mainContainer';
import React, { useEffect, useState } from 'react';
import { useTimeout } from 'usehooks-ts';
// import MainPage from './MainPage';
// import Auth from "../Auth";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function KakaoLogin() {
  
    // // 로그인 액션 
    // const SET_USER = "SET_USER";
    // // 로그인 액션 생성
    // const setUser = createAction(SET_USER, (accessToken) => ({ accessToken }));
    // // 초기값
    // const initialState = {
    //   accessToken: null,
    //   isLogin: false,
    // }

    const navigate = useNavigate()
    const REDIRECT_URI = "https://j7a202.p.ssafy.io/oauth2/authorize/kakao";
    let [kakaoBtnState, setKakaoBtnState] = useState(false)
    let timer = setTimeout(() => setKakaoBtnState(true), 5000)

    // useEffect(() => {
    //   const code = window.location.search
    //   let param = new URLSearchParams(code);
    //   const accessToken = param.get('accessToken');
    //   console.log('code = ', code)
    //   console.log('accessToken = ', accessToken)
      
    //   if(accessToken) {
    //     console.log("현재 login됨")
    //     console.log(accessToken)
    //     localStorage.setItem("accessToken", accessToken); // 토큰을 로컬 스토리지에 저장 === 로그인 함.
    //     console.log("localStorage = ", window.localStorage)
    //     setTimeout(() => {
    //       navigate('/')
    //     }, 1000);
    //   }
    // }, [])
  
    // JSX
    return (
      <div id="kakao-body">
        <MainContainer/>
        <RotatingBtn/>
        <div id="kakao-div">
            <a href={REDIRECT_URI}>
              <div id="kakao-button" className={kakaoBtnState === false ? "component-off" : "d"}><img src={kakaoImage} width="400" alt="kakao_login_large_wide" />
              </div>
            </a>
        </div>
      </div>
    )
  }
  // className={kakaoBtnState === false ? "component-off" : "d"}
  // Three Function