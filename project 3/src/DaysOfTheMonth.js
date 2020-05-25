import React from 'react'
import Week from './Week'

export default function DaysOfTheMonth( {daysOfTheMonth} ) {
    let arrayOfWeeks = createArrayOfWeeks(daysOfTheMonth)

    return (
        <div className="month-grid">
            {arrayOfWeeks.map((daysOfWeek, index) => {
                return <Week daysOfTheWeek={arrayOfWeeks[index]} key={index}/>
            })}
        </div>
    )
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
