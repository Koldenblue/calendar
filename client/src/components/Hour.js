import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Hour(props) {
  return (
    <section>
      <Row>
        <Col md={2}>{props.time}</Col>
        <Col className='event-column'></Col>
        <Col className='event-column'></Col>
        <Col className='event-column'></Col>
        <Col className='event-column'></Col>
        <Col className='event-column'></Col>
        <Col className='event-column'></Col>
        <Col className='event-column'></Col>
        <Col md={3} />

      </Row>
    </section>
  )
}