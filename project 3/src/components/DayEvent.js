import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function DayEvent( { event, modifyEvent, deleteEvent } ) {

    

    const handleEdit = (e) => {
        modifyEvent(e)
    }

    const handleDelete = (e) => {
        deleteEvent(e)
    }

    return (
        <div className="event-row">
            <div>
                {format(event.dateAndTime, "HH:mm")}
            </div>
            <div>
                {event.description}
            </div>
            <div>
                <button className="day-editor-button smaller" onClick={e => handleEdit(event)}>EDIT</button>
            </div>
            <div>
            <button className="day-editor-button smaller" onClick={e => handleDelete(event)}>DELETE</button>
            </div>
            
            
        </div>
    )
}
