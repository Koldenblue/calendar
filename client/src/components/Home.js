// import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import NavMenu from './NavMenu';
import { setCurrentDate, selectCurrentDate } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
const dayjs = require('dayjs');


export default function Home() {
  let day = dayjs().format('dddd');     // the name of today, ex. "Tuesday"
  let date = dayjs().format('MMMM D');  // format ex. 'Dec 1'
  let hour = dayjs().format('h A');     // format ex. '11 PM'
  const [calendar, setCalendar] = useState();
  const [weekCounter, setWeekCounter] = useState(0); // keeps track of the days of the week, in increments of 7
  const dispatch = useDispatch();
  let currentDate = useSelector(selectCurrentDate);

  useEffect(() => {
    dispatch(setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: weekCounter
    }))
  }, [])

  /** Back button. Sets calendar back 7 days, then re-renders calendar days. */
  const back = () => {
    // set new week variable to avoid bugs related to async and stale state
    let week = weekCounter - 7;
    date = dayjs(new Date(new Date().setDate(new Date().getDate() + week))).format('MMMM D');
    setWeekCounter(week);
    dispatch(setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: week
    }))

  }

  /** Forward button. Sets calendar forward 7 days, then re-renders calendar days. */
  const forward = () => {
    let week = weekCounter + 7;
    date = dayjs(new Date(new Date().setDate(new Date().getDate() + week))).format('MMMM D');
    setWeekCounter(week);
    dispatch(setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: week
    }))
  }

  const goToToday = () => {
    dispatch(setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: 0
    }))
    setTimeout(() => {
      try {
        document.getElementsByClassName('current-hour')[0].scrollIntoView({behavior: 'smooth', block: 'center'})
      } catch (TypeError) {
        setTimeout(() => {
          try {
            document.getElementsByClassName('current-hour')[0].scrollIntoView({behavior: 'smooth', block: 'center'})
          } catch (TypeError) {
            console.error(TypeError)
          }
        }, 700)
      }
    }, 300)
  }

  // upon getting the date (changeable by forward and back buttons) re-render the calendar
  useEffect(() => {
    if (currentDate.day) {
      setCalendar(<Calendar />)
    }
    return () => {
      setCalendar()
    }
  }, [currentDate])



  return (
    <>
      <NavMenu goToToday={goToToday} />
      <div className='btn-container'>
        <button className='btn btn-success' id='back-btn' onClick={back}>Back</button>
        <div id='empty-btn-div'></div>
        <button className='btn btn-success' id='forward-btn' onClick={forward}>Forward</button>
      </div>
      {calendar}
    </>
  )
}