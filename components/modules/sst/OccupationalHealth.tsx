import React, { useRef, useEffect } from 'react';
import { sstHealthExams } from '../../../services/sstMockData';
import { employees } from '../../../services/mockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';

declare const Chart: any;

const OccupationalHealth: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();

            const examCounts = sstHealthExams.reduce((acc, exam) => {
                acc[exam.examType] = (acc[exam.examType] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            chartInstance.current = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: Object.keys(examCounts),
                    datasets: [{
                        data: Object.values(examCounts),
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);
    
    const handleExport = () => {
        const dataToExport = sstHealthExams.map(r => ({
            ...r,
            employeeName: getEmployeeName(r.employeeId),
        }));
        const headers = [
            { label: 'Empleado', key: 'employeeName' },
            { label: 'Tipo de Examen', key: 'examType' },
            { label: 'Fecha', key: 'date' },
            { label: 'Resultado', key: 'result' },
            { label: 'Recomendaciones', key: 'recommendations' },
        ];
        exportDataToXLS(dataToExport, headers, 'Registros_Salud_Ocupacional');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Empleado</th>
                                <th className="text-left">Tipo Examen</th>
                                <th className="text-left">Fecha</th>
                                <th className="text-left">Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sstHealthExams.map(exam => (
                                <tr key={exam.id} className="border-b">
                                    <td className="p-2">{getEmployeeName(exam.employeeId)}</td>
                                    <td>{exam.examType}</td>
                                    <td>{exam.date}</td>
                                    <td>{exam.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-4">
                <h4 className="font-semibold text-center">Exámenes por Tipo</h4>
                <div className="h-64"><canvas ref={chartRef}></canvas></div>
                <Button className="w-full" onClick={handleExport}>Exportar a Excel</Button>
                <Button className="w-full" variant="secondary">Cargar Examen</Button>
            </div>
        </div>
    );
};

export default OccupationalHealth;
