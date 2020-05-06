using System;
using System.Linq;
using System.IO;
using System.Collections.Generic;
using System.Globalization;
using CzmutCalendar.Models;

namespace CzmutCalendar {

    public static class Database {

        public static List<EventViewModel> ReadEvents() {

            List<EventViewModel> allEvents = new List<EventViewModel>();

            // file does not exist yet
            if(!System.IO.File.Exists("calendar.txt")) {
                using(System.IO.File.Create("calendar.txt")) {}
                return allEvents;
            }
            // file already exists
            else {
                try {
                    using(StreamReader fs = System.IO.File.OpenText("calendar.txt")) {
                        while(!fs.EndOfStream) {
                            EventViewModel singleEvent = new EventViewModel();
                            singleEvent.Id = Convert.ToInt32(fs.ReadLine());
                            singleEvent.DateAndTime = DateTime.ParseExact(fs.ReadLine(), "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);
                            singleEvent.Description = fs.ReadLine();
                            allEvents.Add(singleEvent);
                        }
                    }
                }
                catch(Exception) {
                    throw new IOException("Error in reading data from the file.");
                }
                
            }


            // sorting events
            allEvents.Sort(delegate(EventViewModel x, EventViewModel y) {
                return x.DateAndTime.CompareTo(y.DateAndTime);
            });

            return allEvents;   
        }

        public static List<EventViewModel> ReadEventsFrom(DateTime date) {
            return ReadEvents().Where(singleEvent => singleEvent.DateAndTime.Date == date.Date).ToList();
        }

        public static List<List<EventViewModel>> CreateEventsDatabase(int year, int month) {

            // creating a list of lists of events
            List<List<EventViewModel>> eventsDatabase = new List<List<EventViewModel>>();

            for(int i=0; i<=30; i++) {
                eventsDatabase.Add(new List<EventViewModel>());
            }

            foreach(EventViewModel singleEvent in ReadEvents()) {
                if(singleEvent.DateAndTime.Year == year && singleEvent.DateAndTime.Month == month) {
                    eventsDatabase[singleEvent.DateAndTime.Day - 1].Add(singleEvent);
                }
             }

            return eventsDatabase;

        }

        public static EventViewModel FindEvent(int id) {

            foreach(EventViewModel singleEvent in ReadEvents()) {
                if(singleEvent.Id == id) {
                    return singleEvent;
                }
            }
            throw new ArgumentException("No event with such id");
        }

        public static void WriteEvents(List<EventViewModel> allEvents) {

            try {
                using(StreamWriter fs = new System.IO.StreamWriter("calendar.txt")) {
                    foreach(EventViewModel singleEvent in allEvents) {
                        fs.WriteLine(singleEvent.Id);
                        fs.WriteLine(singleEvent.DateAndTime.ToString("yyyy-MM-dd HH:mm"));
                        fs.WriteLine(singleEvent.Description);
                    }
                }
            }
            catch(Exception) {
                throw new IOException("Error in writing data into the file.");
            }
            
        }

        public static void AddNewEvent(EventViewModel newEvent) {

            List<EventViewModel> allEvents = ReadEvents();

            // finding the biggest id within allEvents
            int biggestId = 0;
            foreach(EventViewModel singleEvent in allEvents) {
                if(singleEvent.Id > biggestId) {
                    biggestId = singleEvent.Id;
                }
            }

            // assigning the next bigger id and adding to allEvents
            newEvent.Id = biggestId + 1;
            allEvents.Add(newEvent);
            WriteEvents(allEvents);
        }

        public static DateTime SaveEventData(int id, int hour, int minute, string description) {

            List<EventViewModel> allEvents = ReadEvents();

            for(int i=0; i<allEvents.Count; i++) {
                if(allEvents[i].Id == id) {

                    // getting date part
                    int year = allEvents[i].DateAndTime.Year;
                    int month = allEvents[i].DateAndTime.Month;
                    int day = allEvents[i].DateAndTime.Day;

                    // assigning new/changed date to the event
                    allEvents[i].DateAndTime = new DateTime(year, month, day, hour, minute, 0);
                    allEvents[i].Description = description;

                    WriteEvents(allEvents);
                    return allEvents[i].DateAndTime;
                }
            }
            throw new ArgumentException("No event with such id.");
        }

        public static void DeleteEvent(int id) {

            List<EventViewModel> allEvents = ReadEvents();

            // finding the event to delete
            foreach(EventViewModel singleEvent in allEvents) {
                if(singleEvent.Id == id) {
                    allEvents.Remove(singleEvent);
                    WriteEvents(allEvents);
                    return;
                }
            }
        }
    } 
}