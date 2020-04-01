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


Calendar::DayOfEvents::DayOfEvents(QWidget *parent, QList<Event> &parentsEvents, const QDate &date) : QDialog(parent), copiedEvents(parentsEvents) {

    thisDay = date;

    setWindowTitle(date.toString("dd-MM-yyyy"));
    setMinimumSize(QSize(400, 300));

    // working on the table
    tableOfEvents = new QTableWidget(this);
    tableOfEvents->setColumnCount(2);
    tableOfEvents->setSelectionMode(QAbstractItemView::SingleSelection);
    tableOfEvents->setEditTriggers(QAbstractItemView::NoEditTriggers);
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

    // creating the layout
    QGridLayout* layout = new QGridLayout;
    layout->addWidget(tableOfEvents, 0, 0, 1, 2);
    layout->addWidget(editButton, 1, 0, 1, 1);
    layout->addWidget(deleteButton, 1, 1, 1, 1);
    layout->addWidget(addButton, 2, 0, 1, 1);
    layout->addWidget(cancelButton, 2, 1, 1, 1);

    setLayout(layout);

    // connecting buttons
    connect(cancelButton, &QPushButton::clicked, this, &QPushButton::close);
    connect(addButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::addNewEvent);
    connect(editButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::editEvent);
    connect(deleteButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::deleteEvent);

    // connecting other signals
    connect(this, &Calendar::DayOfEvents::newEventSaved, this, &Calendar::DayOfEvents::fillTableOfEvents);
    connect(this, &Calendar::DayOfEvents::editedEventSaved, this, &Calendar::DayOfEvents::fillTableOfEvents);
    connect(this, &Calendar::DayOfEvents::newEventSaved, this, &Calendar::DayOfEvents::disableButtons);
    connect(this, &Calendar::DayOfEvents::editedEventSaved, this, &Calendar::DayOfEvents::disableButtons);
    connect(this, &Calendar::DayOfEvents::deletedEvent, this, &Calendar::DayOfEvents::disableButtons);

    fillTableOfEvents();
}

void Calendar::DayOfEvents::addNewEvent() {

    Event newEvent;
    newEvent.date = thisDay;

    SingleEvent eventToAdd(this, true, newEvent);

    connect(&eventToAdd, &Calendar::DayOfEvents::SingleEvent::passEventToSave, this, &Calendar::DayOfEvents::finishSavingNewEvent);

    eventToAdd.exec();

}

void Calendar::DayOfEvents::finishSavingNewEvent(Calendar::Event newEvent) {
    copiedEvents.append(newEvent);

    emit newEventSaved();
}

void Calendar::DayOfEvents::editEvent() {

    Event editedEvent;
    editedEvent.date = thisDay;
    int row = tableOfEvents->currentItem()->row();
    editedEvent.time = QTime::fromString(tableOfEvents->item(row, 0)->text(), "HH:mm:ss");
    editedEvent.description = tableOfEvents->item(row, 1)->text();

    SingleEvent eventToEdit(this, false, editedEvent);

    connect(&eventToEdit, &Calendar::DayOfEvents::SingleEvent::passEventToSave, this, &Calendar::DayOfEvents::finishSavingEditedEvent);

    eventToEdit.exec();
}

void Calendar::DayOfEvents::finishSavingEditedEvent(Calendar::Event editedEvent) {
    int row = tableOfEvents->currentItem()->row();

    // modifying the list
    QList<Event>::iterator it;
    for(it = copiedEvents.begin(); it != copiedEvents.end(); ++it) {
        if(it->date == thisDay && it->time.toString() == tableOfEvents->item(row, 0)->text() && it->description == tableOfEvents->item(row, 1)->text()) {
            it->time = editedEvent.time;
            it->description = editedEvent.description;
            break;
        }
    }

    // modifying the table of events
    tableOfEvents->setItem(row, 0, new QTableWidgetItem(it->time.toString()));
    tableOfEvents->setItem(row, 1, new QTableWidgetItem(it->description));

    emit editedEventSaved();
}

void Calendar::DayOfEvents::deleteEvent() {
    Event eventToDelete;
    eventToDelete.date = thisDay;

    int row = tableOfEvents->currentItem()->row();

    // deleting from the list
    QList<Event>::iterator it = copiedEvents.begin();
    while(it != copiedEvents.end()) {
        if(it->date == thisDay && it->time.toString() == tableOfEvents->item(row, 0)->text() && it->description == tableOfEvents->item(row, 1)->text()) {
            it = copiedEvents.erase(it);
            continue;
        }
        ++it;
    }

    // deleting from the table of events
    tableOfEvents->removeRow(row);
    emit deletedEvent();
    emit changeOccured();
}

void Calendar::DayOfEvents::fillTableOfEvents() {

    tableOfEvents->setRowCount(0);
    // iterating through the list of events and extracting events with the right date
    QList<Event>::iterator it;
    for(it = copiedEvents.begin(); it != copiedEvents.end(); ++it) {
        if(it->date == thisDay) {

            tableOfEvents->insertRow(tableOfEvents->rowCount());
            tableOfEvents->setItem(tableOfEvents->rowCount() - 1, 0, new QTableWidgetItem(it->time.toString()));
            tableOfEvents->setItem(tableOfEvents->rowCount() - 1, 1, new QTableWidgetItem(it->description));
        }
    }
    tableOfEvents->sortByColumn(0, Qt::AscendingOrder);
    emit changeOccured();
}

void Calendar::DayOfEvents::enableButtons() {
    editButton->setEnabled(true);
    deleteButton->setEnabled(true);
}

void Calendar::DayOfEvents::disableButtons() {
    editButton->setEnabled(false);
    deleteButton->setEnabled(false);
}



