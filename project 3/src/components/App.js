import React, { useState, useEffect } from 'react';
import Calendar from './Calendar'
import DayEditor from './DayEditor'
import EventEditor from './EventEditor'
import EventAdder from './EventAdder'
import { format, getMonth, getDate, getYear } from 'date-fns'
import MonthOfEvents from '../datacomponents/MonthOfEvents';

function App() {

  const [activeComponentName, setActiveComponentName] = useState('calendar')
  const [year, setYear] = useState(getYear(new Date()))
  const [month, setMonth] = useState(getMonth(new Date()))
  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthOfEvents, setMonthOfEvents] = useState(new MonthOfEvents())

    useEffect(() => {
      // API call
      fetch(`api/events/${format(currentDate, "yyyy-M")}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          // set the array of arrays of events for this month
          setMonthOfEvents(MonthOfEvents.getFromJSON(data))
        })
    }, [])

    const [onPick, setOnPick] = useState(false)
    const [pickedDate, setPickedDate] = useState()

    useEffect(() => {
      setCurrentDate(new Date(year, month, 1))
      fetch(`api/events/${year}-${month+1}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMonthOfEvents(MonthOfEvents.getFromJSON(data))
      })
    }, [month, year, activeComponentName])

    const [pickedDayEvents, setPickedDayEvents] = useState([])

    useEffect(() => {
      if(onPick === true) {
        setCurrentDate(pickedDate)
        console.log(monthOfEvents.events[(getDate(pickedDate))])
        setPickedDayEvents(monthOfEvents.events[(getDate(pickedDate)-1)])
        setActiveComponentName('dayEditor')
      }
    }, [pickedDate, onPick])

    useEffect(() => {
      if(onPick === false) setActiveComponentName('calendar')
    }, [currentDate, onPick])

    const [editedEvent, setEditedEvent] = useState(null)

    function ShowCalendar(date) {
      setActiveComponentName('calendar')
      if(onPick) setOnPick(false)
    }

    function ShowDayEditor(date) {
        setActiveComponentName('dayEditor')
        setOnPick(true)
    }

    function ShowEventEditor(id) {
      // searching for table with proper event
      let editedEvent = monthOfEvents.events.find((eventDay) =>
          eventDay.find((event) => event.id === id)
      )
      // searching for a proper event
      editedEvent = editedEvent.find((event) => event.id === id)
      setEditedEvent(editedEvent)
      setActiveComponentName('eventEditor')
    }

    function ShowEventAdder(date) {
      setActiveComponentName('eventAdder')
    }

    function getNextMonth() {
      var nextMonth = month + 1
      if(nextMonth === 12) {
        nextMonth = 0
        setYear(() => year + 1)
      }
      setMonth(() => nextMonth)
    }
      
    function getPrevMonth() {
      var prevMonth = month -1
      if(prevMonth === -1) {
        prevMonth = 11
        setYear(() => year -1)
      }
      setMonth(() => prevMonth)
    }

    function handlePick(day) {
      setPickedDate(new Date(year, month, day))
      setOnPick(true)
    }


  switch (activeComponentName) {
    case 'calendar':
      return (
        <Calendar
          date={currentDate}
          getNextMonth={getNextMonth}
          getPrevMonth={getPrevMonth}
          handlePick={handlePick}
          events={monthOfEvents}
        />
      )
    case 'dayEditor':
      return (
        <DayEditor
          date={pickedDate}
          events={pickedDayEvents}
          close={ShowCalendar}
          modify={ShowEventEditor}
          add={ShowEventAdder}
        />
      )
      case 'eventEditor':
        return (
          <EventEditor
            event={editedEvent}
            close={ShowDayEditor}
          />
        )
        case 'eventAdder':
        return (
          <EventAdder
            date={pickedDate}
            close={ShowDayEditor}
          />
        )
      default:
        return <div>ERROR</div>
  }      
}

export default App;