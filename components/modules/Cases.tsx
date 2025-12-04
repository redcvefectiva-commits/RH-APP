import React from 'react';
import Card from '../ui/Card';
import { disciplinaryCases, employees } from '../../services/mockData';

const Cases: React.FC = () => {
    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Casos Disciplinarios</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="py-2">Empleado</th>
                            <th>Fecha</th>
                            <th>Tipo de Falta</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinaryCases.map(dCase => (
                            <tr key={dCase.id} className="border-t">
                                <td className="py-3 font-medium">{getEmployeeName(dCase.employeeId)}</td>
                                <td>{dCase.date}</td>
                                <td>{dCase.faultType}</td>
                                <td className="max-w-xs truncate">{dCase.description}</td>
                                <td>{dCase.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Cases;
