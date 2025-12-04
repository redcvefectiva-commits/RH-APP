
import { EmployeeAttendanceData } from "../types";

/**
 * Formats a duration in seconds into a HH:MM:SS string.
 */
export const formatDuration = (totalSeconds: number): string => {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Calculates the total worked seconds for a specific day from attendance events.
 */
export const calculateWorkedSecondsForDay = (
  data: EmployeeAttendanceData,
  dateKey: string
): number => {
  const events = data.events[dateKey];
  if (!events || events.length === 0) return 0;

  let totalWorkSeconds = 0;
  let lastWorkStartTime: number | null = null;

  events.forEach(event => {
    switch (event.type) {
      case 'entrada':
      case 'fin_pausa':
        lastWorkStartTime = event.timestamp;
        break;
      case 'salida':
      case 'inicio_pausa':
        if (lastWorkStartTime) {
          totalWorkSeconds += (event.timestamp - lastWorkStartTime) / 1000;
          lastWorkStartTime = null;
        }
        break;
    }
  });

  // Handle case where user is currently clocked in but hasn't clocked out for the day yet
  const todayKey = new Date().toISOString().split('T')[0];
  if (dateKey === todayKey && lastWorkStartTime) {
     const lastEvent = events[events.length - 1];
     if(lastEvent && (lastEvent.type === 'entrada' || lastEvent.type === 'fin_pausa')) {
        totalWorkSeconds += (new Date().getTime() - lastWorkStartTime) / 1000;
     }
  }

  return totalWorkSeconds;
};
