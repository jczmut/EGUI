import React from 'react'
import Day from './Day'

export default function Week( {daysOfTheWeek, handlePick} ) {
    return (
        <div className="week-row">
            {daysOfTheWeek.map((dayNumber, index) => {
                return <Day dayNumber={daysOfTheWeek[index]} handlePick={handlePick} key={index}/>
            })}
        </div>
    )
}
