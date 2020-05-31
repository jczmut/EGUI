import { getYear, getMonth } from 'date-fns'
import Event from './Event'

class EventLists {

    // contains lists of events for each day of the month
    constructor(year, month) {
        // if year and month not specified - use current month
        if(!year || !month) {
            const today = new Date()
            this.year = getYear(today)
            this.month = getMonth(today)    // + 1 ???
        }
        else {
            // add error handling
            this.year = year
            this.month = month
        }

        // list of lists of events
        
    }
}