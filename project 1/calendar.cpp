#include "calendar.h"
#include "calendarwidget.h"

#include <QCalendarWidget>
#include <QFile>
#include <QTextStream>

Calendar::Calendar(QWidget *parent) : QMainWindow(parent) {

    setMinimumSize(QSize(600, 400));
    myCalendar = new CalendarWidget(this);
    setCentralWidget((myCalendar));
    myCalendar->setGridVisible(true);
    myCalendar->setVerticalHeaderFormat(QCalendarWidget::NoVerticalHeader);

    // connecting main Calendar window and the DayOfEvents window
    QObject::connect(myCalendar, &CalendarWidget::activated, this, &Calendar::goToDayEvents);


}

void Calendar::goToDayEvents(const QDate &date) {
    DayOfEvents day(this, events, date);

    connect(&day, &Calendar::DayOfEvents::changeOccured, this, &Calendar::saveChangesInEvents);
    connect(&day, &Calendar::DayOfEvents::changeOccured, this, &Calendar::writeIntoFile);

    day.exec();
}

bool Calendar::readFromFile() {
    QFile file("myEvents.txt");

    if (!file.open(QIODevice::ReadOnly)) {
            qWarning("Failed to open file.");
            return false;
    }

    QTextStream in(&file);
    while(!in.atEnd()) {
        Event readEvent;

        // date, time, description are in consecutive lines in the file
        QString readDate = in.readLine();
        QString readTime = in.readLine();
        QString readDescription = in.readLine();

        readEvent.date = QDate::fromString(readDate, "yyyy-MM-dd");;
        readEvent.time = QTime::fromString(readTime, "HH:mm");
        readEvent.description = readDescription;

        // adding this event to others
        events.append(readEvent);
    }
    file.close();
    saveChangesInEvents();
    return true;
}

bool Calendar::writeIntoFile() {
    QFile file("myEvents.txt");

    if (!file.open(QIODevice::ReadOnly)) {
            qWarning("Failed to open file.");
            return false;
    }
    QTextStream out(&file);
    QList<Event>::iterator it;
    for(it = events.begin(); it != events.end(); ++it) {
        out << it->date.toString("yyyy-MM-dd") << endl;
        out << it->time.toString("HH:mm") << endl;
        out << it->description << endl;
    }
    file.close();

    return true;
}

void Calendar::saveChangesInEvents() {

    readFromFile();

    QList<QDate> datesToMark;

    QList<Event>::iterator it;
    readFromFile();

    for(it = events.begin(); it != events.end(); ++it) {
        datesToMark += it->date;
    }

    myCalendar->updateMarkedDates(datesToMark);
}

Calendar::~Calendar(){}
