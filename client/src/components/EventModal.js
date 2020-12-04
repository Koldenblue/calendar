import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import { setCurrentDate, selectCurrentDate, setHandlePost } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
const dayjs = require('dayjs');

export default function EventModal(props) {
  const dispatch = useDispatch();
  let currentDate = useSelector(selectCurrentDate);

  useEffect(() => {
    // Check to see if target already has an event when modal is shown.
    if (props.show) {
      console.log('showing', props.show)
      console.log(props)
      // problem: targetId is now always set in time. see hour.js openModal()
      if (props.targetId) {
        console.log('has an event')

        // if showing the modal, and the targetId is not null (i.e. already has an event) then set text fields and delete button
        Axios.get('/api/fillmodal/' + props.targetId).then(data => {
          console.log(data)
          console.log('axios call')
          console.log('=============================')
        })
      }
    }
  }, [props.show])

  /** gets values from the event modal form. Then adds to database. */
  const addEvent = (event) => {
    event.preventDefault();
    // get values from form.
    let eventName = event.target[1].value;
    let eventLocation = event.target[2].value;
    let eventDescription = event.target[3].value;
    let calendarEvent = {
      date: props.targetDate,
      time: props.targetHour,
      name: eventName,
      location: eventLocation,
      description: eventDescription
    };

    console.log(calendarEvent)
    // get date
    // TODO
    
    Axios.post('/api/events', calendarEvent).then(data => {
      console.log(data);
      // re-render calendar with new event after posting to database
      dispatch(setHandlePost())
    })
    props.handleClose();
  }

  //TODO:
  // Also add update option if event is already filled
  // add delete option
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop={props.backdrop}
        keyboard={props.keyboard}
      >
        <Form onSubmit={(event) => addEvent(event)}>

          <Modal.Header closeButton>
            <Modal.Title>
              Set event for: {props.targetHour}, 
              <br />
              {props.targetDate}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="event-name">
              <Form.Label>Event Name</Form.Label>
              <Form.Control required type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="event-location">
              <Form.Label>Event Location</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="event-description">
              <Form.Label>Event Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
          </Button>
            <button type='submit' className='btn btn-primary'>Add Event</button>
          </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
}