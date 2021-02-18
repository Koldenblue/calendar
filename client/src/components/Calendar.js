import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Hour from './Hour';
import dayjs from 'dayjs';
import { selectCurrentDate, setChangeHours, selectHandlePost } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
import Axios from "axios";
import { useHistory } from "react-router-dom";


export default function Calendar() {
  const [hours, setHours] = useState();         // jsx for Hour.js components
  const [dayLabels, setDayLabels] = useState(); // jsx for labels at the top of the calendar
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDate = useSelector(selectCurrentDate);
  let handlePost = useSelector(selectHandlePost);
  let currentDayIndex = days.indexOf(currentDate.day)  // the index of today. Ex. "Wednesday" is index 3.
  let currentDay = dayjs().format('MMMM D') // ex. 'December 1'
  const dispatch = useDispatch();
  const history = useHistory();

  // map out calendar days. This array consists of the days of the week, ex. 'November 29' thru 'Dec 5'
  const makeDaysArray = () => {
    return new Promise(function (resolve, reject) {
      let calendarDays = [];
      days.forEach(day => {
        let calendarDay = dayjs(new Date(new Date().setDate(new Date().getDate() + days.indexOf(day) - currentDayIndex + currentDate.weekCounter)))
        calendarDays.push(calendarDay)
      })
      resolve(calendarDays);
    })
  }

  // This effect will be run every time currentDate changes (user presses back or forward)
  useEffect(() => {
    console.log('running')
    makeDaysArray().then(calendarDays => {
      let calendarIndex = 0;
      // Sets the top row labels, Sunday thru Sat.
      setDayLabels(
        <thead className='table-head'>
          <tr>
            <td className='time-col' id='empty-col'></td>
            {days.map(day => {
              let dateLabel = dayjs(calendarDays[calendarIndex++]).format('MMMM D')
              return (
                <td key={day} className={`calendar-col`}>
                  {/* If the current day is today, give it a class so it can be highlighted. */}
                  <p className={`header-label top-label ${day === currentDate.day && currentDate.date === currentDay ? 'today-label' : ''}`}>{day}</p>
                  <hr className={`label-hr ${day === currentDate.day && currentDate.date === currentDay ? 'today-label' : ''}`} />
                  <p className={`header-label bottom-label ${day === currentDate.day && currentDate.date === currentDay ? 'today-label' : ''}`}>{dateLabel}</p>
                </td>
              )
            })}
          </tr>
        </thead>
      )

      // Next Map out hours, starting from 12 AM. Each hour is a row of 8 columns, handled with Hour.js.
      // first create a size 24 array containing strings '12 AM' thru '11 PM'
      let timeArr = [];
      let initialTime = 12;
      let period = 'AM';
      for (let i = 0; i < 24; i++) {
        if (initialTime > 12) {
          initialTime = 1;
        }
        timeArr.push(initialTime + ' ' + period);
        initialTime++;
        if (initialTime === 12) {
          period = 'PM';
        }
      }
      // Get saved event info from the database next.
      Axios.get('/api/events').then(eventData => {
        let eventArr = eventData.data.events;
        // Create an array that will contain only the current week's events, so it may be passed as a prop to each Hour.js
        let currentWeekEvents = [];
        // first create a new array consisting of days in the current week, formatted as ex. 'December 1 2020'
        let formattedCalendarDays = calendarDays.map(day => {
          return dayjs(day).format('MMMM D YYYY')
        })
        // Next go through the events from the database, and match them to the current week.
        eventArr.forEach(event => {
          // bug avoidance: unformatted date should be sent to database, and formatted once returned.
          let eventDay = dayjs(event.date).format('MMMM D YYYY');
          if (formattedCalendarDays.includes(eventDay)) {
            event['date'] = eventDay;
            currentWeekEvents.push(event);
          }
        })

        // Next, check to see if current week is shown. If so, the current hour is displayed and highlighted somewhere.
        if (currentDate.date === currentDay) {
          setHours(
            // create an Hour.js component for each string in the array. Each hour is a row in the day.
            timeArr.map((time) => {
              // if the time matches the current time (e.g. '11 AM') and the week is the current week, then currentHour is true.
              // the currentHour has a highlighted background.
              if (time === currentDate.hour) {
                return (<Hour currentWeekEvents={currentWeekEvents} calendarDays={calendarDays} time={time} key={time} currentHour={true}></Hour>)
              }
              else {
                return (<Hour currentWeekEvents={currentWeekEvents} calendarDays={calendarDays} time={time} key={time} currentHour={false}></Hour>)
              }
            })
          );
          // changeHours is used by the useEffect function of Hours.js to signal a change
          dispatch(setChangeHours())
        }
        // else, if week is not current, return Hour.js components, and currentHour is always false (so no hour is highlighted).
        else {
          setHours(
            timeArr.map((time) => {
              return (<Hour currentWeekEvents={currentWeekEvents} calendarDays={calendarDays} time={time} key={time} currentHour={false}></Hour>)
            })
          );
          dispatch(setChangeHours())
        }
      }).catch(err => {
        // an axios error will occur if the login session has been lost (i.e. during development)
        console.error(err);
        history.push('/login')
      })
    })
  }, [currentDate.weekCounter, handlePost])


  return (
    <main>
      <Container fluid >
        <table >
          {dayLabels}
          <div className='weekly-calendar-table-scroller' >
            <div className='weekly-calendar-table'>
            {hours}
            </div>
          </div>
        </table>
      </Container>
    </main>
  )
}
