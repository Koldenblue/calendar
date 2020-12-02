import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hour from './Hour';
import dayjs from 'dayjs';


export default function Calendar(props) {
  const [hours, setHours] = useState();
  const [dayLabels, setDayLabels] = useState();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDayIndex =  days.indexOf(props.currentDate.day)  // the index of today. Ex. "Wednesday" is index 3.
  let currentDate = dayjs().format('MMMM D') // ex. 'December 1'

  // map out calendar days. This array consists of the days of the week, ex. 'November 29' thru 'Dec 5'
  const calendarDays = [];
  days.forEach(day => {
    let calendarDay = dayjs(new Date(new Date().setDate(new Date().getDate() + days.indexOf(day) - currentDayIndex)))
    calendarDays.push(calendarDay)
  })
  console.log(calendarDays)
  
  // new Date(new Date().setDate(new Date().getDate() - 4))

  // Map out hours, starting from 12 AM, and create a row of 7 days for each hour.
  useEffect(() => {
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
    console.log(props.currentDate)
    // Next, check to see if current week is shown. If so, the current hour is displayed somewhere.
    // if current week:
    if (props.currentDate.date === currentDate) {
      setHours(
        // create an Hour.js component for each string in the array. Each hour is a row in the day.
        timeArr.map((time) => {
          // if the time matches the current time (e.g. '11 AM') and the week is the current week, then currentHour is true.
          // the currentHour has a highlighted background.
          if (time === props.currentDate.hour ) {
            return (<Hour time={time} key={time} currentHour={true}></Hour>)
          }
          else {
            return(<Hour time={time} key={time} currentHour={false}></Hour>)
          }
        })
      );
    }
    // else, if week is not current, return Hour.js components, and currentHour is always false.
    else {
      setHours(
        timeArr.map((time) => {
          return(<Hour time={time} key={time} currentHour={false}></Hour>)
        })
      );
    }
  }, []);


  // Set the top row labels, Sunday thru Sat. Add in dates as well, ex. Dec. 1
  // Today's day (ex. "Wednesday") will have the class .today-label (if on the current week)
  useEffect(() => {
    let calendarIndex = 0;
    setDayLabels(<>
      <Col md={2} ></Col>
      {days.map(day => {
        let dateLabel = dayjs(calendarDays[calendarIndex++]).format('MMMM D')
        console.log(dateLabel)
        // let dateLabel = dayjs(calendarDays[calendarIndex++])
        return (
          <Col md={1} key={day} className={`${day === props.currentDate.day && props.currentDate.date === currentDate ? 'today-label' : ''}`}>
            <p>{day}</p>
            <p>{dateLabel}</p>
          </Col>
        )
      })}
      <Col md={3} ></Col>
    </>)
  }, [])

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
