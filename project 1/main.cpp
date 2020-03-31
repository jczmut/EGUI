#include "calendar.h"
#include "calendarwidget.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    Calendar c;
    c.show();

    return a.exec();
}
