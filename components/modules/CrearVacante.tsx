import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { PlusIcon } from '../ui/Icons';
import { vacancyRequisitions as mockRequisitions } from '../../services/mockData';
import { jobProfiles } from '../../services/mockData';
// FIX: Corrected import path for types.
import { VacancyRequisition } from '../../types';

const CrearVacante: React.FC = () => {
    const [requisitions, setRequisitions] = useState<VacancyRequisition[]>(mockRequisitions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRequisition, setNewRequisition] = useState({
        jobProfileId: jobProfiles[0]?.id || 0,
        requestedBy: '',
        justification: ''
    });

    const handleCreateRequisition = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Math.max(...requisitions.map(r => r.id), 0) + 1;
        const newReq: VacancyRequisition = {
            id: newId,
            ...newRequisition,
            requestDate: new Date().toISOString().split('T')[0],
            status: 'Pendiente'
        };
        setRequisitions(prev => [newReq, ...prev]);
        setIsModalOpen(false);
    };

    const getProfileTitle = (id: number) => jobProfiles.find(p => p.id === id)?.jobTitle || 'Perfil Desconocido';
    
    const getStatusClass = (status: VacancyRequisition['status']) => {
        switch(status) {
            case 'Aprobada': return 'bg-green-100 text-green-800';
            case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'Rechazada': return 'bg-red-100 text-red-800';
        }
    };

    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-dark">Solicitudes de Vacantes</h3>
                    <Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusIcon />}>
                        Crear Solicitud
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Cargo Solicitado</th>
                                <th className="px-6 py-3">Solicitado Por</th>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requisitions.map(req => (
                                <tr key={req.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{getProfileTitle(req.jobProfileId)}</td>
                                    <td className="px-6 py-4">{req.requestedBy}</td>
                                    <td className="px-6 py-4">{req.requestDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Solicitud de Vacante">
                <form onSubmit={handleCreateRequisition} className="space-y-4">
                    <div>
                        <label className="block font-medium">Perfil de Cargo</label>
                        <select 
                            value={newRequisition.jobProfileId} 
                            onChange={e => setNewRequisition(p => ({...p, jobProfileId: parseInt(e.target.value)}))}
                            className="w-full mt-1 p-2 border rounded-md"
                        >
                            {jobProfiles.map(profile => <option key={profile.id} value={profile.id}>{profile.jobTitle}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block font-medium">Solicitado Por</label>
                        <input 
                            type="text" 
                            value={newRequisition.requestedBy}
                            onChange={e => setNewRequisition(p => ({...p, requestedBy: e.target.value}))}
                            className="w-full mt-1 p-2 border rounded-md" required/>
                    </div>
                    <div>
                        <label className="block font-medium">Justificación</label>
                        <textarea 
                             value={newRequisition.justification}
                             onChange={e => setNewRequisition(p => ({...p, justification: e.target.value}))}
                            className="w-full mt-1 p-2 border rounded-md" rows={4} required></textarea>
                    </div>
                    <div className="flex justify-end pt-4"><Button type="submit">Enviar Solicitud</Button></div>
                </form>
            </Modal>
        </>
    );
};

export default CrearVacante;