



import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { DownloadIcon } from '../ui/Icons';
import { employees } from '../../services/mockData';

declare const Chart: any;

interface Shift {
  id: number;
  docente: string;
  fecha: string;
  tipoDeTurno: string;
  horario: string;
}

interface ShiftConfig {
  tiposDeTurno: string[];
  docentes: string[];
}

const HORARIOS: { [key: string]: string } = {
    'Horario Oficina': '8:00 AM - 5:00 PM',
    'Operativo Mañana': '8:00 AM - 12:00 PM',
    'Operativo Tarde': '12:00 PM - 5:00 PM'
};

const initialConfig: ShiftConfig = {
    tiposDeTurno: Object.keys(HORARIOS),
    docentes: employees.map(e => e.name),
};

const today = new Date('2025-10-03T12:00:00');

const Shifts: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [config, setConfig] = useState<ShiftConfig>(initialConfig);
    const [shifts, setShifts] = useState<Shift[]>([]);
    
    const [newShiftDocente, setNewShiftDocente] = useState(config.docentes[0]);
    const [newShiftFecha, setNewShiftFecha] = useState(today.toISOString().split('T')[0]);
    const [newShiftTipo, setNewShiftTipo] = useState(config.tiposDeTurno[0]);
    const [newConfigDocente, setNewConfigDocente] = useState('');
    const [newConfigTurno, setNewConfigTurno] = useState('');

    const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
    const [calendarYear, setCalendarYear] = useState(today.getFullYear());
    
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    // FIX: Generate a smaller, fixed amount of sample data only once to prevent freezing.
    useEffect(() => {
        const generateSampleData = () => {
            const year = today.getFullYear();
            const month = today.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            let generatedShifts: Shift[] = [];
            const localConfig = { ...initialConfig };
            const totalShiftsToGenerate = 35; // Drastically reduced from previous version

            for (let i = 0; i < totalShiftsToGenerate; i++) {
                const day = Math.floor(Math.random() * daysInMonth) + 1;
                const date = new Date(year, month, day);
                if (date.getDay() === 0 || date.getDay() === 6) continue;

                if (localConfig.docentes.length === 0) continue;
                
                const docente = localConfig.docentes[Math.floor(Math.random() * localConfig.docentes.length)];
                const tipoDeTurno = localConfig.tiposDeTurno[Math.floor(Math.random() * localConfig.tiposDeTurno.length)];
                
                generatedShifts.push({
                    id: i + 1,
                    docente: docente,
                    fecha: date.toISOString().split('T')[0],
                    tipoDeTurno: tipoDeTurno,
                    horario: HORARIOS[tipoDeTurno]
                });
            }
            // Filter out duplicate shifts for the same person on the same day
            const uniqueShifts = Array.from(new Map(generatedShifts.map(s => [`${s.fecha}-${s.docente}`, s])).values());
            setShifts(uniqueShifts);
        };
        
        if (shifts.length === 0) {
            generateSampleData();
        }
    }, [shifts.length]);

    useEffect(() => {
        if (!chartRef.current || shifts.length === 0) return;

        const turnoCounts = config.tiposDeTurno.reduce((acc, tipo) => {
            acc[tipo] = shifts.filter(t => t.tipoDeTurno === tipo).length;
            return acc;
        }, {} as {[key: string]: number});

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(turnoCounts),
                datasets: [{
                    data: Object.values(turnoCounts),
                    backgroundColor: ['#F58B10', '#10b981', '#f59e0b'],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { padding: 15 } } }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };

    }, [shifts, config.tiposDeTurno]);

    const handleAddShift = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = shifts.length > 0 ? Math.max(...shifts.map(t => t.id)) + 1 : 1;
        const newShift: Shift = {
            id: newId,
            docente: newShiftDocente,
            fecha: newShiftFecha,
            tipoDeTurno: newShiftTipo,
            horario: HORARIOS[newShiftTipo]
        };
        setShifts(prev => [newShift, ...prev].sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));
    };
    
    const handleDeleteShift = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este turno?')) {
            setShifts(prev => prev.filter(s => s.id !== id));
        }
    };
    
    const handleAddConfigItem = (key: 'docentes' | 'tiposDeTurno', value: string, setValue: (s:string) => void) => {
        if (value.trim() && !config[key].includes(value.trim())) {
            setConfig(prev => ({
                ...prev,
                [key]: [...prev[key], value.trim()]
            }));
            setValue('');
        }
    };
    
    const getTurnoBadge = (tipo: string) => {
         const colors: {[key: string]: string} = {
            'Horario Oficina': 'bg-orange-100 text-orange-800',
            'Operativo Mañana': 'bg-yellow-100 text-yellow-800',
            'Operativo Tarde': 'bg-green-100 text-green-800'
         };
         return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[tipo] || 'bg-gray-100 text-gray-800'}`}>{tipo}</span>;
    };
    
    const exportToExcel = () => {
        let tableHtml = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset='UTF-8'><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Turnos</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            <style>
                table, th, td { border: 1px solid black; border-collapse: collapse; }
                th { background-color: #f2f2f2; font-weight: bold; }
            </style>
            </head><body><table>
            <thead>
                <tr>
                    <th>Docente</th><th>Fecha</th><th>Tipo de Turno</th><th>Horario</th>
                </tr>
            </thead>
            <tbody>
        `;

        shifts.forEach(shift => {
            tableHtml += `
                <tr>
                    <td>${shift.docente}</td>
                    <td>${shift.fecha}</td>
                    <td>${shift.tipoDeTurno}</td>
                    <td>${shift.horario}</td>
                </tr>
            `;
        });

        tableHtml += '</tbody></table></body></html>';
        
        const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `turnos_${calendarYear}_${calendarMonth + 1}.xls`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const tabs = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'gestion', label: 'Gestión de Turnos' },
      { id: 'config', label: 'Configuración' },
    ];

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                            activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === 'dashboard' && (
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Distribución de Turnos</h3>
                    <div className="h-80"><canvas ref={chartRef}></canvas></div>
                </Card>
            )}

            {activeTab === 'gestion' && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Planilla de Turnos</h2>
                    <form onSubmit={handleAddShift} className="flex flex-wrap gap-4 items-end mb-4 p-4 bg-gray-50 rounded-lg">
                        <div><label className="block text-sm font-medium">Docente</label><select value={newShiftDocente} onChange={e => setNewShiftDocente(e.target.value)} className="p-2 border rounded-md"><option value="">Seleccionar...</option>{config.docentes.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                        <div><label className="block text-sm font-medium">Fecha</label><input type="date" value={newShiftFecha} onChange={e => setNewShiftFecha(e.target.value)} className="p-2 border rounded-md"/></div>
                        <div><label className="block text-sm font-medium">Tipo de Turno</label><select value={newShiftTipo} onChange={e => setNewShiftTipo(e.target.value)} className="p-2 border rounded-md"><option value="">Seleccionar...</option>{config.tiposDeTurno.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                        <Button type="submit">Asignar Turno</Button>
                        <Button type="button" variant="secondary" onClick={exportToExcel} leftIcon={<DownloadIcon />}>Exportar</Button>
                    </form>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-left">
                            <tr><th className="p-3">Docente</th><th>Fecha</th><th>Tipo de Turno</th><th>Horario</th><th></th></tr>
                            </thead>
                            <tbody>
                            {shifts.map(shift => (
                                <tr key={shift.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{shift.docente}</td>
                                    <td>{shift.fecha}</td>
                                    <td>{getTurnoBadge(shift.tipoDeTurno)}</td>
                                    <td>{shift.horario}</td>
                                    <td><button onClick={() => handleDeleteShift(shift.id)} className="text-red-500 hover:text-red-700 font-bold">X</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {activeTab === 'config' && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Configuración de Turnos</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Gestionar Docentes</h3>
                            <div className="flex gap-2"><input value={newConfigDocente} onChange={e => setNewConfigDocente(e.target.value)} placeholder="Nombre del docente" className="p-2 border rounded-md flex-grow"/><Button onClick={() => handleAddConfigItem('docentes', newConfigDocente, setNewConfigDocente)}>Añadir</Button></div>
                            <ul className="mt-2 text-sm list-disc pl-5">
                                {config.docentes.map(d => <li key={d}>{d}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Gestionar Tipos de Turno</h3>
                            <div className="flex gap-2"><input value={newConfigTurno} onChange={e => setNewConfigTurno(e.target.value)} placeholder="Nombre del turno" className="p-2 border rounded-md flex-grow"/><Button onClick={() => handleAddConfigItem('tiposDeTurno', newConfigTurno, setNewConfigTurno)}>Añadir</Button></div>
                            <ul className="mt-2 text-sm list-disc pl-5">
                                {config.tiposDeTurno.map(t => <li key={t}>{t}</li>)}
                            </ul>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};
// FIX: Added a default export to resolve the module import error.
export default Shifts;
