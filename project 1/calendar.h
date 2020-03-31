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

    CalendarWidget* myCalendar;

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

    QList<Event>& copiedEvents;
    QDate thisDay;
    QTableWidget* tableOfEvents;
    QPushButton* editButton;
    QPushButton* deleteButton;
    class SingleEvent;

signals:
    void changeOccured();
    void newEventSaved();
    void editedEventSaved();
    void deletedEvent();

public slots:
    void addNewEvent();
    void finishSavingNewEvent(Calendar::Event);
    void deleteEvent();
    void editEvent();
    void finishSavingEditedEvent(Calendar::Event);
    void fillTableOfEvents();
    void enableButtons();
    void disableButtons();

};

//-------------------------------------------------


class Calendar::DayOfEvents::SingleEvent : public QDialog {
     Q_OBJECT

public:
     SingleEvent(QWidget* parent, bool add, Calendar::Event& event);

     Ui::SingleEvent ui;

private:
     Calendar::Event &thisEvent;
     bool isToBeAdded;

signals:
     void passEventToSave(Calendar::Event);

private slots:
     void saveEvent();
     void closeEvent();

};


#endif // CALENDAR_H
