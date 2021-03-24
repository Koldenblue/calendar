import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Day from './Day';

export default function MonthView() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('MMMM'));      // format example 'December'
  const [currentYear, setCurrentYear] = useState(dayjs().format('YYYY'));         // format ex. '2020'
  const [monthChange, setMonthChange] = useState(0);    // the offset from the current month
  const [days, setDays] = useState(<></>);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // TODO

  useEffect(() => {
    // get the dayjs() object of the first day of the current month, ex. "December 1 2020". Modify by the monthChange offset.
    let firstDate = dayjs().month(dayjs().month() + monthChange).date(1)
    setCurrentMonth(firstDate.format('MMMM'))
    setCurrentYear(firstDate.format("YYYY"))
    // finally, get the day the the first day of the month was on, ex "Tuesday"
    let firstDay = dayjs(firstDate).format('dddd')

    // With the day of the month, now we can properly chart out the mini calendar starting from the proper column
    let dayIndex = dayNames.indexOf(firstDay);

    // get number of days in the current month
    // the below is equiv to ex. dayjs("2020-12-01").daysInMonth() 
    let daysInMonth = firstDate.daysInMonth()

    // calculate the number of weeks in a month. Then make a new array of that length.
    let numWeeksArr = new Array(Math.ceil((daysInMonth + dayIndex) / 7)).fill(0)
    let firstWeek = true;
    let secondWeek = true;
    // use dateNum to keep track of date on miniCalendar
    let dateNum = 1;
    // map out the rows of weeks. Each MiniDay.js component is a table row, consisting of a week.
    setDays(
      <table className='mini-table'>
        <tbody>
          {numWeeksArr.map(a => {
            if (firstWeek) {
              // now dateNum is the first day of the second week, ex. Dec. 6
              dateNum += (7 - dayIndex)
              firstWeek = false;
              return (
                <Day
                  key={dateNum}
                  firstWeek={true}
                  dayIndex={dayIndex}
                  monthChange={monthChange}
                  dayNames={dayNames}
                >
                </Day>
              )
            }
            else {
              if (secondWeek) {
                secondWeek = false;
              }
              else {
                // increase the date number by 7 every week after the second
                dateNum += 7;
              }
              return (
                <Day
                  key={dateNum + 1}
                  daysInMonth={daysInMonth}
                  firstWeek={false}
                  dateNum={dateNum}
                  monthChange={monthChange}
                  dayNames={dayNames}
                >
                </Day>
              )
            }
          })}
        </tbody>
      </table>)
    console.log(days)
  }, [monthChange])

  const backMonth = () => {
    setMonthChange(monthChange - 1)
  }

  const forwardMonth = () => {
    setMonthChange(monthChange + 1)
  }

  return (
    <div className='month-view-component'>
      <table>
        <div className='calendar-table-scroller' >
          <div className='calendar-table'>
            <p className='month'>{currentMonth}, {currentYear}</p>
            {days}
          </div>
        </div>
      </table>
    </div>
  )
}