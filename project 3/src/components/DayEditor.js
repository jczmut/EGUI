import React from 'react'
import { format } from 'date-fns'
import MainWrapper from './MainWrapper'

export default function DayEditor( { date }) {
    return (
        <MainWrapper smallversion>
            <div className="day-editor">
                <h2>Date picked: {format(date, "yyyy-MM-dd")}</h2>
                <table className="events-table">
                    <th className="events-header">TIME</th>
                    <th className="events-header">DESCRIPTION</th>
                    <th className="events-header"></th>
                    <th className="events-header"></th>
                    
                </table>
            </div>
        </MainWrapper>
        
    )
}
