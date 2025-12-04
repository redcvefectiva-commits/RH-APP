import React, { useRef, useEffect } from 'react';
import { sstRisks } from '../../../services/sstMockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';

declare const Chart: any;

const RiskAssessment: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();

            const riskCounts = sstRisks.reduce((acc, risk) => {
                acc[risk.level] = (acc[risk.level] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            chartInstance.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(riskCounts),
                    datasets: [{
                        data: Object.values(riskCounts),
                        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                    }]
                },
                 options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }
         return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);

    const handleExport = () => {
        const headers = [
            { label: 'Área', key: 'area' },
            { label: 'Tarea', key: 'task' },
            { label: 'Descripción', key: 'description' },
            { label: 'Clasificación', key: 'classification' },
            { label: 'Nivel', key: 'level' },
        ];
        exportDataToXLS(sstRisks, headers, 'Matriz_de_Riesgos');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Área</th>
                                <th className="text-left">Tarea</th>
                                <th className="text-left">Clasificación</th>
                                <th className="text-left">Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sstRisks.map(risk => (
                                <tr key={risk.id} className="border-b">
                                    <td className="p-2">{risk.area}</td>
                                    <td>{risk.task}</td>
                                    <td>{risk.classification}</td>
                                    <td>{risk.level}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-4">
                <div className="h-64"><canvas ref={chartRef}></canvas></div>
                <Button className="w-full" onClick={handleExport}>Exportar a Excel</Button>
                <Button className="w-full" variant="secondary">Cargar Documento</Button>
            </div>
        </div>
    );
};

export default RiskAssessment;
