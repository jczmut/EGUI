import React from 'react'

export default function Day( {dayNumber, handlePick}) {

    function handleClick(day) {
        handlePick(day)
    }

    return (
        <div className="day-item">
            {dayNumber > 0 &&
                <button className="day-item-button" onClick={() => handleClick(dayNumber)}>
                    {dayNumber}
                </button>
            }
        </div>
        
    )
}
