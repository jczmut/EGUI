import React from 'react'
import { format } from 'date-fns'
import MainWrapper from './MainWrapper'

export default function DayEditor( { date, close, add }) {

    function closeEditor() {
        close(date)
    }

    function addNew() {
        add(date)
    }

    return (
        <MainWrapper smallversion>
            <div className="day-editor">
                <h2 className="header">{format(date, "dd-MM-yyyy")}</h2>
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
