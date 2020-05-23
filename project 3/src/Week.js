import React from 'react'
import Day from './Day'

export default function Week( {daysOfTheWeek} ) {
    console.log("dupa")
    return (
        <div className="week-row">
            {daysOfTheWeek.map((dayNumber, index) => {
                return <Day dayNumber={daysOfTheWeek[index]} key={index}/>
            })}
        </div>
    )
}
