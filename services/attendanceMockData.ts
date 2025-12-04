
import { Employee, EmployeeAttendanceData, AttendanceEvent, AbsenceRecord } from '../types';

export const generateAttendanceData = (employees: Employee[]): EmployeeAttendanceData[] => {
  const data: EmployeeAttendanceData[] = [];
  const today = new Date();
  
  // FIX: Corrected comment to match the code logic (1 month back).
  // Go back 1 month for performance improvement
  const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  employees.forEach(employee => {
    const events: Record<string, AttendanceEvent[]> = {};
    const absences: AbsenceRecord[] = [];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) continue; // Skip weekends

      const dateKey = currentDate.toISOString().split('T')[0];
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();

      // Randomly decide if the employee is absent
      if (Math.random() < 0.05) { // 5% chance of being absent
        const reasons: AbsenceRecord['reason'][] = ['Cita Médica', 'Asunto Personal', 'Incapacidad'];
        absences.push({
          date: dateKey,
          reason: reasons[Math.floor(Math.random() * reasons.length)],
        });
        continue; // Skip generating events if absent
      }

      // Generate realistic work day events
      const clockInTime = new Date(year, month, day, 8, Math.floor(Math.random() * 45), Math.floor(Math.random() * 60)).getTime();
      const lunchStartTime = new Date(year, month, day, 12, Math.floor(Math.random() * 30), Math.floor(Math.random() * 60)).getTime();
      const lunchEndTime = lunchStartTime + (Math.floor(Math.random() * 30 + 30) * 60 * 1000); // 30-60 min lunch
      
      const dayEvents: AttendanceEvent[] = [
        { type: 'entrada', timestamp: clockInTime },
        { type: 'inicio_pausa', timestamp: lunchStartTime },
        { type: 'fin_pausa', timestamp: lunchEndTime },
      ];

      // Add a random second break for some
      if (Math.random() > 0.6) {
        const breakStartTime = lunchEndTime + (Math.floor(Math.random() * 2 + 1) * 60 * 60 * 1000); // 1-2 hours after lunch
        const breakEndTime = breakStartTime + (Math.floor(Math.random() * 10 + 5) * 60 * 1000); // 5-15 min break
        dayEvents.push({ type: 'inicio_pausa', timestamp: breakStartTime });
        dayEvents.push({ type: 'fin_pausa', timestamp: breakEndTime });
      }

      const lastEventTime = dayEvents[dayEvents.length-1].timestamp;
      const clockOutTime = lastEventTime + (Math.floor(Math.random() * 3 + 1) * 60 * 60 * 1000); // 1-3 hours after last event
      
      dayEvents.push({ type: 'salida', timestamp: clockOutTime });

      events[dateKey] = dayEvents.sort((a,b) => a.timestamp - b.timestamp);
    }

    data.push({
      employeeId: employee.id,
      events,
      absences,
    });
  });

  return data;
};