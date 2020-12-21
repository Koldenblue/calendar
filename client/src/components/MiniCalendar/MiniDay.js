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
  else {
    // create an array then map, blank or number spaces as needed
    let weekArr = [];
    let col = 0;
    let reachedFirstDay = false;
    while (col < 7) {
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
          return (
            <td className={props.monthChange === 0 && dateNum === todayDate ? 'current-mini-date' : ''}
              onClick={() => goToWeek(dateNum, props.monthChange)}
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