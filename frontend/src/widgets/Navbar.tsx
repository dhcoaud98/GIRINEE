import { useState } from 'react';
import react from 'react';
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

export function Navbar() {

  const navigate = useNavigate()

  const logout = () => {
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?')

    function deleteCookie(Name:any) {
      document.cookie = Name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    if (logoutConfirm) {
      localStorage.removeItem('accessToken')
      console.log('로그아웃 되었습니다.')
      deleteCookie("Reply");
      window.location.replace('https://j7a202.p.ssafy.io')
    }
  }

  return (
    <h1 className="logout-btn" onClick={logout}>logout</h1>
  )
}

export default Navbar;
