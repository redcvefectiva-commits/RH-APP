import React from 'react';
import Card from '../ui/Card';
import { requests, employees } from '../../services/mockData';
// FIX: Corrected import path for types.
import { Request } from '../../types';

const Requests: React.FC = () => {
    
    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';
    
    const getStatusInfo = (status: Request['status']) => {
        switch (status) {
          case 'Approved': return { text: 'Aprobada', className: 'bg-green-100 text-green-800' };
          case 'Pending': return { text: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' };
          case 'Rejected': return { text: 'Rechazada', className: 'bg-red-100 text-red-800' };
        }
    };
    
    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Solicitudes de Empleados</h2>
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500">
                        <tr>
                            <th className="py-2">Empleado</th>
                            <th>Tipo</th>
                            <th>Fechas</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id} className="border-t">
                                <td className="py-3 font-medium">{getEmployeeName(req.employeeId)}</td>
                                <td>{req.type}</td>
                                <td>{req.startDate} al {req.endDate}</td>
                                <td>
                                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusInfo(req.status).className}`}>
                                        {getStatusInfo(req.status).text}
                                    </span>
                                </td>
                                <td>
                                    {req.status === 'Pending' && (
                                        <div className="flex gap-2">
                                            <button className="text-xs text-green-600 hover:underline">Aprobar</button>
                                            <button className="text-xs text-red-600 hover:underline">Rechazar</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Requests;