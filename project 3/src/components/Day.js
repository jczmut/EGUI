import React from 'react'

export default function Day( { events, dayNumber, handlePick }) {


    function handleClick(day) {
        handlePick(day)
    }

    return (
        // events ? (events.length > 0 ? "day-item" : "day-item occupied") : 
        <div className={events ? (events.length > 0 ? "day-item" : "day-item occupied") : "day-item"}>
            {dayNumber > 0 &&
                <button className="day-item-button" onClick={() => handleClick(dayNumber)}>
                    {dayNumber}
                </button>
            }
        </div>
        
    )
}
