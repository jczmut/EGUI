import React, { useState } from 'react'
import Day from './Day'
import MainWrapper from './MainWrapper'
import { format, getDay, parseISO, getDaysInMonth, getMonth, getYear } from 'date-fns'

export default function Calendar( { date, getPrevMonth, getNextMonth, handlePick} ) {

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

    function createArrayOfWeeks(daysOfTheMonth) {

        let arrayOfWeeks = []
        let weekdays = []
        for(let i=0; i<daysOfTheMonth.length; i+=7) {
    
            weekdays = []
            for(let d=i; d<=(i+6); d++) {
                if(d >= daysOfTheMonth.length) break
                weekdays.push(daysOfTheMonth[d])
            }
            arrayOfWeeks.push(weekdays)
        }
        return arrayOfWeeks
    }

    var arrayOfDays = createMonthArray(date)
    var arrayOfWeeks = createArrayOfWeeks(arrayOfDays)

    var days = []
    for(let i=0; i<arrayOfWeeks.length; i++) {
        for(let j=0; j<arrayOfWeeks[i].length; j++) {
            days.push(<Day dayNumber={arrayOfWeeks[i][j]} handlePick={handlePick} key={arrayOfWeeks[i][j]}/>)
        }
    }


    return (
        <MainWrapper>
            <div className="month-navigator header">
                <button className="prev"  onClick={getPrevMonth}>&#10094;</button>
                <div>{format(date, "MMMM yyyy")}</div>
                <button className="next" onClick={getNextMonth}>&#10095;</button>
            </div>
            <div className="weekdays-row">
                <div className="weekday-item">M</div>
                <div className="weekday-item">T</div>
                <div className="weekday-item">W</div>
                <div className="weekday-item">T</div>
                <div className="weekday-item">F</div>
                <div className="weekday-item">Sa</div>
                <div className="weekday-item">S</div>
            </div>
            <div className="month-grid">
                {days}
            </div>
           
        </MainWrapper>
    )
}

