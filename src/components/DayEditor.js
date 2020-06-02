import React from 'react'
import { format } from 'date-fns'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import DayEvent from './DayEvent'

export default function DayEditor( { date, events, close, add }) {

    function closeEditor() {
        close(date)
    }

    function addNew() {
        add(date)
    }

    var dayEvents = []
    if(events) {
        for(let i=0; i<events.length; i++) {
            dayEvents.push(<DayEvent event={events[i]} key={i}/>)
        }
    }
    


    return (
        <MainWrapper smallversion>
            <div className="day-editor">
                <header className="small-header">
                    <h2>{format(date, "dd MMMM yyyy")}</h2>
                </header>
                
                <table className="events-table">
                    <thead>
                        <tr>
                            <th className="events-header">TIME</th>
                            <th className="events-header">DESCRIPTION</th>
                            <th className="events-header"></th>
                            <th className="events-header"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {dayEvents}
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                <button className="day-editor-button" onClick={() => addNew(date)}>ADD NEW</button>
                            </td>
                            <td>
                                <button className="day-editor-button" onClick={() => closeEditor(date)}>BACK</button>
                            </td>
                        </tr>
                    </tbody>
                    
            
                </table>
            </div>
        </MainWrapper>
        
    )
}
