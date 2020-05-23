import React, { useState } from 'react'
import MonthNavigator from './MonthNavigator'
import Weekdays from './Weekdays'
import DaysOfTheMonth from './DaysOfTheMonth'

export default function Calendar( {month} ) {

    return (
        <div>
            <MonthNavigator/>

            <Weekdays/>

            <DaysOfTheMonth daysOfTheMonth={month}/>


        </div>
    )
}




