import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { candidates, employees } from '../../services/mockData';

type HiringStatus = 'Pendiente Documentación' | 'Documentación Recibida' | 'Contrato Enviado' | 'Contrato Firmado' | 'Afiliaciones Completas' | 'Contratado';

interface HiringProcess {
    candidateId: number;
    status: HiringStatus;
}

const Contratacion: React.FC = () => {
    const hiredCandidates = candidates.filter(c => c.pipeline.some(p => p.id === 'hired' && p.status === 'Approved'));
    
    const initialHiringState: HiringProcess[] = hiredCandidates.map(c => ({
        candidateId: c.id,
        status: 'Pendiente Documentación'
    }));
    
    const [hiringProcesses, setHiringProcesses] = useState<HiringProcess[]>(initialHiringState);
    
    const getCandidateName = (id: number) => candidates.find(c => c.id === id)?.name || 'Desconocido';
    const getCandidateAvatar = (id: number) => candidates.find(c => c.id === id)?.avatar || '';

    const handleUpdateStatus = (candidateId: number, newStatus: HiringStatus) => {
        setHiringProcesses(prev => prev.map(p => p.candidateId === candidateId ? {...p, status: newStatus } : p));
    };
    
    return (
        <Card>
            <h3 className="text-xl font-semibold text-dark mb-6">Procesos de Contratación Activos</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Candidato</th>
                            <th className="px-6 py-3">Estado del Proceso</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hiringProcesses.map(process => (
                             <tr key={process.candidateId} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium flex items-center">
                                     <img src={getCandidateAvatar(process.candidateId)} className="h-10 w-10 rounded-full mr-3" alt=""/>
                                     {getCandidateName(process.candidateId)}
                                </td>
                                 <td className="px-6 py-4">
                                     <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                        {process.status}
                                     </span>
                                 </td>
                                 <td className="px-6 py-4">
                                     <select 
                                        value={process.status} 
                                        onChange={(e) => handleUpdateStatus(process.candidateId, e.target.value as HiringStatus)}
                                        className="text-xs p-1 border rounded-md"
                                     >
                                        <option>Pendiente Documentación</option>
                                        <option>Documentación Recibida</option>
                                        <option>Contrato Enviado</option>
                                        <option>Contrato Firmado</option>
                                        <option>Afiliaciones Completas</option>
                                        <option>Contratado</option>
                                     </select>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Contratacion;
