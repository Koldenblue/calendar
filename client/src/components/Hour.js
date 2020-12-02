import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventModal from "./EventModal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/** An hour consisting of 8 columns. First column is the time. 
 * The remaining 7 columns correspond to days of the week. */
export default function Hour(props) {
  const [columns, setColumns] = useState();
  const [eventModal, setEventModal] = useState();
  const [show, setShow] = useState(false);
  const [targetHour, setTargetHour] = useState();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModal = (event) => {
    // console.log(event.target.id)
    // console.log(event.target.dataset.value)
    // show modal to get user input
    setTargetHour(event.target.dataset.value)
    handleShow();
  }

  // set 1 column per day. Each column has an id formatted like '12am-monday'.
  // Each column also has dataset.value formatted as '12 AM Monday'
  useEffect(() => {
    setColumns(
      <Row>
        <Col className='time-col' md={2}>{props.time}</Col>
        {days.map(day => {
          return(
            <Col 
              className='event-column' 
              id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              data-value={`${props.time} ${day}`}
              onClick={(event) => openModal(event)}
            ></Col>
          )
        })}
        <Col md={3} />
      </Row>
    )
  }, [])

  return (
    <section>
      <EventModal 
        show={show}
        handleClose={handleClose}
        backdrop="static"
        keyboard={false}
        targetHour={targetHour}
      />
      {columns}
    </section>
  )
}