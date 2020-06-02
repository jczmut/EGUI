import React, { useState, useEffect } from 'react';
import Calendar from './Calendar'
import DayEditor from './DayEditor'
import EventEditor from './EventEditor'
import axios from 'axios'
import { format, getMonth, getDay, getDaysInMonth, getDate, getYear, parseISO} from 'date-fns'
import MonthOfEvents from '../datacomponents/MonthOfEvents';
import Loader from './Loader'

function App() {

  console.log("render")

  const [activeComponentName, setActiveComponentName] = useState('calendar')
  
  const [fetching, setFetching] = useState(false)
  const [year, setYear] = useState(getYear(new Date()))
  const [month, setMonth] = useState(getMonth(new Date()))
  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthOfEvents, setMonthOfEvents] = useState(new MonthOfEvents())

    useEffect(() => {
      console.log("FIRST FETCH")
      setFetching(true)
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

    useEffect(() => {
      if(fetching){
        console.log("FETCHING")
        setActiveComponentName('loader')
      }
    }, [fetching])

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
        console.log("MONTH EVENTS: ", monthOfEvents)
        setPickedDayEvents(monthOfEvents.events[(getDate(pickedDate)-1)])
        setActiveComponentName('dayEditor')
      }
    }, [pickedDate, onPick])


    useEffect(() => {
      if(onPick === false) setActiveComponentName('calendar')
      setFetching(false)
    }, [currentDate, onPick])


    function ShowCalendar(date) {
      setActiveComponentName('calendar')
        if(onPick) setOnPick(false)
    }

    function ShowDayEditor(date) {
        setActiveComponentName('dayEditor')
        setOnPick(true)
    }

    function ShowEventEditor(date) {
      setActiveComponentName('eventEditor')
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


  switch (activeComponentName) {
    case 'loader':
      return (
        <Loader/>
      )
    case 'calendar':
      return (
        <>
        <Calendar
          date={currentDate}
          getNextMonth={getNextMonth}
          getPrevMonth={getPrevMonth}
          handlePick={handlePick}
          events={monthOfEvents}
        />
        </>
      )
    case 'dayEditor':
      return (
        <DayEditor
          date={pickedDate}
          events={pickedDayEvents}
          close={ShowCalendar}
          add={ShowEventEditor}
        />
      )
      case 'eventEditor':
        return (
          <EventEditor
            date={pickedDate}
            close={ShowDayEditor}
          />
        )
      default:
        return <div>ERROR</div>
  }      
}

export default App;