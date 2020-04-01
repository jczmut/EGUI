#ifndef CALENDARWIDGET_H
#define CALENDARWIDGET_H

#include <QList>
#include <QCalendarWidget>


class CalendarWidget : public QCalendarWidget {
    Q_OBJECT

public:
    CalendarWidget(QWidget* parent = nullptr) : QCalendarWidget(parent) {};

private:
    QList<QDate> datesOfEvents;

protected:
    void paintCell(QPainter* painter, const QRect& rect, const QDate& date) const;

public slots:
    void updateMarkedDates(const QList<QDate>);

};

#endif // CALENDARWIDGET_H
