import React, { useState, useEffect } from 'react';
import Calendar from './Calendar'
import DayEditor from './DayEditor'
import './app.css'

function App() {

  const [activeComponent, setActiveComponent] = useState(<Calendar />)
  const [onDayPick, setDayPick] = useState()

   function callback(date) {
     showDayEditor(date)
   }
  

  function showCalendar(year, month) {
    setActiveComponent(<Calendar year={year} month={month} callback={() =>callback()}/>)
  }

  function showDayEditor(date) {
    setActiveComponent(<DayEditor date={date}/>)
  }

  return (
    activeComponent
  )
}

export default App;