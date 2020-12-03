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
  const [currentDate, setCurrentDate] = useState({});
  const [calendar, setCalendar] = useState();
  const [weekCounter, setWeekCounter] = useState(0); // keeps track of the days of the week, in increments of 7

  useEffect(() => {
    setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: weekCounter
    })
  }, [])
  


  // console.log(currentDate);

  const back = () => {
    let week = weekCounter - 7;
    date = dayjs(new Date(new Date().setDate(new Date().getDate() + week) )).format('MMMM D');
    setWeekCounter(week);
    setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: week
    })
    console.log(date)
    console.log(currentDate)
  }

  const forward = () => {
    let week = weekCounter + 7;
    date = dayjs(new Date(new Date().setDate(new Date().getDate() + week) )).format('MMMM D');
    setWeekCounter(week);
    setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: week
    })
  }

    // upon getting the date (changeable by forward and back buttons) re-render the calendar
    useEffect(() => {
      console.log('current date changing')
      if (currentDate.day) {
        setCalendar(<Calendar currentDate={currentDate} />)
      }
      return () => {
        setCalendar()
      }
    }, [currentDate])


  // TODO:
  // put buttons to go back or forward a week by changing currentDate.
  // render Calendar with useEffect, every time currentDate changes
  return (
    <>
      <NavMenu />
      <button onClick={back}>Back</button>
      <button onClick={forward}>Forward</button>
      {calendar}
    </>
  )
}