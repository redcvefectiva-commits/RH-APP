import React from 'react';
import Card from '../ui/Card';
import { employees, dotacionDeliveries } from '../../services/mockData';
// FIX: Corrected import path for types.
import { DotacionDelivery } from '../../types';

const EntregaDotacion: React.FC = () => {
    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

    return (
        <Card>
            <h3 className="text-xl font-semibold text-dark mb-6">Entrega de Dotación</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Empleado</th>
                            <th className="px-6 py-3">Fecha de Entrega</th>
                            <th className="px-6 py-3">Artículos Entregados</th>
                            <th className="px-6 py-3">Próxima Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dotacionDeliveries.map(delivery => (
                            <tr key={delivery.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{getEmployeeName(delivery.employeeId)}</td>
                                <td className="px-6 py-4">{delivery.deliveryDate}</td>
                                <td className="px-6 py-4">{delivery.items.join(', ')}</td>
                                <td className="px-6 py-4">{delivery.nextDeliveryDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default EntregaDotacion;