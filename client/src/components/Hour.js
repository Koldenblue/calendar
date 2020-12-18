import React, { useState, useEffect, useReducer } from "react";
import EventModal from "./EventModal";
import { useSelector } from 'react-redux';
import { selectChangeHours } from '../redux/dateSlice';
import dayjs from 'dayjs';


/** An hour consisting of 8 columns. First column is the time label.
 * The remaining 7 columns correspond to days of the week. */
export default function Hour(props) {
  const [columns, setColumns] = useState();     // contains jsx for the calendar columns
  // all values in this reducer state need to be managed as a single object
  const [target, dispatchTarget] = useReducer((state, action) => {
    if (action.type === 'show') {
      return ({
        targetHour: action.targetHour,
        targetDate: action.targetDate,
        targetFormattedDate: action.targetFormattedDate,
        targetId: action.targetId,
        show: true
      })
    }
    else if (action.type === 'hide') {
      return ({
        targetHour: null,
        targetDate: null,
        targetFormattedDate: null,
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
    targetFormattedDate: null,
    targetId: null,
    show: false
  })
  let changeHours = useSelector(selectChangeHours);    // this triggers the useEffect upon change


  /** Causes the modal to be hidden. */
  const handleClose = () => dispatchTarget({ type: 'hide' });


  /** When an Hour.js box is clicked, show the modal.
   * The modal is passed info, thru event.currentTarget that identifies which box was clicked. */
  const openModal = (event) => {
    console.log('current target', event.currentTarget.dataset)
    // note: event.target.dataset contains the same data as event.currentTarget.dataset, but (due to bug?) event.target.dataset is sometimes undefined.
    // note: event.target.dataset does not support any capital letters (i.e. dataset.formattedDate will become dataset.formatteddate)
    dispatchTarget({ 
      type: 'show', 
      targetHour: event.currentTarget.dataset.value,
      targetDate: event.currentTarget.dataset.date,
      targetFormattedDate: event.currentTarget.dataset.formatted,
      targetId: event.currentTarget.dataset.id
    })
  }


  // This useEffect is triggered by Calendar.js dispatch(changeHours), which in turn is triggered by the back/forward buttons in Home.js
  // Set 1 column per day. Each column has an id formatted like '12am-monday'.
  // Each column also has dataset.value formatted as '12 AM Monday'
  // Finally, each column has dataset.date formatted as 'December 1'
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let calendarDateIndex = 0;
    setColumns(
      <tr>
        {/* First column contains the time label, ex. 12 AM */}
        <td className='calendar-col time-col'>
          <div className='time-col-label'>
            {props.time}
          </div>
        </td>
        {/* Remaining 7 columns correspond to each day. */}
        {days.map(day => {
          if (calendarDateIndex > 7) {
            calendarDateIndex = 0;
          }

          let formattedToday = dayjs(props.calendarDays[calendarDateIndex]).format('MMMM D YYYY');
          let formattedTime = `${props.time} ${day}`;
          // console.log('formatted', dayjs(props.calendarDays[calendarDateIndex]).format('MMMM D'))
          console.log(props.calendarDays[calendarDateIndex])

          // Iterate through the current week's events, retrieved from the database. If an event is found, display its info.
          for (let i = 0, j = props.currentWeekEvents.length; i < j; i++) {
            if (formattedToday === props.currentWeekEvents[i].date && formattedTime === props.currentWeekEvents[i].time) {
              // bug avoidance: unformatted date should be stored in data-date as a date object and sent to database, and only formatted once used
              let formattedDate = dayjs(props.calendarDays[calendarDateIndex]).format('MMMM D')
              return (
                <td
                  className={`calendar-col event-column has-event ${props.currentHour ? 'current-hour' : ''}`}
                  id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
                  key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
                  data-value={`${props.time} ${day}`}
                  data-date={props.calendarDays[calendarDateIndex++]}
                  data-formatted={formattedDate}
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
          let formattedDate = dayjs(props.calendarDays[calendarDateIndex]).format('MMMM D')
          return (
            <td
              className={`calendar-col event-column ${props.currentHour ? 'current-hour' : ''}`}
              id={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              key={`${props.time.split(' ').join('').toLowerCase()}-${day.toLowerCase()}`}
              data-value={`${props.time} ${day}`}
              data-date={props.calendarDays[calendarDateIndex++]}
              data-formatted={formattedDate}
              onClick={(event) => openModal(event)}
              data-id={null}
            ></td>
          )
        })}
      </tr>
    )
    // this useEffect is triggered in sequence, after the useEffect function in Calendar.js
    // so redux state changeHours is dispatched to trigger this useEffect and the re-render
  }, [changeHours])


  return (<>
    <EventModal
      handleClose={handleClose}
      backdrop="static"
      keyboard={false}
      targetHour={target.targetHour}
      targetFormattedDate={target.targetFormattedDate}
      targetDate={target.targetDate}
      targetId={target.targetId}
      show={target.show}
    />
    <tbody>
      {columns}
    </tbody>
  </>)
}