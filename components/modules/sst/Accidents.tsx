import React from 'react';
import { sstAccidentReports } from '../../../services/sstMockData';
import { employees } from '../../../services/mockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';

const Accidents: React.FC = () => {

    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

    const handleExport = () => {
        const dataToExport = sstAccidentReports.map(r => ({
            ...r,
            employeeName: getEmployeeName(r.employeeId),
        }));
        const headers = [
            { label: 'Empleado', key: 'employeeName' },
            { label: 'Fecha', key: 'date' },
            { label: 'Tipo', key: 'type' },
            { label: 'Descripción', key: 'description' },
            { label: 'Estado Investigación', key: 'investigationStatus' },
        ];
        exportDataToXLS(dataToExport, headers, 'Reporte_Accidentes');
    };

    return (
        <div>
            <div className="flex justify-end gap-2 mb-4">
                <Button onClick={handleExport}>Exportar a Excel</Button>
                <Button variant="secondary">Cargar Reporte (FURAT)</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 text-left">Empleado</th>
                            <th className="text-left">Fecha</th>
                            <th className="text-left">Tipo</th>
                            <th className="text-left">Descripción</th>
                            <th className="text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sstAccidentReports.map(report => (
                            <tr key={report.id} className="border-b">
                                <td className="p-2">{getEmployeeName(report.employeeId)}</td>
                                <td>{report.date}</td>
                                <td>{report.type}</td>
                                <td className="max-w-md truncate">{report.description}</td>
                                <td>{report.investigationStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Accidents;
