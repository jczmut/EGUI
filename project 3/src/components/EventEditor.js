import React from 'react'
import MainWrapper from './MainWrapper'
import Event from '../datacomponents/Event'
import { format } from 'date-fns'

export default function EventEditor( { date, close, save } ) {

    function closeHandler() {
        close(date)
    }

    function saveHandler() {
        
    }

    return (
        <MainWrapper smallversion>
            <div className="header">
                MODIFY EVENT
            </div>
            <form className="inputs">
                <input type="text" className="description-input"/>
            </form>
            <div className="bottom-buttons">
                <button className="bottom-button-item">SAVE</button>
                <button className="bottom-button-item" onClick={closeHandler}>CANCEL</button>
            </div>
        </MainWrapper>
        
    )
}
