using System;

namespace CzmutCalendar.Models {
    public class EventViewModel {

        public int Id = 0;
        public DateTime DateAndTime;
        public string Description;

        public EventViewModel() {}
        public EventViewModel(int year, int month, int dayNum, int hour, int minute) {
            DateAndTime = new DateTime(year, month, dayNum, hour, minute, 0);
        }
    }
}