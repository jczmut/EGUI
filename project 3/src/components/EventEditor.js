import React, { useState, useEffect } from 'react'
import MainWrapper from './MainWrapper'

export default function EventEditor( { event, close } ) {
    
    const [description, setDescription] = useState(event.description || "")
    const [time, setTime] = useState('00:00')

    useEffect(() => {
        fetch(`api/event/${event.id}`)
            .then(response => response.json())
            .then(data => {
                let properDate = new Date(data.time)
                setTime(properDate.toTimeString().slice(0, 5))
            })
            .catch(error =>
                alert("Something went wrong.")
            )
    }, [])
    
    const handleClose = (e) => {
        close(event.dateAndTime)
    }

    const handleSubmit = (e) => {
        // communicate with API to add new or edit existing event

        // format the url
        var url = `/api/event/${event.id}`

        // API call
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UFT-8'},
            body: 'id=' + e.id + '&time=' + encodeURIComponent(time) +
                    '&description=' + encodeURIComponent(description)
        })
        .then(response => response.json())
        .then((data) => {
            // if everything went ok, close the editor
            console.log(data)
            close(event.dateAndTime)
        })
        .catch(error => {
            alert('Error while saving event.')
            console.error(error)
        })
    }

    return (
        <MainWrapper smallversion>
            <header className="small-header">
            <h2>Edit event</h2>
            </header>
            <form onSubmit={handleSubmit} className="inputs">
                <div className="input-div">
                    <p>TIME</p>
                    <input
                        type="time"
                        onChange={e => setTime(e.target.value)}
                        className="time-input"
                        value={time}
                    />
                </div>
                <div className="input-div">
                    <p>DESCRIPTION</p>
                    <input
                        type="text"
                        onChange={e => setDescription(e.target.value)}
                        autoComplete="off"
                        className="description-input"
                        value={description}
                    />
                </div>
                
            </form>
            <div className="bottom-buttons">
                <button className="button-item" onClick={e => handleSubmit(event)}>SAVE</button>
                <button className="button-item" onClick={e => handleClose(event.dateAndTime)}>CANCEL</button>
            </div>
        </MainWrapper>
        
    )
}
