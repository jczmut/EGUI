class Event {

    constructor(id, dateAndTime, description) {
        if(id !== null) {
            if(!Number.isInteger(id) || id < 0) throw new RangeError('Invalid id.')
        }
        else throw new RangeError('Id is not specified.')
        this.id = id
        this.dateAndTime = dateAndTime
        this.description = description
    }

    static getFromJSON(json) {
        const id = json.id
        const dateAndTime = new Date(json.dateAndTime)
        const description = json.description
        
        return new Event(id, dateAndTime, description)
    }

    // getters & setters

    get dateAndTime() {
        return this._dateAndTime
    }

    set dateAndTime(date) {
        if(!(date instanceof Date)) throw new RangeError('Invalid date.')
        this._dateAndTime = date
    }

    get description() {
        return this._decription
    }

    set description(description) {
        if(typeof description != 'string') throw new RangeError('Invalid description')
        this._decription = description
    } 
}

export default Event
