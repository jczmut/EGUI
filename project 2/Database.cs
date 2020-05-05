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

            // add exception handling

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

            // creating a list of lists of 
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

            using(StreamWriter fs = new System.IO.StreamWriter("calendar.txt")) {
                foreach(EventViewModel singleEvent in allEvents) {
                    fs.WriteLine(singleEvent.Id);
                    fs.WriteLine(singleEvent.DateAndTime.ToString("yyyy-MM-dd HH:mm"));
                    fs.WriteLine(singleEvent.Description);
                }
            }
            // add exception handling
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
    } 
}