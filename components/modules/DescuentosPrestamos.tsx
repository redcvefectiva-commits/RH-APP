import React from 'react';
import Card from '../ui/Card';
import { loans, employees } from '../../services/mockData';

const DescuentosPrestamos: React.FC = () => {
    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';
    const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    return (
        <Card>
            <h3 className="text-xl font-semibold text-dark mb-6">Préstamos y Descuentos</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Empleado</th>
                            <th className="px-6 py-3">Monto Solicitado</th>
                            <th className="px-6 py-3">Monto Pagado</th>
                            <th className="px-6 py-3">Progreso</th>
                            <th className="px-6 py-3">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map(loan => {
                            const progress = loan.amount > 0 ? Math.round((loan.paidAmount / loan.amount) * 100) : 0;
                            return (
                                <tr key={loan.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{getEmployeeName(loan.employeeId)}</td>
                                    <td className="px-6 py-4">{formatCurrency(loan.amount)}</td>
                                    <td className="px-6 py-4">{formatCurrency(loan.paidAmount)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-medium">{progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${loan.status === 'Activo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default DescuentosPrestamos;
