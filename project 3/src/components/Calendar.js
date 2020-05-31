import React, { useEffect, useReducer, useState } from 'react'
import MonthNavigator from './MonthNavigator'
import Weekdays from './Weekdays'
import DaysOfTheMonth from './DaysOfTheMonth'
import DayEditor from './DayEditor'
import MainWrapper from './MainWrapper'
import logger from 'use-reducer-logger'
import { format, getMonth, getDay, getDaysInMonth, getDate, getYear, parseISO} from 'date-fns'

export default function Calendar() {

    console.log("RENDER")
    
    const [onPick, setOnPick] = useState()
    const [showDayEditor, setShowDayEditor] = useState(false)

    const initialState = {
        year: getYear(new Date()),
        month: getMonth(new Date()),
        day: getDate(new Date()),
        monthArray: createMonthArray(new Date()),
        currentDate: new Date()
    }

    const actionTypes = {
        updateYear: "UPDATE_YEAR",
        updateMonth: "UPDATE_MONTH",
        updateDay: "UPDATE_DAY",
        updateMonthArray: "UPDATE_MONTH_ARRAY",
        updateCurrentDate: "UPDATE_CURRENT_DATE"
    }

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.updateYear:
                return {
                    ...state, year: action.payload
                }
            case actionTypes.updateMonth:
                return {
                    ...state, month: action.payload
                }
            case actionTypes.updateDay:
                return {
                    ...state, day: action.payload
                }
            case actionTypes.updateMonthArray:
                return {
                    ...state, monthArray: action.payload
                }
            case actionTypes.updateCurrentDate:
                return {
                    ...state, currentDate: action.payload
                }
            default: return state
        }
    }

    const [{ year, month, day, monthArray, currentDate}, dispatch] = useReducer(logger(reducer), initialState)

  // changing month
  useEffect(() => {
    console.log("MONTH CHANGED: " + month)
    
  }, [month])

   useEffect(() => {
        console.log("CURRENT DATE CHANGED")
        setOnPick(currentDate)
   }, [currentDate])

   useEffect(() => {
       console.log("ON PICK CHANGED")
       console.log(onPick)
       if(showDayEditor) setActiveComponent(<DayEditor date={onPick}/>)
   }, [onPick, showDayEditor])

    function handlePick(day) {
        console.log("NOTIFY ABOUT DAY PICK")
        var updatedYear = year
        var updatedMonth = month
        var pickedDay = day
        dispatch({
            type: 'UPDATE_CURRENT_DATE',
            payload: new Date(updatedYear, updatedMonth, pickedDay)
        })
        setShowDayEditor(true) 
    }

    const [activeComponent, setActiveComponent] = useState(
        <>
            <MonthNavigator
                    getPrevMonth={getPrevMonth}
                    getNextMonth={getNextMonth}
                    date={new Date(year, month, day)}
            />

            <Weekdays/>

            <DaysOfTheMonth
                daysOfTheMonth={monthArray}
                handlePick={handlePick}
            />
        </>
    )


    function getNextMonth() {
        console.log("Get next month")
        var nextMonth = month + 1
        var updatedMonthArray = createMonthArray(new Date(year, nextMonth, 1))
        dispatch({
            type: actionTypes.updateMonth,
            payload: nextMonth
        })
        dispatch({
            type: "UPDATE_MONTH_ARRAY",
            payload: updatedMonthArray
        })
    }
        
    function getPrevMonth() {
        console.log("Get previous month")
        var prevMonth = month -1
        var updatedMonthArray = createMonthArray(new Date(year, prevMonth, 1))

        dispatch({
            type: actionTypes.updateMonth,
            payload: prevMonth
        })
        dispatch({
            type: "UPDATE_MONTH_ARRAY",
            payload: updatedMonthArray
        })
    }
    
    function createMonthArray(date) {
        var formattedDateString = format(date, "yyyy-MM-dd")
        // console.log(date)
        // console.log("formatted string 1: " + formattedDateString)
        var monthNumber = getMonth(new Date(parseISO(formattedDateString)))
        // console.log("month number: " + monthNumber)
        var dayCount = getDaysInMonth(new Date(parseISO(formattedDateString)))
        var startingWeekday = (getDay(new Date(getYear(parseISO(formattedDateString)), monthNumber, 1)) + 6) % 7
        // console.log("dayCount: " + dayCount)
        // console.log("starting weekday: " + startingWeekday)
        var arrayOfDays = []
        for(let i=0; i<startingWeekday; i++) {
            arrayOfDays.push(0)
        }
        for(let i=0; i<dayCount; i++) {
            arrayOfDays.push(i+1)
        }
        // console.log(arrayOfDays)
        return arrayOfDays
  }


    return (
        <>
        <MainWrapper>
            <div className="calendar-container">
                {activeComponent}
            </div>
        </MainWrapper>
        {!showDayEditor &&
            <footer>
            <p className="footer-content">Calendar by Czmut</p>
        </footer>
        }
        </>
    )
}

