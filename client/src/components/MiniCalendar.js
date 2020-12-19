import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { selectCurrentDate, setChangeHours, selectHandlePost } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
import MiniDay from './MiniDay';

export default function MiniCalendar() {
  let currentDate = useSelector(selectCurrentDate);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM'));      // format example 'December'
  const [currentYear, setCurrentYear] = useState(dayjs().format('YYYY'));         // format ex. '2020'
  const [monthChange, setMonthChange] = useState(0);    // the offset from the current month
  const [miniDays, setMiniDays] = useState();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  useEffect(() => {
    // in order to change the month, we most change both month and year
    console.log(currentDate);
    console.log(currentMonth);

    // logs the 1st day of the month plus offset
    console.log(dayjs().month(dayjs().month() + monthChange).date(1))
    console.log(currentYear);
    console.log(dayjs().year())

    // get the dayjs() object of the first day of the current month, ex. "December 1 2020". Modify by the monthChange offset.
    let firstDate = dayjs().month(dayjs().month() + monthChange).date(1)
    // finally, get the day the the first day of the month was on, ex "Tuesday"
    let firstDay = dayjs(firstDate).format('dddd')

    // With the day of the month, now we can properly chart out the mini calendar starting from the proper column
    let dayIndex = days.indexOf(firstDay);

    // get number of days in the current month
    // the below is equiv to ex. dayjs("2020-12-01").daysInMonth() 
    let daysInMonth = firstDate.daysInMonth()
    console.log(daysInMonth)

    // calculate the number of weeks in a month. Then make a new array of that length.
    let numWeeksArr = new Array(Math.ceil((daysInMonth + dayIndex) / 7)).fill(0)
    console.log()
    console.log(numWeeksArr)
    let firstWeek = true;
    let secondWeek = true;
    // use dateNum to keep track of date on miniCalendar
    let dateNum = 1;
    setMiniDays(
      <table>
        {numWeeksArr.map(a => {
          if (firstWeek) {
            // now dateNum is the first day of the second week, ex. Dec. 6
            dateNum += (7 - dayIndex)
            firstWeek = false;
            return(
              <MiniDay
                firstWeek={true}
                dayIndex={dayIndex}
              >
              </MiniDay>
            )
          }
          else {
            if (secondWeek) {
              secondWeek = false;
            }
            else {
              dateNum += 7;
            }
            return (
              <MiniDay
                daysInMonth={daysInMonth}
                firstWeek={false}
                dateNum={dateNum}
              >
              </MiniDay>
            )
          }
        })}
      </table>)
    console.log(miniDays)
  }, [monthChange])

  const backMonth = () => {
    console.log('back clicked')
    setMonthChange(monthChange - 1)
  }
  
  const forwardMonth = () => {
    console.log('forward')
    setMonthChange(monthChange + 1)
  }

  return (<>
  <button className='btn btn-secondary' onClick={backMonth}>back month</button>
    {miniDays}
  <button className='btn btn-secondary' onClick={forwardMonth}>forward month</button>
  </>)
}