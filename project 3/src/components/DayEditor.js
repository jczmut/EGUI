import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import DayEvent from './DayEvent'
import { getYear, getMonth, getDate } from 'date-fns'

export default function DayEditor( { date, events, close, modify, add }) {

    const [dayEvents, setDayEvents] = useState(events)
    const [applyChanges, setApplyChanges] = useState(true)

    useEffect(() => {
        if(applyChanges) {
            fetch(`api/day-events/${getYear(date)}-${getMonth(date)+1}-${getDate(date)}`)
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
        }
        return (
            setApplyChanges(false)
        )

    }, [applyChanges])

    const handleClose = (e) => {
        close(e)
    }

    const handleAddNew = (e) => {
        add(e)
    }

    function editEvent(id) {
        modify(id)
    }

    function deleteEvent(id) {
        // API call
        let url = `/api/event/${id}`
        fetch(url, {
            method: 'delete',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UFT-8'},
            body: 'id=' + id
        })
        .then(response => response.json())
        .then((data) => {
            // if everything went ok
            console.log(data)
        })
        .catch(error => {
            alert('Error while deleting event.')
            console.error(error)
        })
        setApplyChanges(true)
    }

    var dayEventsToRender = []
    if(dayEvents) {
        for(let i=0; i<dayEvents.length; i++) {
            dayEventsToRender.push(
            <DayEvent
                event={dayEvents[i]}
                modifyEvent={() => editEvent(dayEvents[i].id)}
                deleteEvent={deleteEvent}
                key={i}
            />
            )
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
                        <button className="button-item" onClick={e => handleAddNew(date)}>ADD NEW</button>
                        <button className="button-item" onClick={e => handleClose(date)}>BACK</button>
                    </div>     
            
                </div>
            </div>
        </MainWrapper>
        
    )
}
