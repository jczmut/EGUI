import React from 'react'
import { format } from 'date-fns'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import DayEvent from './DayEvent'

export default function DayEditor( { date, events, close, add }) {

    const closeEditor = (e) => {
        close(e)
    }

    const addNew = (e) => {
        add(e)
    }

    function editEvent(event) {
        console.log("Edit")
    }

    function deleteEvent(event) {
        console.log("Delete")
    }

    var dayEvents = []
    if(events) {
        for(let i=0; i<events.length; i++) {
            dayEvents.push(<DayEvent event={events[i]} modifyEvent={editEvent} deleteEvent={deleteEvent} key={i}/>)
        }
    }

    return (
        <MainWrapper smallversion>
            <div className="day-editor">
                <header className="small-header">
                    <h2>{format(date, "dd MMMM yyyy")}</h2>
                </header>
                
                <div>
                    <div className="events-header">
                        <div>TIME</div>
                        <div>DESCRIPTION</div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        {dayEvents}
                    </div>
                    
                    <div className="bottom-buttons-row">
                        <button className="day-editor-button" onClick={e => addNew(date)}>ADD NEW</button>
                        <button className="day-editor-button" onClick={e => closeEditor(date)}>BACK</button>
                    </div>     
            
                </div>
            </div>
        </MainWrapper>
        
    )
}
