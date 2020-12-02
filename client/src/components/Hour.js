import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** An hour consisting of 8 columns. First column is the time. 
 * The remaining 7 columns correspond to days of the week. */
export default function Hour(props) {
  const [columns, setColumns] = useState();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const recordEvent = (event) => {
    console.log("hello")
    console.log(event.target.id)
  }

  // set 1 column per day. Each column has an id formatted like '12am-monday'
  useEffect(() => {
    setColumns(
      <Row>
        <Col md={2}>{props.time}</Col>
        {days.map(day => {
          return(
            <Col 
              className='event-column' 
              id={`${props.time.split(' ').join('').toLowerCase()}-${day}`}
              key={`${props.time.split(' ').join('').toLowerCase()}-${day}`}
              onClick={(event) => recordEvent(event)}
            ></Col>
          )
        })}
        <Col md={3} />
      </Row>
    )
  }, [])

  return (
    <section>
      {columns}
    </section>
  )
}