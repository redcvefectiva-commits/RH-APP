import React, { useState } from 'react';
import { sstEPPRecords } from '../../../services/sstMockData';
import { employees } from '../../../services/mockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';
import SignatureModal from './SignatureModal';

const EPP: React.FC = () => {
    const [records, setRecords] = useState(sstEPPRecords);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [signingRecordId, setSigningRecordId] = useState<number | null>(null);

    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

    const handleExport = () => {
        const dataToExport = records.map(r => ({
            ...r,
            employeeName: getEmployeeName(r.employeeId),
        }));
        const headers = [
            { label: 'Empleado', key: 'employeeName' },
            { label: 'EPP Entregado', key: 'epp' },
            { label: 'Fecha de Entrega', key: 'deliveryDate' },
            { label: 'Cantidad', key: 'quantity' },
            { label: 'Firmado', key: 'signed' },
        ];
        exportDataToXLS(dataToExport, headers, 'Registros_Entrega_EPP');
    };

    const openSignatureModal = (id: number) => {
        setSigningRecordId(id);
        setIsSignatureModalOpen(true);
    };

    const handleSaveSignature = (signature: string) => {
        if (signingRecordId !== null) {
            setRecords(prev => prev.map(r => r.id === signingRecordId ? { ...r, signed: true } : r));
        }
    };
    
    return (
        <>
            <div>
                 <div className="flex justify-end gap-2 mb-4">
                    <Button onClick={handleExport}>Exportar a Excel</Button>
                    <Button variant="secondary">Cargar Registro</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Empleado</th>
                                <th className="text-left">EPP</th>
                                <th className="text-left">Fecha Entrega</th>
                                <th className="text-left">Constancia Firmada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(record => (
                                <tr key={record.id} className="border-b">
                                    <td className="p-2">{getEmployeeName(record.employeeId)}</td>
                                    <td>{record.epp}</td>
                                    <td>{record.deliveryDate}</td>
                                    <td>
                                        {record.signed ? (
                                            <span className="text-green-600 font-semibold">Recibido</span>
                                        ) : (
                                            <Button variant="ghost" size="sm" onClick={() => openSignatureModal(record.id)}>
                                                Firmar Recibido
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <SignatureModal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                onSave={handleSaveSignature}
            />
        </>
    );
};

export default EPP;
