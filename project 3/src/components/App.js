import React, { useState, useEffect, useReducer } from 'react';
import Calendar from './Calendar'
import DayEditor from './DayEditor'
import EventEditor from './EventEditor'
import { format, getMonth, getDay, getDaysInMonth, getDate, getYear, parseISO} from 'date-fns'
import MonthOfEvents from '../datacomponents/MonthOfEvents';

function App() {

  console.log("render")
  
  const [year, setYear] = useState(getYear(new Date()))
  const [month, setMonth] = useState(getMonth(new Date()))
  const [dayNumber, setDayNumber] = useState(getDaysInMonth(new Date()))
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeComponent, setActiveComponent] = useState(
    <Calendar
      date={currentDate}
      getNextMonth={getNextMonth}
      getPrevMonth={getPrevMonth}
      handlePick={handlePick}
    />)
    const [onPick, setOnPick] = useState(false)
    const [pickedDate, setPickedDate] = useState()
    //const [fetching, setFetching] = useState(false)
    const [events, setEvents] = useState()

    console.log(currentDate)

    useEffect(() => {
      console.log("FIRST FETCH")
      // API call
      fetch(`api/events/${format(currentDate, "yyyy-M")}`)
        .then(response => response.json())
        .then(data => {
          setEvents(MonthOfEvents.getFromJSON(data.eventsLists))
          console.log("json: " + data)
        })
    }, [currentDate])

    useEffect(() => {
      console.log("MONTH CHANGED " + month)
      setCurrentDate(new Date(year, month, 1))
    }, [month])

    useEffect(() => {
      console.log("DATE WAS PICKED " + pickedDate)
      console.log("ON PICK is " + onPick)
      if(onPick === true) {
        setCurrentDate(pickedDate)
        ShowDayEditor(pickedDate)
        console.log("ACTIVE COMPONENT WAS CHANGED")
      }
    }, [pickedDate, onPick])

    useEffect(() => {
      if(onPick === false) ShowCalendar(currentDate)
    }, [currentDate, onPick])


    function ShowCalendar(date) {
      setActiveComponent(
        <Calendar
          date={currentDate}
          getNextMonth={getNextMonth}
          getPrevMonth={getPrevMonth}
          handlePick={handlePick}
          />
        )
        if(onPick) setOnPick(false)
    }

    function ShowDayEditor(date) {
        setActiveComponent(<DayEditor date={pickedDate} close={ShowCalendar} add={ShowEventEditor}/>)
        setOnPick(true)
    }

    function ShowEventEditor(date) {
      setActiveComponent(<EventEditor date={pickedDate} close={ShowDayEditor}/>)
    }

    function getNextMonth() {
      console.log("Get next month")
      var nextMonth = month + 1
      setMonth(() => nextMonth)
    }
      
    function getPrevMonth() {
      console.log("Get previous month")
      var prevMonth = month -1
      setMonth(() => prevMonth)
    }

    function handlePick(day) {
      console.log("NOTIFY ABOUT DAY PICK")
      setPickedDate(new Date(year, month, day))
      setOnPick(true)
    }

    // function fetchData() {
    //   setFetching(true)

    //   // API call
    //   fetch(`/api/events/${format(currentDate, "yyyy-MM")}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       setEvents(MonthOfEvents.getFromJSON(data))
    //       console.log("json: " + data)
    //     })

    // }

  return (
      activeComponent
  )
}



export default App;