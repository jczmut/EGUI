import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import DayEvent from './DayEvent'
import { getYear, getMonth, getDate } from 'date-fns'

export default function DayEditor( { date, events, close, add }) {

    const [dayEvents, setDayEvents] = useState()

    useEffect(() => {
        fetch(`api/day-events/${getYear(date)}-${getMonth(date)}-${getDate(date)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var dayEventsArray = []
                    for(let i=0; i<data.events.length; i++) {
                        dayEventsArray.push(Event.getFromJSON(data.events[i])) 
                    }
                setDayEvents(dayEventsArray)
            })
            .catch((error) => {
                alert("Error while loading day events.")
                console.error(error)
            })

    }, [])

    // useEffect(() => {
    //     var dayEventsArray = []
    //         if(events) {
    //             for(let i=0; i<events.length; i++) {
    //                 events[i].dateAndTime = new Date(date)
    //                 console.log(events[i])
    //                 dayEventsArray.push(events[i])
    //             }
    //         }
    //     setDayEvents(dayEventsArray)
    // }, [])

    console.log("DAY EVENTS")
    console.log(dayEvents)

    const handleClose = (e) => {
        close(e)
    }

    const handleAddNew = (e) => {
        add(e)
    }

    function editEvent(event) {
        console.log("Edit")
    }

    function deleteEvent(event) {
        console.log("Delete")
    }

    var dayEventsToRender = []
    if(dayEvents) {
        for(let i=0; i<dayEvents.length; i++) {
            dayEventsToRender.push(<DayEvent event={dayEvents[i]} modifyEvent={editEvent} deleteEvent={deleteEvent} key={i}/>)
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
                        {dayEventsToRender}
                    </div>
                    
                    <div className="bottom-buttons-row">
                        <button className="day-editor-button" onClick={e => handleAddNew(date)}>ADD NEW</button>
                        <button className="day-editor-button" onClick={e => handleClose(date)}>BACK</button>
                    </div>     
            
                </div>
            </div>
        </MainWrapper>
        
    )
}
