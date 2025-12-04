import React from 'react';
import { sstDocuments } from '../../../services/sstMockData';
import { exportDataToXLS } from '../../../utils/exportUtils';
import Button from '../../ui/Button';
import { DocumentTextIcon } from '../../ui/Icons';

const SSTDocuments: React.FC = () => {

    const handleExport = () => {
        const headers = [
            { label: 'Nombre del Documento', key: 'name' },
            { label: 'Categoría', key: 'category' },
            { label: 'Última Modificación', key: 'lastModified' },
        ];
        exportDataToXLS(sstDocuments, headers, 'Documentos_SST');
    };

    return (
        <div>
            <div className="flex justify-end gap-2 mb-4">
                <Button onClick={handleExport}>Exportar a Excel</Button>
                <Button variant="secondary">Subir Nuevo Documento</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 text-left">Nombre del Documento</th>
                            <th className="text-left">Categoría</th>
                            <th className="text-left">Última Modificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sstDocuments.map(doc => (
                            <tr key={doc.id} className="border-b">
                                <td className="p-2 flex items-center">
                                    <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" />
                                    <a href={doc.url} className="hover:underline text-primary">{doc.name}</a>
                                </td>
                                <td>{doc.category}</td>
                                <td>{doc.lastModified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SSTDocuments;
