import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ClockIcon, DownloadIcon, PauseIcon, PlayIcon } from '../ui/Icons';

type AttendanceStatus = 'out' | 'in' | 'paused' | 'leave';
type AttendanceEvent = {
  type: 'entrada' | 'salida' | 'inicio_pausa' | 'fin_pausa' | 'inicio_permiso' | 'fin_permiso';
  timestamp: number;
};

const MyAttendance: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>('out');
  const [shiftStartTime, setShiftStartTime] = useState<number | null>(null);
  const [lastEventTime, setLastEventTime] = useState<number | null>(null);

  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceEvent[]>>({});
  const [mockDataGenerated, setMockDataGenerated] = useState(false);
  
  // Generate Mock Data for previous days of the month
  useEffect(() => {
    if (mockDataGenerated) return;

    const generateMockData = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const records: Record<string, AttendanceEvent[]> = {};
      
      for (let day = 1; day < today.getDate(); day++) {
        const date = new Date(year, month, day);
        if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends

        const dateKey = date.toISOString().split('T')[0];
        const clockInTime = new Date(year, month, day, 8, Math.floor(Math.random() * 30), Math.floor(Math.random() * 60)).getTime();
        const lunchStartTime = new Date(year, month, day, 12, Math.floor(Math.random() * 30), Math.floor(Math.random() * 60)).getTime();
        const lunchEndTime = lunchStartTime + (60 * 60 * 1000) + (Math.floor(Math.random() * 15) * 60 * 1000);
        const clockOutTime = new Date(year, month, day, 17, Math.floor(Math.random() * 30), Math.floor(Math.random() * 60)).getTime();

        records[dateKey] = [
          { type: 'entrada', timestamp: clockInTime },
          { type: 'inicio_pausa', timestamp: lunchStartTime },
          { type: 'fin_pausa', timestamp: lunchEndTime },
          { type: 'salida', timestamp: clockOutTime },
        ];
      }
      setAttendanceRecords(records);
      setMockDataGenerated(true);
    };
    generateMockData();
  }, [mockDataGenerated]);


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const shiftDuration = shiftStartTime ? formatDuration((currentTime.getTime() - shiftStartTime) / 1000) : '00:00:00';
  const statusDuration = lastEventTime ? formatDuration((currentTime.getTime() - lastEventTime) / 1000) : '00:00:00';

  const addAttendanceRecord = (type: AttendanceEvent['type']) => {
    const todayKey = new Date().toISOString().split('T')[0];
    const newRecord: AttendanceEvent = { type, timestamp: new Date().getTime() };
    const todayRecords = attendanceRecords[todayKey] || [];
    setAttendanceRecords({
      ...attendanceRecords,
      [todayKey]: [...todayRecords, newRecord],
    });
  };

  const handleClockIn = () => {
    setAttendanceStatus('in');
    const now = new Date().getTime();
    setShiftStartTime(now);
    setLastEventTime(now);
    addAttendanceRecord('entrada');
  };

  const handleClockOut = () => {
    addAttendanceRecord('salida');
    setAttendanceStatus('out');
    setShiftStartTime(null);
    setLastEventTime(null);
  };
  
  const handlePause = () => {
    if (attendanceStatus === 'in') {
      addAttendanceRecord('inicio_pausa');
      setAttendanceStatus('paused');
      setLastEventTime(new Date().getTime());
    } else if (attendanceStatus === 'paused') {
      addAttendanceRecord('fin_pausa');
      setAttendanceStatus('in');
      setLastEventTime(new Date().getTime());
    }
  };

  const handleLeave = () => {
     if (attendanceStatus === 'in') {
      addAttendanceRecord('inicio_permiso');
      setAttendanceStatus('leave');
      setLastEventTime(new Date().getTime());
    } else if (attendanceStatus === 'leave') {
      addAttendanceRecord('fin_permiso');
      setAttendanceStatus('in');
      setLastEventTime(new Date().getTime());
    }
  };

  const handleGoToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };
  
  const handleDayChange = (offset: number) => {
    if (!selectedDate) return;
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
    if (newDate.getMonth() !== currentDate.getMonth() || newDate.getFullYear() !== currentDate.getFullYear()) {
      setCurrentDate(newDate);
    }
  };
  
  const getStatusInfo = (): { text: string; color: string } => {
    switch (attendanceStatus) {
      case 'in': return { text: 'Trabajando', color: 'text-green-600' };
      case 'paused': return { text: 'En Pausa', color: 'text-yellow-600' };
      case 'leave': return { text: 'En Permiso', color: 'text-orange-600' };
      case 'out':
      default: return { text: 'Fuera de turno', color: 'text-red-600' };
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = [];
    // Pad start
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        days.push(<div key={`pad-start-${i}`} className="p-2 text-center"></div>);
    }
    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0];
        const isToday = today.toDateString() === date.toDateString();
        const isSelected = selectedDate?.toDateString() === date.toDateString();
        
        const workedHours = calculateWorkedHours(dateKey);

        days.push(
            <div key={day} onClick={() => setSelectedDate(date)} className={`p-2 text-center border cursor-pointer rounded-lg transition-all ${isToday ? 'bg-primary text-white' : 'hover:bg-gray-100'} ${isSelected ? 'border-primary border-2' : 'border-gray-200'}`}>
                <div className="font-semibold">{day}</div>
                <div className="text-xs mt-1">{workedHours !== '00:00:00' ? workedHours : '-'}</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-lg">{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h4>
                <button onClick={handleGoToToday} className="px-3 py-1 text-sm font-medium text-primary bg-orange-100 hover:bg-orange-200 rounded-md transition-colors">Hoy</button>
              </div>
              <div className="flex items-center">
                <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
                <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-sm text-center font-medium text-gray-500 mb-2">
                <div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days}
            </div>
        </>
    );
  };

  const calculateWorkedHours = useCallback((dateKey: string): string => {
    const records = attendanceRecords[dateKey];
    if (!records || records.length === 0) return '00:00:00';

    let totalWorkSeconds = 0;
    let lastWorkStartTime: number | null = null;

    records.forEach(record => {
        switch (record.type) {
            case 'entrada':
            case 'fin_pausa':
            case 'fin_permiso':
                lastWorkStartTime = record.timestamp;
                break;
            case 'salida':
            case 'inicio_pausa':
            case 'inicio_permiso':
                if (lastWorkStartTime) {
                    totalWorkSeconds += (record.timestamp - lastWorkStartTime) / 1000;
                    lastWorkStartTime = null;
                }
                break;
        }
    });
    
    // If still clocked in at the end of the day records (e.g., forgot to clock out)
    const todayKey = new Date().toISOString().split('T')[0];
    if (dateKey === todayKey && lastWorkStartTime && attendanceStatus === 'in') {
      totalWorkSeconds += (new Date().getTime() - lastWorkStartTime) / 1000;
    }

    return formatDuration(totalWorkSeconds);
  }, [attendanceRecords, attendanceStatus]);

  const calculateWeeklyHours = useCallback(() => {
    if (!selectedDate) return '00:00:00';
    let totalSeconds = 0;
    const dayOfWeek = selectedDate.getDay();
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dateKey = date.toISOString().split('T')[0];
        const hoursStr = calculateWorkedHours(dateKey);
        const parts = hoursStr.split(':').map(Number);
        totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return formatDuration(totalSeconds);
  }, [selectedDate, calculateWorkedHours]);

  const calculateMonthlyHours = useCallback(() => {
      let totalSeconds = 0;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      Object.keys(attendanceRecords).forEach(dateKey => {
          const recordDate = new Date(dateKey);
          if (recordDate.getFullYear() === year && recordDate.getMonth() === month) {
              const hoursStr = calculateWorkedHours(dateKey);
              const parts = hoursStr.split(':').map(Number);
              totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
          }
      });
      return formatDuration(totalSeconds);
  }, [currentDate, attendanceRecords, calculateWorkedHours]);

  const handleDownloadCSV = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset='UTF-8'><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Mi Asistencia</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
            table, th, td { border: 1px solid black; border-collapse: collapse; }
            th { background-color: #f2f2f2; font-weight: bold; }
        </style>
        </head><body><table>
        <thead>
            <tr>
                <th>Fecha</th><th>Evento</th><th>Hora</th>
            </tr>
        </thead>
        <tbody>
    `;

    Object.keys(attendanceRecords).sort().forEach(dateKey => {
      const recordDate = new Date(dateKey);
      if (recordDate.getFullYear() === year && recordDate.getMonth() === month) {
        attendanceRecords[dateKey].forEach(record => {
            const time = new Date(record.timestamp).toLocaleTimeString('es-ES');
            const eventType = record.type.replace('_', ' ');
            tableHtml += `<tr><td>${dateKey}</td><td style="text-transform: capitalize;">${eventType}</td><td>${time}</td></tr>`;
        });
      }
    });

    tableHtml += '</tbody></table></body></html>';

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
    link.download = `mi_asistencia_${monthName}_${year}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const selectedDayRecords = selectedDate ? attendanceRecords[selectedDate.toISOString().split('T')[0]] || [] : [];
  const statusInfo = getStatusInfo();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <h3 className="text-xl font-semibold text-dark mb-4">Control de Asistencia</h3>
          <div className="text-center bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-3xl font-mono text-dark">{currentTime.toLocaleTimeString('es-ES')}</p>
            <p className="text-gray-500">{currentTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="text-center mb-6">
            <p className={`text-lg font-semibold ${statusInfo.color}`}>{statusInfo.text}</p>
            <div className="flex justify-around text-sm text-gray-500 mt-2">
              <div>
                <p>Duración Turno</p>
                <p className="font-semibold text-dark">{shiftDuration}</p>
              </div>
              <div>
                <p>Tiempo en Estado</p>
                <p className="font-semibold text-dark">{statusDuration}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {attendanceStatus === 'out' && (
              <Button onClick={handleClockIn} className="col-span-2">Marcar Entrada</Button>
            )}
            {attendanceStatus !== 'out' && (
              <>
                 <Button onClick={handlePause} variant="secondary" leftIcon={attendanceStatus === 'paused' ? <PlayIcon /> : <PauseIcon />}>
                  {attendanceStatus === 'paused' ? 'Reanudar Trabajo' : 'Iniciar Pausa'}
                </Button>
                <Button onClick={handleLeave} variant="secondary" leftIcon={attendanceStatus === 'leave' ? <PlayIcon /> : <PauseIcon />}>
                  {attendanceStatus === 'leave' ? 'Reanudar Trabajo' : 'Solicitar Permiso'}
                </Button>
                <Button onClick={handleClockOut} variant="danger" className="col-span-2">Finalizar Turno</Button>
              </>
            )}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
           <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-dark">Registro de Asistencia</h3>
                <div className="flex space-x-4 mt-2">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Total Semana</p>
                        <p className="font-bold text-lg text-primary">{calculateWeeklyHours()}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-sm text-gray-500">Total Mes</p>
                        <p className="font-bold text-lg text-secondary">{calculateMonthlyHours()}</p>
                    </div>
                </div>
              </div>
              <Button onClick={handleDownloadCSV} variant="ghost" leftIcon={<DownloadIcon className="h-4 w-4"/>}>Descargar Excel</Button>
           </div>
          {renderCalendar()}
           {selectedDate && (
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Detalles para el {selectedDate.toLocaleDateString('es-ES')}</h4>
                        <div className="flex items-center space-x-1">
                            <button onClick={() => handleDayChange(-1)} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={() => handleDayChange(1)} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                    {selectedDayRecords.length > 0 ? (
                      <div className="overflow-x-auto max-h-40">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2">Evento</th>
                                    <th className="px-4 py-2">Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedDayRecords.map((record, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 capitalize">{record.type.replace('_', ' ')}</td>
                                        <td className="px-4 py-2">{new Date(record.timestamp).toLocaleTimeString('es-ES')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                      </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center p-4 bg-gray-50 rounded-lg">No hay registros para este día.</p>
                    )}
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};

export default MyAttendance;