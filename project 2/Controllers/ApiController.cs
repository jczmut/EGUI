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