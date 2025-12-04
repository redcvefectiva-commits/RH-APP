import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import { calendarEvents } from '../../services/mockData';
// FIX: Corrected import path
import { CalendarEvent } from '../../types';

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date('2025-10-03T12:00:00'));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const eventsByDate = useMemo(() => {
        return calendarEvents.reduce((acc, event) => {
            (acc[event.date] = acc[event.date] || []).push(event);
            return acc;
        }, {} as Record<string, CalendarEvent[]>);
    }, []);

    const getEventBadgeColor = (type: CalendarEvent['type']) => {
        switch (type) {
            case 'holiday': return 'bg-red-500 text-white';
            case 'company-event': return 'bg-primary text-white';
            case 'deadline': return 'bg-yellow-500 text-white';
        }
    };

    const renderCalendarGrid = () => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Monday start

        const days = [];
        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty-${i}`} className="border border-gray-200 bg-gray-50"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = eventsByDate[dateKey] || [];
            days.push(
                <div key={day} className="border border-gray-200 p-2 min-h-[120px]">
                    <div className="font-semibold text-right">{day}</div>
                    <div className="space-y-1 mt-1">
                        {dayEvents.map(event => (
                            <div key={event.id} className={`p-1 rounded-md text-xs truncate ${getEventBadgeColor(event.type)}`}>
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-full hover:bg-gray-100">
                        &lt;
                    </button>
                    <h2 className="text-2xl font-bold text-dark capitalize">
                        {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-full hover:bg-gray-100">
                        &gt;
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
                <div>Lunes</div>
                <div>Martes</div>
                <div>Miércoles</div>
                <div>Jueves</div>
                <div>Viernes</div>
                <div>Sábado</div>
                <div>Domingo</div>
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
                {renderCalendarGrid()}
            </div>
        </Card>
    );
};

export default Calendar;