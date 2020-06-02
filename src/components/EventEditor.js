import React, { useState } from 'react'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import { format } from 'date-fns'

export default function EventEditor( { date, close, save } ) {

    const [description, setDescription] = useState("")

    function closeHandler() {
        close(date)
    }

    function saveHandler() {
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`Submitting description ${description}`)
    }

    return (
        <MainWrapper smallversion>
            <header className="small-header">
                <h2>MODIFY EVENT</h2>
            </header>
            <form onSubmit={handleSubmit} className="inputs">
                <div className="time-div">
                    <p>TIME</p>
                    <input type="time" className="time-input"/>
                </div>
                <div className="description-div">
                    <p>DESCRIPTION</p>
                    <input type="text" onChange={e => setDescription(e.target.value)} className="description-input"/>
                </div>
                
            </form>
            <div className="bottom-buttons">
                <button className="bottom-button-item" onClick={handleSubmit}>SAVE</button>
                <button className="bottom-button-item" onClick={closeHandler}>CANCEL</button>
            </div>
        </MainWrapper>
        
    )
}
