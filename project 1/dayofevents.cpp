#include "calendar.h"
#include "ui_singleevent.h"

#include <QPushButton>
#include <QLayout>
#include <QGridLayout>
#include <QDate>
#include <QWindow>
#include <QList>
#include <QHeaderView>
#include <QTableWidget>


Calendar::DayOfEvents::DayOfEvents(QWidget *parent, QList<Event> &parentsEvents, const QDate &date) : QDialog(parent), events(parentsEvents) {

    setWindowTitle(date.toString("dd-MM-yyyy"));
    setMinimumSize(QSize(400, 500));

    // working on the table
    QTableWidget* tableOfEvents;
    tableOfEvents = new QTableWidget(this);
    tableOfEvents->setColumnCount(2);
    tableOfEvents->setSelectionMode(QAbstractItemView::NoSelection);
    QStringList hHeader = {"TIME", "DESCRIPTION"};
    tableOfEvents->setHorizontalHeaderLabels(hHeader);
    tableOfEvents->horizontalHeader()->setSectionResizeMode(0, QHeaderView::ResizeToContents);
    tableOfEvents->horizontalHeader()->setSectionResizeMode(1, QHeaderView::Stretch);


    // now the buttons
    QPushButton *addButton = new QPushButton(this);
    addButton->setText("Add new");
    editButton = new QPushButton(this);
    editButton->setText("Edit");
    deleteButton = new QPushButton("Delete", this);
    deleteButton->setText("Delete");
    QPushButton *cancelButton = new QPushButton(this);
    cancelButton->setText("Cancel");

    // edit and delete buttons are to be active only when an entry on the list is selected
    editButton->setEnabled(false);
    deleteButton->setEnabled(false);

    connect(tableOfEvents, &QTableWidget::cellClicked, this, &Calendar::DayOfEvents::enableButtons);

    QGridLayout* layout = new QGridLayout;
    layout->addWidget(tableOfEvents, 0, 0, 1, 2);
    layout->addWidget(editButton, 1, 0, 1, 1);
    layout->addWidget(deleteButton, 1, 1, 1, 1);
    layout->addWidget(addButton, 2, 0, 1, 1);
    layout->addWidget(cancelButton, 2, 1, 1, 1);

    setLayout(layout);


    // clicking cancel -> closes the window
    QObject::connect(cancelButton, &QPushButton::clicked, this, &QPushButton::close);
    // clicking add new -> signals to slot addNewEvent
    QObject::connect(addButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::addNewEvent);

    //fillTableOfEvents();

}

void Calendar::DayOfEvents::addNewEvent() {

    Event newEvent;
    newEvent.date = thisDay;

    SingleEvent eventToAdd(this, newEvent, *this);


    eventToAdd.exec();

    connect(&eventToAdd, &Calendar::DayOfEvents::SingleEvent::newEventSaved, this, &Calendar::DayOfEvents::fillTableOfEvents);
}

void Calendar::DayOfEvents::editEvent() {
    Event editedEvent;
    editedEvent.date = thisDay;

    SingleEvent eventToEdit(this, editedEvent, *this);

    eventToEdit.exec();
}

void Calendar::DayOfEvents::deleteEvent() {

}

void Calendar::DayOfEvents::fillTableOfEvents() {

    tableOfEvents->setRowCount(0);
    // iterating through the list of events and extracting events with chosen date
    QList<Event>::iterator it;
    for(it = events.begin(); it != events.end(); ++it) {
        if(it->date == thisDay) {

            tableOfEvents->insertRow(tableOfEvents->rowCount());
            tableOfEvents->setItem(tableOfEvents->rowCount() - 1, 0, new QTableWidgetItem(it->time.toString("yyyy-MM-dd")));
            tableOfEvents->setItem(tableOfEvents->rowCount() - 1, 1, new QTableWidgetItem(it->description));

        }
    }
    tableOfEvents->sortByColumn(0,Qt::AscendingOrder);
    emit changeOccured();

}

void Calendar::DayOfEvents::enableButtons() {
    editButton->setEnabled(true);
    deleteButton->setEnabled(true);
}

