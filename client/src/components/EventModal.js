import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";

export default function EventModal(props) {

  /** gets values from the event modal form. Then adds to database. */
  const addEvent = (event) => {
    event.preventDefault();
    console.log('submitting')
    // get values from form.
    let eventName = event.target[1].value;
    let eventLocation = event.target[2].value;
    let eventDescription = event.target[3].value;

    let calendarEvent = {
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
    })
    // props.handleClose();
  }

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
            <Modal.Title>Set event for: {props.targetHour}</Modal.Title>
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