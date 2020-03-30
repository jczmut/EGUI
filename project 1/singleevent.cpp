#include "calendar.h"
#include "ui_singleevent.h"


Calendar::DayOfEvents::SingleEvent::SingleEvent(QWidget *parent, Calendar::Event& event) : QDialog(parent), thisEvent(event)
   //ui(new Ui::SingleEvent)
{
    ui.setupUi(this);
    thisEvent = event;

    findChild<QTimeEdit*>("timeEdit")->setTime(event.time);
    findChild<QLineEdit*>("lineEdit")->setText(event.description);

    // connecting buttons
    QObject::connect(ui.saveButton, &QPushButton::clicked, this, &Calendar::DayOfEvents::SingleEvent::saveEvent);
    QObject::connect(ui.cancelButton, &QPushButton::clicked, this, &QDialog::close);

}

void Calendar::DayOfEvents::SingleEvent::saveEvent() {

    thisEvent.time = findChild<QTimeEdit*>("timeEdit")->time();
    thisEvent.description = findChild<QLineEdit*>("lineEdit")->text();

    emit newEventSaved();
    close();
}

