// import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import WeekView from './WeekView/WeekView';
import NavMenu from './NavMenu';
import { setCurrentDate, selectCurrentDate } from '../redux/dateSlice';
import { useSelector, useDispatch } from 'react-redux';
import MonthView from './MonthView/MonthView';
var dayjs = require('dayjs');
export default function Home() {
    var day = dayjs().format('dddd'); // the name of today, ex. "Tuesday"
    var date = dayjs().format('MMMM D'); // format ex. 'December 1'
    var hour = dayjs().format('h A'); // format ex. '11 PM'
    var _a = useState(React.createElement(React.Fragment, null)), calendar = _a[0], setCalendar = _a[1]; // renders the Calendar.js component
    var _b = useState(0), weekCounter = _b[0], setWeekCounter = _b[1]; // keeps track of the days of the week, in increments of 7
    var _c = useState(true), displayingWeek = _c[0], setDislayingWeek = _c[1];
    var dispatch = useDispatch();
    var currentDate = useSelector(selectCurrentDate);
    /** Set the current date upon first render. */
    useEffect(function () {
        dispatch(setCurrentDate({
            day: day,
            date: date,
            hour: hour,
            weekCounter: weekCounter
        }));
    }, []);
    /** Back button. Sets calendar back 7 days, then re-renders calendar days. */
    var back = function () {
        // Note: set new week variable to avoid bugs related to async and stale state
        var week = weekCounter - 7;
        date = dayjs(new Date(new Date().setDate(new Date().getDate() + week))).format('MMMM D');
        setWeekCounter(week);
        dispatch(setCurrentDate({
            day: day,
            date: date,
            hour: hour,
            weekCounter: week
        }));
    };
    /** Forward button. Sets calendar forward 7 days, then re-renders calendar days. */
    var forward = function () {
        var week = weekCounter + 7;
        date = dayjs(new Date(new Date().setDate(new Date().getDate() + week))).format('MMMM D');
        console.log(date);
        setWeekCounter(week);
        dispatch(setCurrentDate({
            day: day,
            date: date,
            hour: hour,
            weekCounter: week
        }));
    };
    /** Goes to the current week, and scrolls the current time into view. */
    var goToToday = function () {
        dispatch(setCurrentDate({
            day: day,
            date: date,
            hour: hour,
            weekCounter: 0
        }));
        // the calendar needs to update to the current week before it can be scrolled into view.
        setTimeout(function () {
            try {
                document.getElementsByClassName('current-hour')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            catch (TypeError) {
                setTimeout(function () {
                    try {
                        document.getElementsByClassName('current-hour')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    catch (TypeError) {
                        console.error(TypeError);
                    }
                }, 700);
            }
        }, 300);
    };
    // upon getting the date (changeable by forward and back buttons) re-render the calendar
    useEffect(function () {
        if (currentDate.day) {
            if (displayingWeek) {
                setCalendar(React.createElement(WeekView, null));
            }
            else {
                setCalendar(React.createElement(MonthView, null));
            }
        }
        return function () {
            setCalendar(React.createElement(React.Fragment, null));
        };
    }, [currentDate]);
    var weeklyViewSwitch = function () {
        setCalendar(React.createElement(WeekView, null));
        setDislayingWeek(true);
    };
    var monthlyViewSwitch = function () {
        setCalendar(React.createElement(MonthView, null));
        setDislayingWeek(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(NavMenu, { goToToday: goToToday }),
        React.createElement("div", { className: 'btn-container' },
            React.createElement("button", { className: 'btn btn-success', id: 'back-btn', onClick: back }, "Back"),
            React.createElement("button", { className: 'btn btn-success', id: 'forward-btn', onClick: forward }, "Forward"),
            React.createElement("div", { id: 'empty-btn-div' }),
            React.createElement("button", { className: 'btn btn-secondary btn', id: 'weekly-view', onClick: weeklyViewSwitch }, "Week"),
            React.createElement("button", { className: 'btn btn-secondary btn', id: 'monthly-view', onClick: monthlyViewSwitch }, "Month")),
        calendar));
}
