import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function Clock() {
  const [time, setTime] = useState({ date: dayjs(new Date()).format('MMMM D, YYYY h:mm:ss a') });

  useEffect(() => {
    const tick = setInterval(() => {
      setTime({ date: dayjs(new Date()).format('MMMM D, YYYY h:mm:ss a') })
    }, 1000)

    return () => {
      clearInterval(tick)
    }
  }, [])

  return (
    <h5 className='clock'>
      {time.date}
    </h5>
  )
}