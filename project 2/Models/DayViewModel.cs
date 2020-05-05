using System;
using System.Collections.Generic;

namespace CzmutCalendar.Models {
    public class DayViewModel {

        public int Year;
        public int Month;
        public int Day;
        public List<List<EventViewModel>> Events;

        public string DateTimeString {
            get {
                return Year + "-" + Month + "-" + Day; 
            }
        }

    }
}