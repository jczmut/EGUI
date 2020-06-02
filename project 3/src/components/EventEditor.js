import React, { useState } from 'react'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import { format, getDate, getYear, getMonth } from 'date-fns'

export default function EventEditor( { date, close, save } ) {

    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [time, setTime] = useState("12:00")
    const [adding, setAdding] = useState(!event.id)

    const handleClose = (e) => {
        close(date)
    }

    const handleSave = (e) => {
        // or just handle submit?
    }

    const handleSubmit = (e) => {
        // communicate with API to add new or edit existing event
        e.preventDefault()
        console.log(`Submitting description ${description}`)
        console.log(`Submitting time ${time}`)

        // format the url
        // if editing
        let url = `/api/event/${e.id}`
        // if adding
        if(adding) {
            url = `api/event/add/${getYear(date)}-${getMonth(date) + 1}-${getDate(date)}`
        }

        // API call
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UFT-8'},
            body: 'id=' + id + '&time=' + encodeURIComponent(time) +
                    '&description=' + encodeURIComponent(description)
        })
        .then(response => response.json())
        .then(() => {
            // if everything went ok, close the editor
            console.log(data)
            close(date)
        })
        .catch(error => {
            alert('Error while saving event.')
            console.error(error)
        })

    }

    return (
        <MainWrapper smallversion>
            <header className="small-header">
            <h2>{adding ? "Add new event" : "Edit event"}</h2>
            </header>
            <form onSubmit={handleSubmit} className="inputs">
                <div className="time-div">
                    <p>TIME</p>
                    <input type="time" onChange={e => setTime(e.target.value)} className="time-input"/>
                </div>
                <div className="description-div">
                    <p>DESCRIPTION</p>
                    <input type="text" onChange={e => setDescription(e.target.value)} autoComplete="off" className="description-input"/>
                </div>
                
            </form>
            <div className="bottom-buttons">
                <button className="bottom-button-item" onClick={e => handleSubmit(event)}>SAVE</button>
                <button className="bottom-button-item" onClick={e => handleClose(date)}>CANCEL</button>
            </div>
        </MainWrapper>
        
    )
}
