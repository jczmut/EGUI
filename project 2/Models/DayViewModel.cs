using System;
using System.Collections.Generic;

namespace CzmutCalendar.Models {
    public class DayViewModel {

        public int Year;
        public int Month;
        public int Day;
        public List<EventViewModel> DayEvents;

        public string GetDateString {
            get {
                return Year + "-" + "0" + Month + "-" + Day; 
            }
        }

    }
}