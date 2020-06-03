import React from 'react'
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
                <button className="button-item smaller" onClick={e => handleEdit(event.id)}>EDIT</button>
            </div>
            <div>
            <button className="button-item smaller" onClick={e => handleDelete(event.id)}>DELETE</button>
            </div>
            
            
        </div>
    )
}
