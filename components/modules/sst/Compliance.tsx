import React from 'react';
import { sstComplianceRecords } from '../../../services/sstMockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';

const Compliance: React.FC = () => {

    const handleExport = () => {
        const headers = [
            { label: 'Norma', key: 'norm' },
            { label: 'Artículo/Requisito', key: 'article' },
            { label: 'Estado', key: 'status' },
            { label: 'Evidencia', key: 'evidence' },
        ];
        exportDataToXLS(sstComplianceRecords, headers, 'Cumplimiento_Normativo_SST');
    };

    return (
        <div>
            <div className="flex justify-end gap-2 mb-4">
                <Button onClick={handleExport}>Exportar a Excel</Button>
                <Button variant="secondary">Cargar Evidencia</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 text-left">Norma</th>
                            <th className="text-left">Artículo/Requisito</th>
                            <th className="text-left">Estado</th>
                            <th className="text-left">Evidencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sstComplianceRecords.map(record => (
                            <tr key={record.id} className="border-b">
                                <td className="p-2">{record.norm}</td>
                                <td>{record.article}</td>
                                <td>{record.status}</td>
                                <td>{record.evidence}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Compliance;
