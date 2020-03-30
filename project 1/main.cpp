#include "calendar.h"
#include "calendarwidget.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    Calendar myCalendar;
    myCalendar.show();

    return a.exec();
}
