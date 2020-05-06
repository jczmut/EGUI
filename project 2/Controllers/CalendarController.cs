using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System;
using System.Collections.Generic;
using System.Web;
using System.Globalization;
using Microsoft.AspNetCore.Diagnostics;
using CzmutCalendar.Models;

namespace CzmutCalendar.Controllers
{
    public class CalendarController : Controller {

        public IActionResult ShowCalendar() {
            
            int year = DateTime.Today.Year;
            int month = DateTime.Today.Month;
            return ShowCalendar(year, month);
        }

        [Route("{year:int}-{month:int}")]
        public IActionResult ShowCalendar(int year, int month) {

            CalendarViewModel toShow = new CalendarViewModel();
            toShow.Year = year;
            toShow.Month = month;
            toShow.StartingDay = ((int)new DateTime(year, month, 1).DayOfWeek + 6) % 7;   // 0-monday, not sunday
            toShow.NumberOfDays = DateTime.DaysInMonth(year, month);
            toShow.MonthName = new CultureInfo("en-US").DateTimeFormat.MonthNames[month - 1];
            toShow.DaysOfTheMonthArray = toShow.GetArrayOfDays();
            toShow.Events = Database.CreateEventsDatabase(year, month);
            return View(toShow);
        }

        [Route("{year:int}-{month:int}-{day:int}")]
        public IActionResult ShowDate(int year, int month, int day) {
            DayViewModel toShow = new DayViewModel();
            toShow.Year = year;
            toShow.Month = month;
            toShow.Day = day;
            toShow.DayEvents = Database.ReadEventsFrom(new DateTime(year, month, day));
            return View(toShow);
        }

        [Route("{year:int}-{month:int}-{day:int}/addNew")]
        public IActionResult AddNewEvent(int year, int month, int day) {
            
            return ModifyEvent(0, year, month, day);
        }

        [Route("edit/event/{id:int}")]
        public IActionResult ModifyEvent(int id, int year, int month, int day) {

            EventViewModel editedEvent;
            if(id != 0) {
                editedEvent = Database.FindEvent(id);
            }
            else {
                editedEvent = new EventViewModel(year, month, day, 0, 0);
            }
            
            return View("ModifyEvent", editedEvent);
        }

        [HttpPost]
        [Route("edit/event/{id:int}")]
        [Route("{year:int}-{month:int}-{day:int}/addNew")]
        public IActionResult SaveChanges(int id, string time, string description, int year=0, int month=0, int day=0) {

            // getting hour and minute from time HH:mm
            int hour;
            int minute;
            try {
                hour = Convert.ToInt32(time.Substring(0, 2));
                minute = Convert.ToInt32(time.Substring(3, 2));
            }
            catch(Exception) {
                throw new ArgumentException("Wrong time format");
            }

            // saving new event
            if(id == 0) {
                EventViewModel newEvent = new EventViewModel(year, month, day, hour, minute);
                newEvent.Description = description ?? "";
                Database.AddNewEvent(newEvent);
                return RedirectToAction("ShowDate", new {year=year, month=month, day=day});
            }
            // updating existing event
            else {
                DateTime updatedTime = Database.SaveEventData(id, hour, minute, description ?? "");
                return RedirectToAction("ShowDate", new {year=updatedTime.Year, month=updatedTime.Month, day=updatedTime.Day});
            }

        }

        [HttpPost]
        [Route("{year:int}-{month:int}-{day:int}")]
        public IActionResult DeleteEvent(string actionOnButton, int year, int month, int day, int id) {

            if(actionOnButton != "delete") {
                throw new ArgumentException("Wrong action, will not delete.");
            }

            Database.DeleteEvent(id);
            return RedirectToAction("ShowDate", new {year=year, month=month, day=day});
        }

        [ResponseCache(Location=ResponseCacheLocation.None, NoStore=true)]
        public IActionResult ShowError() {

            IExceptionHandlerFeature exception = HttpContext.Features.Get<IExceptionHandlerFeature>();
            ViewBag.ErrorType = exception.Error.GetType().Name;
            ViewBag.ErrorMessage = exception.Error.Message;

            return View();
        }
    }
}