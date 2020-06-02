import React from 'react'

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
                {event.time}
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
