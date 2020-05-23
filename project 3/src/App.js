import React, { useState } from 'react';
import Calendar from './Calendar'

function App() {
  const [month, setMonth] = useState(CURRENTMONTH)
  return (
    <Calendar month={month}/>
  )
}

const CURRENTMONTH = {
    days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    startingWeekday: 0
  }

export default App;
