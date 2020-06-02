import React from 'react'

export default function Day( { events, dayNumber, handlePick }) {

    console.log(events)


    function handleClick(day) {
        handlePick(day)
    }

    return (
        <div className={events ? (events.length > 0 ? "day-item occupied" : "day-item") : "day-item"}>
            {dayNumber > 0 &&
                <button className="day-item-button" onClick={() => handleClick(dayNumber)}>
                    {dayNumber}
                </button>
            }
        </div>
        
    )
}
