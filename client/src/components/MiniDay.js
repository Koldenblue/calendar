import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from 'react-redux';
import { selectChangeHours } from '../redux/dateSlice';
import dayjs from 'dayjs';

export default function MiniDay(props) {
  // if already past the first week, no need for starting with blank spaces
  if (!props.firstWeek) {
    return (<>
      <tr>
        <td></td>
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
    return(<tr>
      {weekArr.map((hasDay) => {
        if (hasDay) {
          dateNum++;
          return (<td>{dateNum}</td>)
        }
        else {
          return (<td>B</td>)
        }

      })}
    </tr>)
  
  }
}