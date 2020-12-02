// import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import NavMenu from './NavMenu';
import Moment from 'react-moment';
const dayjs = require('dayjs');

export default function Home() {
  let now = new Date();                 // format ex. Tue Dec 01 2020 23:00:18 GMT-0800 (Pacific Standard Time)
  let day = dayjs().format('dddd');     // the name of today, ex. "Tuesday"
  let date = dayjs().format('MMMM D');  // format ex. 'Dec 1'
  let hour = dayjs().format('h A');     // format ex. '11 PM'
  const [currentDate, setCurrentDate] = useState({
    day: day,
    date: date,
    hour: hour
  });

  // console.log(currentDate);

  const back = () => {

  }
  const forward = () => {

  }

  // TODO:
  // put buttons to go back or forward a week by changing currentDate.
  // render Calendar with useEffect, every time currentDate changes
  return (
    <>
      <button onClick={back}>Back</button>
      <button onClick={forward}>Forward</button>
      <NavMenu />
      <Calendar currentDate={currentDate} />
    </>
  )
}