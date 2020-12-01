import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hour from './Hour';


export default function Calendar() {
  const [hours, setHours] = useState();

  // map out hours, starting from 12 AM
  useEffect(() => {
    // first create an array containing strings '12 AM' thru '11 PM'
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

    // create an Hour component for each string in the array. Each hour is a row in the day.
    setHours(
      timeArr.map((time) => {
        return (
          <Hour time={time} key={time}></Hour>
        )
      })
    );
  },[]);

  return (
    <main>
      <Container fluid>
        <Row>
          <Col md={2} />
          <Col>Sunday</Col>
          <Col>Monday</Col>
          <Col>Tuesday</Col>
          <Col>Wednesday</Col>
          <Col>Thursday</Col>
          <Col>Friday</Col>
          <Col>Saturday</Col>
          <Col md={3}></Col>
        </Row>

        {/* hours here */}
        {hours}
      </Container>
    </main>
  )
}
