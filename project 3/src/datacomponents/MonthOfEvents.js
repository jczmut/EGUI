import { getYear, getMonth, getDaysInMonth } from 'date-fns'
import Event from './Event'

class MonthOfEvents {

    // contains lists of events for each day of the month
    constructor(year, month) {
        // if year and month not specified - use current month
        if(!year || !month) {
            const today = new Date()
            this.year = getYear(today)
            this.month = getMonth(today)
        }
        else {
            // add error handling
            this.year = year
            this.month = month
        }

        var events = []
        // array of arrays of events - an array for each day of the month
        for(let i = 0; i < getDaysInMonth(new Date(year, month, 1)); i++) {
            events.push([])
        }
    }

    static getFromJSON(json) {
        let eventsArray = new MonthOfEvents(json.year, json.month)

        for(let i = 0; i <= json.events.length; i++) {
            for(let j = 0; j < json.events[i].length; j++) {
                const id = json.events[i][j].id
                const description = json.events[i][j].description
                eventsArray.events[i].push(new Event(id, new Date(0), description))
            }
        }
        return eventsArray
    }

}

export default MonthOfEvents