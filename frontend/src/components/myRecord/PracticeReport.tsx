import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import Typography from '@mui/material/Typography';
import axios from 'axios';

import './PracticeReport.css';


// main
export function PracticeReport() {

  // axios 상태 관리
  const [users, setUsers] = React.useState(null);
  
  // 로컬 스토리지에 있는 토큰 값 저장
  const accessToken = window.localStorage.getItem('accessToken')

  // axios 요청
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://j7a202.p.ssafy.io/api/record/practice', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        console.log('data = ', response.data)
        // console.log(response.data['B'])
        // console.log(response.data['B']['success'])
        // console.log(response.data['B']['failure'])
      } catch (e: any) {
        console.log('errer=', e)
      }
    };

    fetchUsers();
  }, []);


  // 그래프 데이터 관리
  const graphdata = [
    {
      name: "A",
      Success: users ? (users['A'] ? users['A']['success'] : 0) : 0,
      Failure: users ? (users['A'] ? users['A']['failure'] : 0) : 0,
      // parseInt(users['A']['success'])/( parseInt(users['A']['success']) +  parseInt(users['A']['failure'])) * 100).toFixed(0)
    },
    {
      name: "B",
      Success: users ? (users['B'] ? users['B']['success'] : 0) : 0,
      Failure: users ? (users['B'] ? users['B']['failure'] : 0) : 0,
    },
    {
      name: "C",
      Success: users ? (users['C'] ? users['C']['success'] : 0) : 0,
      Failure: users ? (users['C'] ? users['C']['failure'] : 0) : 0,
    },
    {
      name: "D",
      Success: users ? (users['D'] ? users['D']['success'] : 0) : 0,
      Failure: users ? (users['D'] ? users['D']['failure'] : 0) : 0,
    },
    {
      name: "E",
      Success: users ? (users['E'] ? users['E']['success'] : 0) : 0,
      Failure: users ? (users['E'] ? users['E']['failure'] : 0) : 0,
    },
    {
      name: "F",
      Success: users ? (users['F'] ? users['F']['success'] : 0) : 0,
      Failure: users ? (users['F'] ? users['F']['failure'] : 0) : 0,
    },
    {
      name: "G",
      Success: users ? (users['G'] ? users['G']['success'] : 0): 0,
      Failure: users ? (users['G'] ? users['G']['failure'] : 0): 0,
    }
  ];


  return (
    <Box component="div">
      <Typography sx={{ display: 'flex', justifyContent: 'center', mb:3}} id="text-color-practice">코드별 정확도를 확인할 수 있습니다.</Typography>
      <BarChart
        width={900}
        height={600}
        data={graphdata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Success" fill="#99ffff" barSize={20} />
        <Bar dataKey="Failure" fill="#ffcccc" barSize={20} />
      </BarChart>
    </Box>
  )
}

export default PracticeReport;
