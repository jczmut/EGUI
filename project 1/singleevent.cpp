#include "calendar.h"
#include "ui_singleevent.h"


Calendar::DayOfEvents::SingleEvent::SingleEvent(QWidget *parent, bool add, Calendar::Event& event) : QDialog(parent), thisEvent(event) {

    ui.setupUi(this);

    isToBeAdded = add;

    if(add) setWindowTitle("Add new event");

    if(!add) {
        setWindowTitle("Edit event");
        ui.timeEdit->setTime(thisEvent.time);
        ui.descriptionEdit->setText(thisEvent.description);
//        findChild<QTimeEdit*>("timeEdit")->setTime(thisEvent.time);
//        findChild<QLineEdit*>("descriptionEdit")->setText(thisEvent.description);
    }

    // connecting buttons
    connect(ui.saveButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::SingleEvent::saveEvent);
    connect(ui.cancelButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::SingleEvent::closeEvent);
}

Calendar::DayOfEvents::SingleEvent::~SingleEvent() {}

void Calendar::DayOfEvents::SingleEvent::saveEvent() {

    thisEvent.time = ui.timeEdit->time();
    thisEvent.description = ui.descriptionEdit->text();
    emit passEventToSave(thisEvent);
    close();
}

void Calendar::DayOfEvents::SingleEvent::closeEvent() {
    close();
}


