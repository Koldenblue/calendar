import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { selectCurrentDate, setChangeHours, selectHandlePost } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
import MiniDay from './MiniDay';

export default function MiniCalendar() {
  let currentDate = useSelector(selectCurrentDate);
  let currentMonth = dayjs().format('MMMM');      // format example 'December'
  let currentYear = dayjs().format('YYYY');         // format ex. '2020'
  const [miniDays, setMiniDays] = useState();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  useEffect(() => {
    console.log(currentMonth);
    console.log(currentYear);
    console.log(currentDate);
    // create a string of the first day of the current month, ex. "December 1 2020"
    let firstDate = currentMonth + ' 1 ' + currentYear;
    console.log(firstDate)
    // convert the string to ISO format
    firstDate = dayjs(firstDate)
    console.log(firstDate)

    // finally, get the day the the first day of the month was on, ex "Tuesday"
    let firstDay = dayjs(firstDate).format('dddd')
    console.log(firstDay)

    // With the day of the month, now we can properly chart out the mini calendar starting from the proper column
    let dayIndex = days.indexOf(firstDay);
    console.log(dayIndex)

    // next can map out how many days are in the current month
    console.log(dayjs().month())
    console.log(dayjs([2020, 2, 31]))
    // get number of days in the current month
    let daysInMonth = dayjs(`${dayjs().year()}-${dayjs().month() + 1}-01`).daysInMonth()

    let numDaysArr = new Array(daysInMonth).fill(0)
    console.log(numDaysArr)
    let firstWeek = true;
    let col = -1;
    let newRow = true;
    setMiniDays(
      <table>
        {numDaysArr.map(a => {
          if (firstWeek) {
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
            return (
              <MiniDay
                daysInMonth={daysInMonth}
                firstWeek={false}
              >
              </MiniDay>
            )
          }
        })}
      </table>)
    console.log(miniDays)
  }, [])


  return (<>
    {miniDays}
  </>)
}