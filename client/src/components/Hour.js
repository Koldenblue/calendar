import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventModal from "./EventModal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDate, selectCurrentDate, setChangeHours, selectChangeHours } from '../redux/dateSlice';

/** An hour consisting of 8 columns. First column is the time. 
 * The remaining 7 columns correspond to days of the week. */
export default function Hour(props) {
  const [columns, setColumns] = useState();
  const [eventModal, setEventModal] = useState();
  const [show, setShow] = useState(false);
  const [targetHour, setTargetHour] = useState();
  const [targetDate, setTargetDate] = useState();
  let changeHours = useSelector(selectChangeHours);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDate = useSelector(selectCurrentDate);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModal = (event) => {
    // show modal to get user input
    // console.log(props.calendarDays)/
    // console.log(event.target.dataset.date)
    setTargetDate(event.target.dataset.date);
    setTargetHour(event.target.dataset.value);
    handleShow();
  }

  // console.log(props.currentWeekEvents);

  // set 1 column per day. Each column has an id formatted like '12am-monday'.
  // Each column also has dataset.value formatted as '12 AM Monday'
  // finally, each column has dataset.date formatted as 'December 1'
  useEffect(() => {
    let calendarDateIndex = 0;
    setColumns(
      <Row>
        <Col className='time-col' md={2}>{props.time}</Col>
        {days.map(day => {
          if (calendarDateIndex > 7) {
            calendarDateIndex = 0;
          }

          let formattedToday = (props.calendarDays[calendarDateIndex]).format('MMMM D YYYY');
          let formattedTime = `${props.time} ${day}`;
          for (let i = 0, j = props.currentWeekEvents.length; i < j; i++) {
            if (formattedToday === dayjs(props.currentWeekEvents[i].date).format('MMMM D YYYY') && formattedTime === props.currentWeekEvents[i].time) {
              // console.log('true')
              // console.log(formattedToday)
              return (
                <Col
                  className={`event-column ${props.currentHour ? 'current-hour' : ''}`}
                  id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
                  key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
                  data-value={`${props.time} ${day}`}
                  data-date={`${dayjs(props.calendarDays[calendarDateIndex++]).format('MMMM D YYYY')}`}
                  onClick={(event) => openModal(event)}
                >
                  <p>{props.currentWeekEvents[i].name}</p>
                  <p>{props.currentWeekEvents[i].location}</p>
                  <p>{props.currentWeekEvents[i].description}</p>

                </Col>
              )
            }
          }
          return (
            <Col
              className={`event-column ${props.currentHour ? 'current-hour' : ''}`}
              id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              data-value={`${props.time} ${day}`}
              data-date={`${dayjs(props.calendarDays[calendarDateIndex++]).format('MMMM D YYYY')}`}
              onClick={(event) => openModal(event)}
            ></Col>
          )
        })}
        <Col md={3} />
      </Row>
    )
    // if re-rendered when currentDate.weekCounter changes, this rerenders first before the useEffect of Calendar takes place
    // so redux state changeHours is dispatch to trigger this useEffect and the re-render
  }, [changeHours])

  // if props.currentHour, change background color

  return (
    <section>
      <EventModal
        show={show}
        handleClose={handleClose}
        backdrop="static"
        keyboard={false}
        targetHour={targetHour}
        targetDate={targetDate}
      />
      {columns}
    </section>
  )
}