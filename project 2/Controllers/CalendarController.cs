using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System;
using System.Collections.Generic;
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

        public IActionResult ShowDate(int year, int month, int day) {
            DayViewModel toShow = new DayViewModel();
            toShow.Year = year;
            toShow.Month = month;
            toShow.Day = day;
            toShow.Events = Database.CreateEventsDatabase(year, month);
            return View(toShow);
        }
    }
}