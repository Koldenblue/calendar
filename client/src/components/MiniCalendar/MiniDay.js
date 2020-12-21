import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { setCurrentDate, selectCurrentDate } from '../../redux/dateSlice';

export default function MiniDay(props) {
  let currentDate = useSelector(selectCurrentDate);
  let todayDate = dayjs().date();   // the number of today's date, ex "19" for december 19
  const dispatch = useDispatch();


  /** dayClicked is the date clicked, ex '19'. monthChange is the offset from the current month. */
  const goToWeek = (dayClicked, monthChange, col) => {
    // set currentDate week Counter when a day on the mini calendar is clicked,
    // so that the main calendar jumps to the date clicked
    // accomplish this by using dayjs diff between todayDate and date clicked
    console.log(dayClicked)
    console.log(monthChange)
    console.log('col', col)

    // log the dayjs object of the clicked date
    let daysFromToday = dayjs().month(dayjs().month() + monthChange).date(dayClicked)
    console.log(daysFromToday)

    // get the difference in days between today and the clicked date
    let dayDiff = daysFromToday.diff(dayjs(), 'hour')
    // rounding errors will result from getting the difference in days, so get them in hours, convert to days, and round down
    dayDiff = Math.ceil(dayDiff / 24)
    console.log('daydiff', dayDiff)

    // finally, dispatch the week for current date in order to change the calendar week
    let today = props.days.indexOf(dayjs().format('dddd'))
    console.log('index of today', today)

    // must normalize to multiples of 7, taking into account that week should start with sunday (so add todayIndex to diff)
    // ex. 1 week from now is 7, two weeks from now is 14, etc.
    let week = Math.floor((dayDiff + today) / 7) * 7

    console.log('week', week)
    let date = dayjs(new Date(new Date().setDate(new Date().getDate() + week))).format('MMMM D');
    // problem: currentdate.date
    dispatch(setCurrentDate({
      day: currentDate.day,
      date: date,
      hour: currentDate.hour,
      weekCounter: week
    }))
  }


  // if already past the first week, no need for starting with blank spaces
  if (!props.firstWeek) {
    let weekArr = new Array(7)
    let dateNum = props.dateNum;
    for (let i = 0; i < 7; i++) {
      dateNum <= props.daysInMonth ? weekArr.push(dateNum++) : weekArr.push(false)
    }
    // colNum is the column that the date appears in, columns 0 thru 6
    let colNum = 0;
    return (<>
      <tr className='mini-row'>
        {weekArr.map((date) => {
          if (date) {
            let col = colNum;
            colNum++;
            if (colNum > 6) {
              colNum = 0;
            }
            return (
              // class given in order to highlight today's date
              <td className={props.monthChange === 0 && date === todayDate ? 'current-mini-date' : ''}
                onClick={() => goToWeek(date, props.monthChange, col)}
              >
                {date}
              </td>
            )
          }
          // if no date, return an empty table square
          else {
            return (<td> </td>)
          }
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
    let colNum = 0;
    return(<tr className='mini-row'>
      {weekArr.map((hasDay) => {
        let col = colNum;
        colNum++;
        if (hasDay) {
          dateNum++;
          // need a second variable for clicked num, or else dateNum clicked will always be the same for each day
          let clickedNum = dateNum;
          return (
            <td className={props.monthChange === 0 && dateNum === todayDate ? 'current-mini-date' : ''}
              onClick={() => goToWeek(clickedNum, props.monthChange, col)}
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