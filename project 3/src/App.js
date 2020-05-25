import React, { useState } from 'react';
import Calendar from './Calendar'
import './app.css'
import {format, parseISO, getMonth, getDay, getDaysInMonth, getYear} from 'date-fns'

function App() {
  const monthArray = createCurrentMonthArray()
  const [month, setMonth] = useState(monthArray)

  return (
    <Calendar month={month}/>
  )
}

function createCurrentMonthArray() {
  var today = format(new Date(), "yyyy-MM-dd")
  var formattedDateString = today.replace(/-/g, ',')
  var monthNumber = getMonth(new Date(formattedDateString)) + 1
  var dayCount = getDaysInMonth(new Date(formattedDateString))
  var startingWeekday = (getDay(new Date(`${getYear(formattedDateString)}, ${monthNumber+1}, 1`)) + 6) % 7
  console.log(today)
  console.log(monthNumber)
  console.log(dayCount)
  console.log(startingWeekday)
  var arrayOfDays = []
  for(let i=0; i<startingWeekday; i++) {
    arrayOfDays.push(0)
  }
  for(let i=0; i<dayCount; i++) {
    arrayOfDays.push(i+1)
  }
  return arrayOfDays
}


export default App;