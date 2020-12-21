import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { setCurrentDate, selectCurrentDate } from '../../redux/dateSlice';

export default function MiniDay(props) {
  let currentDate = useSelector(selectCurrentDate);
  let todayDate = dayjs().date();   // the number of today's date, ex "19" for december 19

  /** dayClicked is the date clicked, ex '19'. monthChange is the offset from the current month. */
  const goToWeek = (dayClicked, monthChange) => {
    // set currentDate week Counter when a day on the mini calendar is clicked,
    // so that the main calendar jumps to the date clicked
    // accomplish this by using dayjs diff between todayDate and date clicked
    console.log(dayClicked)
    console.log(monthChange)

    // log the dayjs object of the clicked date
    let daysFromToday = dayjs().month(dayjs().month() + monthChange).date(dayClicked)
    console.log(daysFromToday)

    // get the difference in days between today and the clicked date
    let dayDiff = daysFromToday.diff(dayjs(), 'hour')
    // rounding errors will result from getting the difference in days, so get them in hours, convert to days, and round down
    dayDiff = Math.ceil(dayDiff / 24)
    console.log(dayDiff)
  }

  // if already past the first week, no need for starting with blank spaces
  if (!props.firstWeek) {
    let weekArr = new Array(7)
    let dateNum = props.dateNum;
    for (let i = 0; i < 7; i++) {
      dateNum <= props.daysInMonth ? weekArr.push(dateNum++) : weekArr.push(' ')
    }
    return (<>
      <tr className='mini-row'>
        {weekArr.map((date) => {
          return (
            // class given in order to highlight today's date
            <td className={props.monthChange === 0 && date === todayDate ? 'current-mini-date' : ''}
              onClick={() => goToWeek(date, props.monthChange)}
            >
              {date}
            </td>
          )
        })}
      </tr>
    </>)
  }
  // if on the first week of the calendar, the first few spaces may be blank
  else {
    // create an array then map, blank or number spaces as needed
    let weekArr = [];
    let col = 0;
    let reachedFirstDay = false;
    while (col < 7) {
      // index of the first day of the month is passed down by the higher order calendar component
      if (col === props.dayIndex || reachedFirstDay) {
        weekArr.push(true);
        reachedFirstDay = true;
      }
      else {
        weekArr.push(false);
      }
      col++;
    }
    // weekArr should have the first few spaces blank until day 1 is reached
    console.log('weekArr', weekArr)
    let dateNum = 0;
    return(<tr className='mini-row'>
      {weekArr.map((hasDay) => {
        if (hasDay) {
          dateNum++;
          // need a second variable for clicked num, or else dateNum clicked will always be the same for each day
          let clickedNum = dateNum;
          return (
            <td className={props.monthChange === 0 && dateNum === todayDate ? 'current-mini-date' : ''}
              onClick={() => goToWeek(clickedNum, props.monthChange)}
            >
              {dateNum}
            </td>
          )
        }
        else {
          return (<td> </td>)
        }

      })}
    </tr>)
  
  }
}