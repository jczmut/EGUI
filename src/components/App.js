import React, { useState, useEffect } from 'react';
import Calendar from './Calendar'
import DayEditor from './DayEditor'
import EventEditor from './EventEditor'
import { format, getMonth, getDay, getDaysInMonth, getDate, getYear, parseISO} from 'date-fns'
import MonthOfEvents from '../datacomponents/MonthOfEvents';

function App() {

  console.log("render")
  
  const [fetching, setFetching] = useState(true)
  const [year, setYear] = useState(getYear(new Date()))
  const [month, setMonth] = useState(getMonth(new Date()))
  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthOfEvents, setMonthOfEvents] = useState(new MonthOfEvents())

    useEffect(() => {
      console.log("FIRST FETCH")
      // API call
      fetch(`api/events/${format(currentDate, "yyyy-M")}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setMonthOfEvents(MonthOfEvents.getFromJSON(data))
        })
        return() => {
          setFetching(false)
        }
    }, [])


    const [activeComponent, setActiveComponent] = useState(
    <Calendar
      date={currentDate}
      getNextMonth={getNextMonth}
      getPrevMonth={getPrevMonth}
      handlePick={handlePick}
      events={monthOfEvents}
    />)
    const [onPick, setOnPick] = useState(false)
    const [pickedDate, setPickedDate] = useState()

    useEffect(() => {
      console.log("MONTH CHANGED " + month)
      console.log("YEAR CHANGED " + year)
      setCurrentDate(new Date(year, month, 1))
      setFetching(true)
      fetch(`api/events/${year}-${month+1}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMonthOfEvents(MonthOfEvents.getFromJSON(data))
      })
      return() => {
        setFetching(false)
      }
    }, [month, year])

    const [pickedDayEvents, setPickedDayEvents] = useState([])

    useEffect(() => {
      if(onPick === true) {
        setCurrentDate(pickedDate)
        console.log("PICKED DAY " + getDate(pickedDate))
        console.log(monthOfEvents.events[(getDate(pickedDate))])
        setPickedDayEvents(monthOfEvents.events[(getDate(pickedDate))])
        ShowDayEditor(pickedDate)
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
        console.log("SHOW DAYEDITOR: "  + pickedDayEvents)
        setActiveComponent(<DayEditor date={pickedDate} events={pickedDayEvents} close={ShowCalendar} add={ShowEventEditor}/>)
        setOnPick(true)
    }

    function ShowEventEditor(date) {
      setActiveComponent(<EventEditor date={pickedDate} close={ShowDayEditor}/>)
    }

    function getNextMonth() {
      console.log("Get next month")
      var nextMonth = month + 1
      if(nextMonth === 12) {
        nextMonth = 0
        setYear(() => year + 1)
      }
      setMonth(() => nextMonth)
    }
      
    function getPrevMonth() {
      console.log("Get previous month")
      var prevMonth = month -1
      if(prevMonth === -1) {
        prevMonth = 11
        setYear(() => year -1)
      }
      setMonth(() => prevMonth)
    }

    function handlePick(day) {
      console.log("NOTIFY ABOUT DAY PICK")
      setPickedDate(new Date(year, month, day))
      setOnPick(true)
    }

  return (
      activeComponent
  )
}



export default App;