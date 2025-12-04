import React from 'react';
import Card from '../ui/Card';
import { securityIncidents, employees } from '../../services/mockData';

const Security: React.FC = () => {
    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';
    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Incidentes de Seguridad</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="py-2">Tipo</th>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Reportado Por</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {securityIncidents.map(incident => (
                            <tr key={incident.id} className="border-t">
                                <td className="py-3 font-medium">{incident.type}</td>
                                <td>{incident.date}</td>
                                <td className="max-w-xs truncate">{incident.description}</td>
                                <td>{getEmployeeName(incident.reportedBy)}</td>
                                <td>{incident.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Security;
