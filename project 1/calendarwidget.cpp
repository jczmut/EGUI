#include "calendarwidget.h"

#include <QPainter>

void CalendarWidget::paintCell(QPainter* painter, const QRect& rect, const QDate& date) const {

    QCalendarWidget::paintCell(painter, rect, date);

        if (datesOfEvents.contains(date)) {
            painter->fillRect(rect, QColor::fromRgb(179, 172, 247, 80));
        }

}

void CalendarWidget::updateMarkedDates(const QList<QDate> dates) {  // tu jest jakis problem
    datesOfEvents = dates;
}
