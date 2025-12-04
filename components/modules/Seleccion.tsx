import React from 'react';
import Card from '../ui/Card';
import { candidates, jobOpenings } from '../../services/mockData';

const Seleccion: React.FC = () => {

    const getJobTitle = (id: number) => jobOpenings.find(j => j.id === id)?.title || 'N/A';
    
    const activeCandidates = candidates.filter(c => {
        const lastStage = c.pipeline[c.pipeline.length - 1];
        const isRejected = c.pipeline.some(p => p.status === 'Rejected');
        return !isRejected && lastStage.status !== 'Approved';
    });
    
    return (
        <Card>
            <h3 className="text-xl font-semibold text-dark mb-6">Candidatos en Proceso de Selección</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Candidato</th>
                            <th className="px-6 py-3">Vacante Aplicada</th>
                            <th className="px-6 py-3">Etapa Actual</th>
                            <th className="px-6 py-3">Fuente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeCandidates.map(candidate => {
                            const currentStage = candidate.pipeline.find(p => p.status === 'Pending') || candidate.pipeline.slice().reverse().find(p => p.status === 'Approved');
                            return (
                                <tr key={candidate.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium flex items-center">
                                        <img src={candidate.avatar} className="h-10 w-10 rounded-full mr-3" alt={candidate.name}/>
                                        {candidate.name}
                                    </td>
                                    <td className="px-6 py-4">{getJobTitle(candidate.appliedFor)}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {currentStage?.name || 'Finalizado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{candidate.source}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Seleccion;
