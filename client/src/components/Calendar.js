import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hour from './Hour';
import dayjs from 'dayjs';


export default function Calendar(props) {
  const [hours, setHours] = useState();

  // Map out hours, starting from 12 AM, and create a row of 7 days for each hour.
  useEffect(() => {
    // first create a size 24 array containing strings '12 AM' thru '11 PM'
    let initialTime = 12;
    let period = 'AM';
    let timeArr = [];
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

    console.log(props.currentDate.date)
    let currentDate =  dayjs().format('MMMM D')
    console.log(currentDate)
    // Next, check to see if current week is shown. If so, the current hour is displayed somewhere.
    if (props.currentDate.date === currentDate) {
      setHours(
        // create an Hour.js component for each string in the array. Each hour is a row in the day.
        timeArr.map((time) => {
          // if the time matches the current time (e.g. '11 AM') and the week is the current week, then currentHour is true.
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


  // TODO: media queries. if window size goes below certain amount, abbreviate the day names

  return (
    <main>
      <Container fluid>
        <Row className='day-name-row'>
          <Col md={2} />
          <Col md={1}>Sunday</Col>
          <Col md={1}>Monday</Col>
          <Col md={1}>Tuesday</Col>
          <Col md={1}>Wednesday</Col>
          <Col md={1}>Thursday</Col>
          <Col md={1}>Friday</Col>
          <Col md={1}>Saturday</Col>
          <Col md={3}></Col>
        </Row>

        {/* hours here */}
        {hours}
      </Container>
    </main>
  )
}
