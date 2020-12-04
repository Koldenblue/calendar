import React, { useState, useEffect, useReducer } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventModal from "./EventModal";
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectChangeHours } from '../redux/dateSlice';


/** An hour consisting of 8 columns. First column is the time label.
 * The remaining 7 columns correspond to days of the week. */
export default function Hour(props) {
  const [columns, setColumns] = useState();
  // all values in this reducer state need to be managed as a single object
  const [target, dispatchTarget] = useReducer((state, action) => {
    if (action.type === 'show') {
      return ({
        targetHour: action.targetHour,
        targetDate: action.targetDate,
        targetId: action.targetId,
        show: true
      })
    }
    else if (action.type === 'hide') {
      return ({
        targetHour: null,
        targetDate: null,
        targetId: null,
        show: false
      })
    }
    else {
      throw new Error('reducer failed due to programmer error?')
    }
  }, {
    // initial reducer state:
    targetHour: null,
    targetDate: null,
    targetId: null,
    show: false
  })
  let changeHours = useSelector(selectChangeHours);    // this triggers the useEffect upon change
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  /** Causes the modal to be hidden. */
  const handleClose = () => dispatchTarget({type: 'hide'});


  /** When an Hour.js box is clicked, show the modal.
   * The modal is passed info, thru event.currentTarget that identifies which box was clicked. */
  const openModal = (event) => {
    // note: event.target.dataset contains the same data as event.currentTarget.dataset, but (due to bug?) event.target.dataset is sometimes undefined.
    dispatchTarget({type: 'show', targetHour: event.currentTarget.dataset.value, targetDate: event.currentTarget.dataset.date, targetId: event.currentTarget.dataset.id})
  }


  // This useEffect is triggered by Calendar.js dispatch(changeHours), which in turn is triggered by the back/forward buttons in Home.js
  // Set 1 column per day. Each column has an id formatted like '12am-monday'.
  // Each column also has dataset.value formatted as '12 AM Monday'
  // Finally, each column has dataset.date formatted as 'December 1'
  useEffect(() => {
    let calendarDateIndex = 0;
    setColumns(
      <tr>
        {/* First column contains the time label, ex. 12 AM */}
        <td className='calendar-col time-col'>{props.time}</td>
        {/* Remaining 7 columns correspond to each day. */}
        {days.map(day => {
          if (calendarDateIndex > 7) {
            calendarDateIndex = 0;
          }

          let formattedToday = (props.calendarDays[calendarDateIndex]).format('MMMM D YYYY');
          let formattedTime = `${props.time} ${day}`;
          // Iterate through the current week's events, retrieved from the database. If an event is found, display its info.
          // Could possibly make this more efficient by making deep copy of the currentWeekEvents array, then removing events as they are found.
          for (let i = 0, j = props.currentWeekEvents.length; i < j; i++) {
            if (formattedToday === dayjs(props.currentWeekEvents[i].date).format('MMMM D YYYY') && formattedTime === props.currentWeekEvents[i].time) {
              return (
                <td
                  className={`calendar-col event-column has-event ${props.currentHour ? 'current-hour' : ''}`}
                  id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
                  key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
                  data-value={`${props.time} ${day}`}
                  data-date={`${dayjs(props.calendarDays[calendarDateIndex++]).format('MMMM D YYYY')}`}
                  data-id={props.currentWeekEvents[i]._id}
                  onClick={(event) => openModal(event)}
                >
                  <p className='event-summary'>{props.currentWeekEvents[i].name}</p>
                  <p className='event-summary'>{props.currentWeekEvents[i].location}</p>
                  <p className='event-summary'>{props.currentWeekEvents[i].description}</p>
                </td>
              )
            }
          }
          // if no event is found, return a blank column.
          return (
            <td
              className={`calendar-col event-column ${props.currentHour ? 'current-hour' : ''}`}
              id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              data-value={`${props.time} ${day}`}
              data-date={`${dayjs(props.calendarDays[calendarDateIndex++]).format('MMMM D YYYY')}`}
              onClick={(event) => openModal(event)}
              data-id={null}
            ></td>
          )
        })}
      </tr>
    )
    // this useEffect must be triggered in order, after the useEffect function in Calendar.js
    // so redux state changeHours is dispatch to trigger this useEffect and the re-render
  }, [changeHours])


  return (
    <section>
      <EventModal
        handleClose={handleClose}
        backdrop="static"
        keyboard={false}
        targetHour={target.targetHour}
        targetDate={target.targetDate}
        targetId={target.targetId}
        show={target.show}
      />
      {columns}
    </section>
  )
}