import React, { useState } from 'react';
import { sstTrainingRecords } from '../../../services/sstMockData';
import { employees } from '../../../services/mockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';
import SignatureModal from './SignatureModal';

const Training: React.FC = () => {
    const [records, setRecords] = useState(sstTrainingRecords);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [signingRecordId, setSigningRecordId] = useState<number | null>(null);

    const handleExport = () => {
        const dataToExport = records.map(r => ({
            ...r,
            attendees: r.attendees.map(id => employees.find(e => e.id === id)?.name || id).join(', '),
        }));
        const headers = [
            { label: 'Tema', key: 'topic' },
            { label: 'Fecha', key: 'date' },
            { label: 'Instructor', key: 'instructor' },
            { label: 'Asistentes', key: 'attendees' },
            { label: 'Firmado', key: 'signed' },
        ];
        exportDataToXLS(dataToExport, headers, 'Registros_Capacitacion_SST');
    };
    
    const openSignatureModal = (id: number) => {
        setSigningRecordId(id);
        setIsSignatureModalOpen(true);
    };

    const handleSaveSignature = (signature: string) => {
        if (signingRecordId !== null) {
            setRecords(prev => prev.map(r => r.id === signingRecordId ? { ...r, signed: true } : r));
            console.log("Firma guardada para el registro", signingRecordId, signature);
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-end gap-2 mb-4">
                    <Button onClick={handleExport}>Exportar a Excel</Button>
                    <Button variant="secondary">Cargar Asistencia</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Tema</th>
                                <th className="text-left">Fecha</th>
                                <th className="text-left">Asistentes</th>
                                <th className="text-left">Firma de Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(record => (
                                <tr key={record.id} className="border-b">
                                    <td className="p-2">{record.topic}</td>
                                    <td>{record.date}</td>
                                    <td>{record.attendees.length}</td>
                                    <td>
                                        {record.signed ? (
                                            <span className="text-green-600 font-semibold">Firmado</span>
                                        ) : (
                                            <Button variant="ghost" size="sm" onClick={() => openSignatureModal(record.id)}>
                                                Firmar
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

export default Training;
