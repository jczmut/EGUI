import React from 'react'
import { format } from 'date-fns'

export default function MonthNavigator( { getNextMonth, getPrevMonth, date} ) {

    return (
        <div className="month-navigator header">
            <button className="prev"  onClick={getPrevMonth}>&#10094;</button>
                {/* <img className="previous" alt="previous" src="back.svg"/> */}
                
            <div>{format(date, "MMMM yyyy")}</div>
            <button className="next" onClick={getNextMonth}>&#10095;</button>
            {/* <img className="next" alt="next" src="forward.svg"/> */}
            
        </div>
    )
}
