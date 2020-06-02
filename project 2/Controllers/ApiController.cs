using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Diagnostics;
using CzmutCalendar.Models;

namespace CzmutCalendar.Controllers {
    public class ApiController : Controller {

        [HttpGet]
        [Route("api/events/{year:int}-{month:int}")]
        public IActionResult GetEventLists(int year, int month) {

            var data = new {
                status = "ok",
                year = year,
                month = month,
                events = new List<dynamic>()
            };

            List<List<EventViewModel>> eventsDatabase;

            try {
                eventsDatabase = Database.CreateEventsDatabase(year, month);
            }   
            catch (Exception e) {
                return ShowError(e);
            }

            for(int i=0; i<eventsDatabase.Count; i++) {
                List<dynamic> dayEvents = new List<dynamic>();

                foreach(EventViewModel singleEvent in eventsDatabase[i]) {
                    dayEvents.Add(new {
                        id = singleEvent.Id,
                        description = singleEvent.Description
                    });
                }
                data.events.Add(dayEvents);
            }
            return Json(data);
        }

        [HttpGet]
        [Route("api/day-events/{year:int}-{month:int}-{day:int}")]
        public IActionResult GetDayEvents(int year, int month, int day) {
            
            var data = new {
                status = "ok",
                year = year,
                month = month,
                day = day,
                events = new List<dynamic>()
            };

            List<EventViewModel> dayEvents;
            try {
                dayEvents = Database.ReadEventsFrom(new DateTime(year, month, day));
            }
            catch (Exception e) {
                return ShowError(e);
            }

            foreach(EventViewModel singleEvent in dayEvents) {
                data.events.Add(new {
                    id = singleEvent.Id,
                    time = ((DateTimeOffset)singleEvent.DateAndTime).ToUnixTimeSeconds()*1000,
                    description = singleEvent.Description
                });
            }
            return Json(data);
        }

        [HttpGet]
        [Route("api/event/{id:int}")]
        public IActionResult GetEvent(int id) {

            EventViewModel singleEvent;
            try {
                singleEvent = Database.FindEvent(id);
            }
            catch (Exception e) {
                return ShowError(e);
            }

            var data = new {
                status = "ok",
                id = singleEvent.Id,
                time = ((DateTimeOffset)singleEvent.DateAndTime).ToUnixTimeSeconds()*1000,
                description = singleEvent.Description
            };

            return Json(data);
        }

        [HttpPost]
        [Route("api/event/add/{year:int}-{month:int}-{day:int}")]
        public IActionResult ModifyEvent(string time, string description, int year, int month, int day) {
            
            int hour;
            int minute;
            try {
                hour = Convert.ToInt32(time.Substring(0, 2));
                minute = Convert.ToInt32(time.Substring(3, 2));
            }
            catch (Exception) {
                return ShowError(new ArgumentException("Invalid time."));
            }

            // creating a new event - id will be 0
            EventViewModel newEvent = new EventViewModel(year, month, day, hour, minute);
            newEvent.Description = description ?? "";
            int newId = 0;
            try {
                Database.AddNewEvent(newEvent);
            }
            catch (Exception e) {
                return ShowError(e);
            }

            return Json(new {
                status="ok",
                id=newId
            });
        }

        [HttpPost]
        [Route("api/event/{id:int}")]
        public IActionResult ModifyEvent(int id, string time, string description) {

            int hour;
            int minute;
            try {
                hour = Convert.ToInt32(time.Substring(0, 2));
                minute = Convert.ToInt32(time.Substring(3, 2));
            }
            catch (Exception) {
                return ShowError(new ArgumentException("Invalid time."));
            }

            try {
                Database.SaveEventData(id, hour, minute, description ?? "");
            }
            catch(Exception e) {
                return ShowError(e);
            }

            return Json(new {
                status="ok"
            });
        }

        [HttpDelete]
        [Route("api/event/{id:int")]
        public IActionResult DeleteEvent(int id) {

            try {
                Database.DeleteEvent(id);
            }
            catch(Exception e) {
                return ShowError(e);
            }

            return Json(new {
                status="ok"
            });
        }


        [ResponseCache(Location=ResponseCacheLocation.None, NoStore=true)]
        public IActionResult ShowError(Exception exception) {

            HttpContext.Response.StatusCode = exception is ArgumentException ? 400 : 500;
            string status = HttpContext.Response.StatusCode == 400 ? "client error" : "server error";
            string errorType = exception.GetType().Name;
            string errorMessage = exception.Message;

            return Json(new {
                status = status,
                error_type = errorType,
                error_message = errorMessage
            });
        }

    }
}