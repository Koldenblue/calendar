import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Day from './Day';
export default function MonthView() {
    var _a = useState(dayjs().format('MMMM')), currentMonth = _a[0], setCurrentMonth = _a[1]; // format example 'December'
    var _b = useState(dayjs().format('YYYY')), currentYear = _b[0], setCurrentYear = _b[1]; // format ex. '2020'
    var _c = useState(0), monthChange = _c[0], setMonthChange = _c[1]; // the offset from the current month
    var _d = useState(React.createElement(React.Fragment, null)), days = _d[0], setDays = _d[1];
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // TODO
    useEffect(function () {
        // get the dayjs() object of the first day of the current month, ex. "December 1 2020". Modify by the monthChange offset.
        var firstDate = dayjs().month(dayjs().month() + monthChange).date(1);
        setCurrentMonth(firstDate.format('MMMM'));
        setCurrentYear(firstDate.format("YYYY"));
        // finally, get the day the the first day of the month was on, ex "Tuesday"
        var firstDay = dayjs(firstDate).format('dddd');
        // With the day of the month, now we can properly chart out the mini calendar starting from the proper column
        var dayIndex = dayNames.indexOf(firstDay);
        // get number of days in the current month
        // the below is equiv to ex. dayjs("2020-12-01").daysInMonth() 
        var daysInMonth = firstDate.daysInMonth();
        // calculate the number of weeks in a month. Then make a new array of that length.
        var numWeeksArr = new Array(Math.ceil((daysInMonth + dayIndex) / 7)).fill(0);
        var firstWeek = true;
        var secondWeek = true;
        // use dateNum to keep track of date on miniCalendar
        var dateNum = 1;
        // map out the rows of weeks. Each MiniDay.js component is a table row, consisting of a week.
        setDays(React.createElement("table", { className: 'mini-table' },
            React.createElement("tbody", null, numWeeksArr.map(function (a) {
                if (firstWeek) {
                    // now dateNum is the first day of the second week, ex. Dec. 6
                    dateNum += (7 - dayIndex);
                    firstWeek = false;
                    return (React.createElement(Day, { key: dateNum, firstWeek: true, dayIndex: dayIndex, monthChange: monthChange, dayNames: dayNames }));
                }
                else {
                    if (secondWeek) {
                        secondWeek = false;
                    }
                    else {
                        // increase the date number by 7 every week after the second
                        dateNum += 7;
                    }
                    return (React.createElement(Day, { key: dateNum + 1, daysInMonth: daysInMonth, firstWeek: false, dateNum: dateNum, monthChange: monthChange, dayNames: dayNames }));
                }
            }))));
        console.log(days);
    }, [monthChange]);
    var backMonth = function () {
        setMonthChange(monthChange - 1);
    };
    var forwardMonth = function () {
        setMonthChange(monthChange + 1);
    };
    return (React.createElement("div", { className: 'month-view-component' },
        React.createElement("table", null,
            React.createElement("div", { className: 'calendar-table-scroller' },
                React.createElement("div", { className: 'calendar-table' },
                    React.createElement("p", { className: 'month' },
                        currentMonth,
                        ", ",
                        currentYear),
                    days)))));
}
