import React from 'react'

export default function Day( { events, dayNumber, handlePick }) {


    const handleClick = (e) => {
        handlePick(e)
    }

    return (
        <div className={events ? (events.length > 0 ? "day-item occupied" : "day-item") : "day-item"}>
            {dayNumber > 0 &&
                <button className="day-item-button" onClick={e => handleClick(dayNumber)}>
                    {dayNumber}
                </button>
            }
        </div>
        
    )
}
