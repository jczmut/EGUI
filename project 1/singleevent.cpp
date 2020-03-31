#include "calendar.h"
#include "ui_singleevent.h"


Calendar::DayOfEvents::SingleEvent::SingleEvent(QWidget *parent, bool add, Calendar::Event& event) : QDialog(parent), thisEvent(event) {

    ui.setupUi(this);

    if(add) setWindowTitle("Add new event");
    if(!add) setWindowTitle("Edit event");

    isToBeAdded = add;

    ui.timeEdit->setTime(event.time);
    ui.lineEdit->setText(event.description);

    // connecting buttons
    connect(ui.saveButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::SingleEvent::saveEvent);
    connect(ui.cancelButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::SingleEvent::closeEvent);

}

void Calendar::DayOfEvents::SingleEvent::saveEvent() {

    thisEvent.time = ui.timeEdit->time();
    thisEvent.description = ui.lineEdit->text();
    emit passEventToSave(thisEvent);
    close();
}

void Calendar::DayOfEvents::SingleEvent::closeEvent() {

    close();
}


