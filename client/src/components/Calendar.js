import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hour from './Hour';
import dayjs from 'dayjs';
import { setCurrentDate, selectCurrentDate, setChangeHours, selectChangeHours } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Calendar(props) {
  const [hours, setHours] = useState();
  const [dayLabels, setDayLabels] = useState();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDate = useSelector(selectCurrentDate);
  let changeHours = useSelector(selectChangeHours);
  let currentDayIndex = days.indexOf(currentDate.day)  // the index of today. Ex. "Wednesday" is index 3.
  let currentDay = dayjs().format('MMMM D') // ex. 'December 1'
  const dispatch = useDispatch();

  // map out calendar days. This array consists of the days of the week, ex. 'November 29' thru 'Dec 5'
  const makeDaysArray = () => {
    return new Promise(function(resolve, reject) {
      let calendarDays = [];
      days.forEach(day => {
        let calendarDay = dayjs(new Date(new Date().setDate(new Date().getDate() + days.indexOf(day) - currentDayIndex + currentDate.weekCounter)))
        calendarDays.push(calendarDay)
      })
      console.log(calendarDays)
      resolve(calendarDays);
    })
  }

  // This Effect will be run every time currentDate changes (user presses back or forward)
  // Set the top row labels, Sunday thru Sat. Add in dates as well, ex. Dec. 1
  // Today's day (ex. "Wednesday") will have the class .today-label (if on the current week)
  useEffect(() => {

    makeDaysArray().then(calendarDays => {
      // console.log(calendarDays)
      // console.log('next')
      let calendarIndex = 0;
      setDayLabels(<>
        <Col md={2} ></Col>
        {days.map(day => {
          let dateLabel = dayjs(calendarDays[calendarIndex++]).format('MMMM D')
          // let dateLabel = dayjs(calendarDays[calendarIndex++])
          return (
            <Col md={1} key={day} className={`${day === currentDate.day && currentDate.date === currentDay ? 'today-label' : ''}`}>
              <p>{day}</p>
              <p>{dateLabel}</p>
            </Col>
          )
        })}
        <Col md={3} ></Col>
      </>)

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
      // Next, check to see if current week is shown. If so, the current hour is displayed somewhere.
      // if current week:
      if (currentDate.date === currentDay) {
        // console.log('hours changing')
        // console.log('setting', calendarDays)
        setHours(
          // create an Hour.js component for each string in the array. Each hour is a row in the day.
          timeArr.map((time) => {
            // if the time matches the current time (e.g. '11 AM') and the week is the current week, then currentHour is true.
            // the currentHour has a highlighted background.
            if (time === currentDate.hour) {
              return (<Hour calendarDays={calendarDays} time={time} key={time} currentHour={true}></Hour>)
            }
            else {
              return (<Hour calendarDays={calendarDays} time={time} key={time} currentHour={false}></Hour>)
            }
          })
        );
        // changeHours is used by the useEffect function of Hours.js to signal a change
        dispatch(setChangeHours())
      }
      // else, if week is not current, return Hour.js components, and currentHour is always false.
      else {
        // console.log('hours changing 2', calendarDays)
        setHours(
          timeArr.map((time) => {
            console.log('returning')
            return (<Hour calendarDays={calendarDays} time={time} key={time} currentHour={false}></Hour>)
          })
        );
        dispatch(setChangeHours())
      }

      return () => {
        setDayLabels();
        setHours();
      }
    })
  
  }, [currentDate.weekCounter])


  // TODO: media queries. if window size goes below certain amount, abbreviate the day names

  return (
    <main>
      <Container fluid>
        <Row className='day-label-row'>
          {dayLabels}
        </Row>

        {hours}
      </Container>
    </main>
  )
}
