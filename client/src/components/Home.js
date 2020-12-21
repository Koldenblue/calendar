// import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import NavMenu from './NavMenu';
import { setCurrentDate, selectCurrentDate } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
import MiniCalendar from './MiniCalendar/MiniCalendar';
const dayjs = require('dayjs');


export default function Home() {
  let day = dayjs().format('dddd');     // the name of today, ex. "Tuesday"
  let date = dayjs().format('MMMM D');  // format ex. 'December 1'
  let hour = dayjs().format('h A');     // format ex. '11 PM'
  const [calendar, setCalendar] = useState();         // renders the Calendar.js component
  const [weekCounter, setWeekCounter] = useState(0);  // keeps track of the days of the week, in increments of 7
  const dispatch = useDispatch();
  let currentDate = useSelector(selectCurrentDate);

  /** Set the current date upon first render. */
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
    // Note: set new week variable to avoid bugs related to async and stale state
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
    console.log(date)
    setWeekCounter(week);
    dispatch(setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: week
    }))
  }

  /** Goes to the current week, and scrolls the current time into view. */
  const goToToday = () => {
    dispatch(setCurrentDate({
      day: day,
      date: date,
      hour: hour,
      weekCounter: 0
    }))
    // the calendar needs to update to the current week before it can be scrolled into view.
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