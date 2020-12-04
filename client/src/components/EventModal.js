import React, { useState, useEffect, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import { setHandlePost } from '../redux/dateSlice';
import { useDispatch } from 'react-redux';

export default function EventModal(props) {
  const [deleteBtn, setDeleteBtn] = useState();
  const [addBtn, setAddBtn] = useState();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();

  /** This function takes place when modal is shown. */
  useEffect(() => {
    // Check to see if the chosen calendar date already has a calendar event when modal is shown.
    if (props.show) {
      nameRef.current.focus();
      if (props.targetId) {
        setAddBtn(<button type='submit' className='btn btn-primary'>Update Event</button>);
        // the regular button automatically submits the form (and runs addEvent()), but the Bootstrap component Button runs the function without submitting the form.
        setDeleteBtn(<Button onClick={deleteEvent} className='btn btn-danger'>Delete Event</Button>);
        // if showing the modal, and the targetId is not null (i.e. yes there already is an event) then set text fields to saved event info
        Axios.get('/api/fillmodal/' + props.targetId).then(data => {
          nameRef.current.value = data.data.name;
          locationRef.current.value = data.data.location;
          descriptionRef.current.value = data.data.description;
        })
      }
      // if no saved event is present, then there is no delete button and the submit btn will read "add" instead of "update"
      else{
        setAddBtn(<button type='submit' className='btn btn-primary'>Add Event</button>);
        setDeleteBtn();
      }
    }
  }, [props.show])

  /** Function that runs when modal is submitted.
   * First gets values from the modal form. Then updates database. */
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
    // if the target time already has an event and is being updated, then props.targetId will have a value. otherwise it is null
    if (props.targetId) { 
      calendarEvent['targetId'] = props.targetId;
      // update the database using a 'put' call
      Axios.put('/api/events', calendarEvent).then(data => {
        // re-render calendar with new event after posting to database
        dispatch(setHandlePost());
      })
    }
    else {
      // post new event data to database
      Axios.post('/api/events', calendarEvent).then(data => {
        // re-render calendar with new event after posting to database
        dispatch(setHandlePost());
      })
    }

    // Finally, close the modal.
    props.handleClose();
  }

  const deleteEvent = () => {
    // axios delete must be sent with 'params' key configured. the params value may then be accessed with req.query on the backend
    Axios.delete('/api/events', {params: {targetId: props.targetId } }).then(data => {
      dispatch(setHandlePost());
      props.handleClose();
    }).catch(err => console.error(err));
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
            <Modal.Title>
              Set event for: {props.targetHour},
              <br />
              {props.targetDate}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="event-name">
              <Form.Label>Event Name</Form.Label>
              <Form.Control required type="text" placeholder="" ref={nameRef} />
            </Form.Group>

            <Form.Group controlId="event-location">
              <Form.Label>Event Location</Form.Label>
              <Form.Control type="text" placeholder="" ref={locationRef} />
            </Form.Group>

            <Form.Group controlId="event-description">
              <Form.Label>Event Description</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descriptionRef} />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
          </Button>
            {deleteBtn}
            {addBtn}
          </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
}