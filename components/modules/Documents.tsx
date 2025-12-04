import React from 'react';
import Card from '../ui/Card';
import { documents } from '../../services/mockData';
import { DocumentTextIcon } from '../ui/Icons';

const Documents: React.FC = () => {
  return (
    <Card>
        <h2 className="text-xl font-semibold mb-4">Gestor de Documentos</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-500">
                        <th className="py-2">Nombre del Archivo</th>
                        <th>Categoría</th>
                        <th>Última Modificación</th>
                        <th>Tamaño</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map(doc => (
                        <tr key={doc.id} className="border-t">
                            <td className="py-3 font-medium flex items-center">
                                <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-400"/>
                                {doc.name}
                            </td>
                            <td>{doc.category}</td>
                            <td>{doc.lastModified}</td>
                            <td>{doc.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
  );
};

export default Documents;
