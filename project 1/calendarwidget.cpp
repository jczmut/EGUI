#include "calendarwidget.h"

#include <QPainter>

void CalendarWidget::paintCell(QPainter* painter, const QRect& rect, const QDate& date) const {
    QCalendarWidget::paintCell(painter, rect, date);

        if (datesOfEvents.contains(date))
            painter->fillRect(rect, QColor::fromRgb(128, 128, 255, 64));
}

void CalendarWidget::updateMarkedDates(const QList<QDate> dates) {
    datesOfEvents = dates;
}
