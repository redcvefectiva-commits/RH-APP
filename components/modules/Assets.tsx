import React from 'react';
import Card from '../ui/Card';
import { assets, employees } from '../../services/mockData';

const Assets: React.FC = () => {
    
    const getAssigneeName = (id: number) => employees.find(e => e.id === id)?.name || 'Unknown';

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Gestión de Activos</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="py-2">Tipo</th>
                            <th>Modelo</th>
                            <th>Nro. Serial</th>
                            <th>Asignado a</th>
                            <th>Fecha Asignación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map(asset => (
                            <tr key={asset.id} className="border-t">
                                <td className="py-3 font-medium">{asset.type}</td>
                                <td>{asset.model}</td>
                                <td>{asset.serialNumber}</td>
                                <td>{getAssigneeName(asset.assignedTo)}</td>
                                <td>{asset.assignmentDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Assets;
