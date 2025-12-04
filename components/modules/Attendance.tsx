

import React, { useState, useEffect, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { DownloadIcon } from '../ui/Icons';
// FIX: Corrected import path for types
import { Employee, EmployeeAttendanceData } from '../../types';
import { employees as mockEmployees } from '../../services/mockData';
import { generateAttendanceData } from '../../services/attendanceMockData';
import { calculateWorkedSecondsForDay, formatDuration } from '../../services/attendanceUtils';

const Attendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<EmployeeAttendanceData[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // Generate mock data only once
    const data = generateAttendanceData(mockEmployees);
    setAttendanceData(data);
  }, []);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const selectedEmployeeData = useMemo(() => {
    if (!selectedEmployee) return null;
    return attendanceData.find(d => d.employeeId === selectedEmployee.id);
  }, [selectedEmployee, attendanceData]);


  const exportToExcel = () => {
    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset='UTF-8'><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Asistencia</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <style> table, th, td { border: 1px solid black; border-collapse: collapse; } th { background-color: #f2f2f2; font-weight: bold; } </style>
      </head><body><table>
      <thead>
        <tr>
          <th>Empleado</th><th>Fecha</th><th>Estado</th><th>Entrada</th><th>Salida</th><th>Horas Trabajadas</th><th>Motivo Ausencia</th>
        </tr>
      </thead>
      <tbody>
    `;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    mockEmployees.forEach(employee => {
      const empData = attendanceData.find(d => d.employeeId === employee.id);
      if (!empData) return;

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const dateKey = date.toISOString().split('T')[0];
        const absence = empData.absences.find(a => a.date === dateKey);
        const events = empData.events[dateKey] || [];
        
        const entry = events.find(e => e.type === 'entrada');
        const exit = events.find(e => e.type === 'salida');
        const workedSeconds = calculateWorkedSecondsForDay(empData, dateKey);

        tableHtml += `
          <tr>
            <td>${employee.name}</td>
            <td>${dateKey}</td>
            <td>${absence ? 'Ausente' : 'Presente'}</td>
            <td>${entry ? new Date(entry.timestamp).toLocaleTimeString('es-ES') : '-'}</td>
            <td>${exit ? new Date(exit.timestamp).toLocaleTimeString('es-ES') : '-'}</td>
            <td>${formatDuration(workedSeconds)}</td>
            <td>${absence ? absence.reason : '-'}</td>
          </tr>
        `;
      }
    });
    
    tableHtml += '</tbody></table></body></html>';
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
    link.download = `asistencia_${monthName}_${year}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-dark">Asistencia del Equipo</h3>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-1 rounded-full hover:bg-gray-100">&lt;</button>
            <span className="font-semibold text-lg capitalize">{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
            <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-1 rounded-full hover:bg-gray-100">&gt;</button>
          </div>
        </div>
        <Button onClick={exportToExcel} variant="secondary" leftIcon={<DownloadIcon />}>Descargar Excel</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Empleado</th>
              <th className="px-6 py-3 text-center">Horas Trabajadas</th>
              <th className="px-6 py-3 text-center">Días Presentes</th>
              <th className="px-6 py-3 text-center">Días Ausentes</th>
              <th className="px-6 py-3 text-center">Tardanzas</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockEmployees.map(employee => {
              const empData = attendanceData.find(d => d.employeeId === employee.id);
              if (!empData) return null;

              const monthStats = Object.keys(empData.events).reduce((acc, dateKey) => {
                  const date = new Date(dateKey);
                  if (date.getFullYear() === year && date.getMonth() === month) {
                      acc.totalSeconds += calculateWorkedSecondsForDay(empData, dateKey);
                      acc.presentDays++;
                      const entry = empData.events[dateKey].find(e => e.type === 'entrada');
                      if (entry && new Date(entry.timestamp).getHours() >= 8 && new Date(entry.timestamp).getMinutes() > 30) {
                          acc.lateDays++;
                      }
                  }
                  return acc;
              }, { totalSeconds: 0, presentDays: 0, lateDays: 0 });

              const absentDays = empData.absences.filter(a => {
                  const date = new Date(a.date);
                  return date.getFullYear() === year && date.getMonth() === month;
              }).length;

              return (
                <tr key={employee.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center">
                      <img className="w-10 h-10 rounded-full object-cover" src={employee.avatar} alt={employee.name} />
                      <div className="pl-3">
                        <div className="font-semibold">{employee.name}</div>
                        <div className="text-gray-500 text-xs">{employee.cargo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono">{formatDuration(monthStats.totalSeconds)}</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-600">{monthStats.presentDays}</td>
                  <td className="px-6 py-4 text-center font-semibold text-red-600">{absentDays}</td>
                  <td className="px-6 py-4 text-center font-semibold text-yellow-600">{monthStats.lateDays}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" onClick={() => handleViewDetails(employee)}>Ver Detalles</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {selectedEmployee && selectedEmployeeData && (
         <AttendanceDetailModal 
            isOpen={isDetailModalOpen} 
            onClose={() => setIsDetailModalOpen(false)}
            employee={selectedEmployee}
            attendanceData={selectedEmployeeData}
            currentMonth={currentDate}
          />
      )}
    </Card>
  );
};

const AttendanceDetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  attendanceData: EmployeeAttendanceData;
  currentMonth: Date;
}> = ({ isOpen, onClose, employee, attendanceData, currentMonth }) => {
    
    const [selectedDate, setSelectedDate] = useState(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));

    useEffect(() => {
        setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
    }, [currentMonth]);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const selectedDateKey = selectedDate.toISOString().split('T')[0];
    const dayEvents = attendanceData.events[selectedDateKey] || [];
    const dayAbsence = attendanceData.absences.find(a => a.date === selectedDateKey);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Detalle de Asistencia - ${employee.name}`} size="2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold capitalize mb-2">{currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h4>
                    <div className="grid grid-cols-7 gap-1 text-sm text-center font-medium text-gray-500 mb-2">
                        <div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                       {Array.from({ length: (firstDay === 0 ? 6 : firstDay - 1) }).map((_, i) => <div key={`pad-${i}`} />)}
                       {Array.from({ length: daysInMonth }).map((_, day) => {
                            const date = new Date(year, month, day + 1);
                            const dateKey = date.toISOString().split('T')[0];
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                            const absence = attendanceData.absences.find(a => a.date === dateKey);
                            
                            let bgColor = 'bg-gray-100 hover:bg-gray-200';
                            if (isWeekend) bgColor = 'bg-gray-50';
                            else if (absence) bgColor = 'bg-red-200 hover:bg-red-300';
                            else if (attendanceData.events[dateKey]) bgColor = 'bg-green-200 hover:bg-green-300';
                            
                            if (isSelected) bgColor = 'bg-primary text-white';

                            return (
                                <div key={day} onClick={() => setSelectedDate(date)} 
                                    className={`p-2 text-center rounded-full cursor-pointer transition-colors text-sm ${bgColor}`}
                                    title={absence?.reason}>
                                    {day + 1}
                                </div>
                            );
                       })}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Registro del ${selectedDate.toLocaleDateString('es-ES')}</h4>
                    {dayAbsence ? (
                        <div className="bg-red-50 p-4 rounded-lg text-red-700">
                            <p className="font-bold">Ausente</p>
                            <p>Motivo: {dayAbsence.reason}</p>
                        </div>
                    ) : dayEvents.length > 0 ? (
                        <div className="space-y-2">
                            {dayEvents.map((event, i) => (
                                <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                    <span className="capitalize text-gray-700">{event.type.replace('_', ' ')}</span>
                                    <span className="font-mono font-semibold">{new Date(event.timestamp).toLocaleTimeString('es-ES')}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center bg-blue-50 p-2 rounded-md mt-2">
                                <span className="font-bold text-primary">Horas Trabajadas</span>
                                <span className="font-mono font-bold text-primary">{formatDuration(calculateWorkedSecondsForDay(attendanceData, selectedDateKey))}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center p-4 bg-gray-50 rounded-lg">No hay registros para este día.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Attendance;