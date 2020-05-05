using System;
using System.Collections.Generic;

namespace CzmutCalendar.Models {
    public class CalendarViewModel {
        public int Year;
        public int Month;
        public string MonthName;
        public int NumberOfDays;
        public int StartingDay;
        public int[] DaysOfTheMonthArray;
        public List<List<EventViewModel>> Events;

        
        public int[] GetArrayOfDays() {
            
            int emptyDays;
            if(StartingDay == 0) {
                emptyDays = StartingDay;
                int[] arrayOfDays = new int[NumberOfDays];
                for(int i=0; i<NumberOfDays; i++) {
                    arrayOfDays[i] = i+1;
                }
                DaysOfTheMonthArray = arrayOfDays;
            }
            else {
                emptyDays = StartingDay;
                int[] arrayOfDays = new int[NumberOfDays+emptyDays];
                for(int i=0; i<NumberOfDays+emptyDays; i++) {
                    if(i < emptyDays) {
                        continue;
                    }
                    arrayOfDays[i] = i - (emptyDays-1);
                }
                DaysOfTheMonthArray = arrayOfDays;
            }
            return DaysOfTheMonthArray;
        }

        public string GetNextMonth() {
            int month = Month + 1;
            int year = Year;
            if(month == 13) {
                month = 1;
                year++;
            }
            return year + "-" + month;
        }

        public string GetPreviousMonth() {
            int month = Month - 1;
            int year = Year;
            if(month == 0) {
                month = 12;
                year--;
            }
            return year + "-" + month;
        }
    }
}