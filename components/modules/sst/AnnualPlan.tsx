import React, { useRef, useEffect } from 'react';
import { sstAnnualPlan } from '../../../services/sstMockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';

declare const Chart: any;

const AnnualPlan: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();

            const statusCounts = sstAnnualPlan.reduce((acc, task) => {
                acc[task.status] = (acc[task.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: Object.keys(statusCounts),
                    datasets: [{
                        label: 'Número de Tareas',
                        data: Object.values(statusCounts),
                        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);

    const handleExport = () => {
        const headers = [
            { label: 'Actividad', key: 'activity' },
            { label: 'Responsable', key: 'responsible' },
            { label: 'Fecha Límite', key: 'deadline' },
            { label: 'Estado', key: 'status' },
        ];
        exportDataToXLS(sstAnnualPlan, headers, 'Plan_Anual_SST');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Actividad</th>
                                <th className="text-left">Responsable</th>
                                <th className="text-left">Fecha Límite</th>
                                <th className="text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sstAnnualPlan.map(task => (
                                <tr key={task.id} className="border-b">
                                    <td className="p-2">{task.activity}</td>
                                    <td>{task.responsible}</td>
                                    <td>{task.deadline}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-4">
                <div className="h-64"><canvas ref={chartRef}></canvas></div>
                <Button className="w-full" onClick={handleExport}>Exportar a Excel</Button>
                <Button className="w-full" variant="secondary">Cargar Evidencia</Button>
            </div>
        </div>
    );
};

export default AnnualPlan;
