#ifndef CALENDAR_H
#define CALENDAR_H

#include "ui_singleevent.h"
#include "calendarwidget.h"

#include <QMainWindow>
#include <QWidget>
#include <QDate>
#include <QTime>
#include <QList>
#include <QDialog>
#include <QTableWidget>

class Calendar : public QMainWindow
{
    Q_OBJECT

public:
    Calendar(QWidget *parent = 0);
    ~Calendar();

private:
    struct Event {
        QDate date;
        QTime time;
        QString description;
    };

    class DayOfEvents;

    QList<Event> events;

    CalendarWidget* calendar;

public slots:

    void goToDayEvents(const QDate& date);
    bool readFromFile();
    bool writeIntoFile();


private slots:
    void saveChangesInEvents();

};

//-------------------------------------------------

class Calendar::DayOfEvents : public QDialog {
    Q_OBJECT

public:
    DayOfEvents(QWidget* parent, QList<Event>& events, const QDate& date);

private:
    class SingleEvent;

    QDate thisDay;
    QTableWidget* tableOfEvents;
    QList<Event> events;
    QPushButton* editButton;
    QPushButton* deleteButton;

signals:
    void changeOccured();

public slots:
    void addNewEvent();
    void deleteEvent();
    void editEvent();
    void fillTableOfEvents();
    void enableButtons();


};

//-------------------------------------------------


class Calendar::DayOfEvents::SingleEvent : public QDialog {
     Q_OBJECT

public:
     SingleEvent(QWidget* parent, Calendar::Event& event, DayOfEvents &owner);

     Ui::SingleEvent ui;

private:
     Calendar::Event thisEvent;
     Calendar::DayOfEvents *const owner;

signals:
     void newEventSaved();

private slots:
     void saveEvent();

};


#endif // CALENDAR_H
