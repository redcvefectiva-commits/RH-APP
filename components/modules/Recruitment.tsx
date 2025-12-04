

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { PlusIcon, UsersIcon, BriefcaseIcon, ClockIcon } from '../ui/Icons';
import { jobOpenings as mockJobOpenings, candidates as mockCandidates } from '../../services/mockData';
// FIX: Corrected import path
import { JobOpening, Candidate, HiringStageDetail } from '../../types';

declare const Chart: any;

// Helper to get traffic light color based on how long a vacancy has been open
const getTrafficLightColor = (dateOpened: string) => {
    const daysOpen = (new Date('2025-10-03T12:00:00').getTime() - new Date(dateOpened).getTime()) / (1000 * 3600 * 24);
    if (daysOpen > 30) return 'bg-red-500';
    if (daysOpen > 15) return 'bg-yellow-400';
    return 'bg-green-500';
};

const Recruitment: React.FC = () => {
    const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(mockJobOpenings);
    const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
    
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const sourceChartRef = useRef<HTMLCanvasElement>(null);
    const funnelChartRef = useRef<HTMLCanvasElement>(null);
    const chartInstances = useRef<{ [key: string]: any }>({});

    useEffect(() => {
        // Candidate Sources Chart
        if (sourceChartRef.current) {
            // FIX: Cast chart instance to 'any' to call 'destroy' and resolve type error.
            if (chartInstances.current['sourceChart']) (chartInstances.current['sourceChart'] as any).destroy();
            const sourceCounts = candidates.reduce((acc, candidate) => {
                acc[candidate.source] = (acc[candidate.source] || 0) + 1;
                return acc;
            }, {} as { [key: string]: number });

            chartInstances.current['sourceChart'] = new Chart(sourceChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(sourceCounts),
                    datasets: [{
                        data: Object.values(sourceCounts),
                        backgroundColor: ['#F58B10', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'],
                        hoverOffset: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }
            });
        }

        // Hiring Funnel Chart
        if (funnelChartRef.current) {
            // FIX: Cast chart instance to 'any' to call 'destroy' and resolve type error.
            if (chartInstances.current['funnelChart']) (chartInstances.current['funnelChart'] as any).destroy();
            const funnelStages = ['Atracción', 'Filtro Reclutamiento', 'Entrevista RRHH', 'Entrevista Jefe Inmediato', 'Pruebas Psicotécnicas', 'Contratado'];
            const funnelCounts = funnelStages.map((stageName, index) => 
                candidates.filter(c => {
                    const stage = c.pipeline.find(p => p.name === stageName);
                    return stage && stage.status === 'Approved';
                }).length
            );

            chartInstances.current['funnelChart'] = new Chart(funnelChartRef.current, {
                type: 'bar',
                data: {
                    labels: funnelStages,
                    datasets: [{
                        label: 'Candidatos en Etapa',
                        data: funnelCounts,
                        backgroundColor: '#F58B10'
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, indexAxis: 'y' }
            });
        }
        
        return () => {
            // FIX: Cast chart instance to 'any' to call 'destroy' and resolve type error.
            Object.values(chartInstances.current).forEach(chart => (chart as any).destroy());
        };
    }, [candidates]);


    const openApplicantsModal = (job: JobOpening) => {
        setSelectedJob(job);
        setIsApplicantsModalOpen(true);
    };

    const handleUpdateStage = (candidateId: number, stageId: string, newStatus: HiringStageDetail['status'], notes?: string, score?: number) => {
        setCandidates(prevCandidates => {
            return prevCandidates.map(c => {
                if (c.id === candidateId) {
                    let isNowRejected = newStatus === 'Rejected';
                    let rejectionFound = false;
                    const newPipeline = c.pipeline.map(stage => {
                        if (rejectionFound) { // Disable subsequent stages visually if needed
                            return stage;
                        }
                        if (stage.id === stageId) {
                             if (isNowRejected) rejectionFound = true;
                            return { ...stage, status: newStatus, notes: notes ?? stage.notes, score: score ?? stage.score };
                        }
                        return stage;
                    });

                    return { ...c, pipeline: newPipeline };
                }
                return c;
            });
        });
    };

    const applicantsForSelectedJob = useMemo(() => {
        return selectedJob ? candidates.filter(c => c.appliedFor === selectedJob.id) : [];
    }, [selectedJob, candidates]);
    
    const openPositionsCount = jobOpenings.filter(j => j.status === 'Open').length;
    const totalCandidates = candidates.length;
    const avgTimeToHire = 45; // Placeholder static value

    return (
        <>
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="flex items-center"><BriefcaseIcon className="h-8 w-8 text-primary mr-4"/><div className="flex-1"><p className="text-gray-500">Vacantes Abiertas</p><p className="text-2xl font-bold">{openPositionsCount}</p></div></Card>
                    <Card className="flex items-center"><UsersIcon className="h-8 w-8 text-secondary mr-4"/><div className="flex-1"><p className="text-gray-500">Candidatos Totales</p><p className="text-2xl font-bold">{totalCandidates}</p></div></Card>
                    <Card className="flex items-center"><ClockIcon className="h-8 w-8 text-yellow-500 mr-4"/><div className="flex-1"><p className="text-gray-500">Tiempo Prom. Contratación</p><p className="text-2xl font-bold">{avgTimeToHire} días</p></div></Card>
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <Card className="lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">Fuentes de Candidatos</h3>
                        <div className="h-64"><canvas ref={sourceChartRef}></canvas></div>
                    </Card>
                    <Card className="lg:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">Embudo de Contratación</h3>
                         <div className="h-64"><canvas ref={funnelChartRef}></canvas></div>
                    </Card>
                </div>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-dark">Vacantes Activas</h3>
                        <Button onClick={() => setIsRequestModalOpen(true)} leftIcon={<PlusIcon />}>
                            Solicitar Nueva Vacante
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3 text-left">Título del Cargo</th>
                                    <th className="px-4 py-3 text-left">Departamento</th>
                                    <th className="px-4 py-3 text-center">Aplicantes</th>
                                    <th className="px-4 py-3 text-left">Estado</th>
                                    <th className="px-4 py-3 text-left">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobOpenings.filter(j => j.status === 'Open').map(job => (
                                    <tr key={job.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2"><div className={`w-3 h-3 rounded-full ${getTrafficLightColor(job.dateOpened)}`} title={`Abierta desde ${job.dateOpened}`}></div></td>
                                        <td className="px-4 py-2 font-medium">{job.title}</td>
                                        <td className="px-4 py-2">{job.department}</td>
                                        <td className="px-4 py-2 text-center">{candidates.filter(c => c.appliedFor === job.id).length}</td>
                                        <td className="px-4 py-2"><span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{job.status}</span></td>
                                        <td className="px-4 py-2">
                                            <Button variant="ghost" onClick={() => openApplicantsModal(job)}>Ver Candidatos</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Request New Vacancy Modal */}
            <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} title="Solicitar Nueva Vacante" size="2xl">
                <form className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                    <div><label className="font-medium">Título del Cargo</label><input type="text" className="w-full mt-1 p-2 border rounded-md"/></div>
                    <div><label className="font-medium">Solicitado por</label><input type="text" className="w-full mt-1 p-2 border rounded-md"/></div>
                    <div><label className="font-medium">Justificación</label><textarea rows={2} className="w-full mt-1 p-2 border rounded-md"></textarea></div>
                    <div><label className="font-medium">Funciones y Responsabilidades</label><textarea rows={3} className="w-full mt-1 p-2 border rounded-md"></textarea></div>
                    <div><label className="font-medium">Habilidades Requeridas</label><input type="text" className="w-full mt-1 p-2 border rounded-md"/></div>
                    <div><label className="font-medium">Software Requerido</label><input type="text" className="w-full mt-1 p-2 border rounded-md"/></div>
                    <div><label className="font-medium">Requisitos de Contratación</label><textarea rows={2} className="w-full mt-1 p-2 border rounded-md"></textarea></div>
                    <div><label className="font-medium">Dotación y Equipo</label><input type="text" className="w-full mt-1 p-2 border rounded-md"/></div>
                    <div><label className="font-medium">Tiempo Objetivo para Contratar (días)</label><input type="number" className="w-full mt-1 p-2 border rounded-md"/></div>
                    <div className="flex items-center"><input type="checkbox" id="auth" className="mr-2"/><label htmlFor="auth">Autorizado por Gerencia</label></div>
                    <div className="flex justify-end pt-4 border-t"><Button type="submit">Enviar Solicitud</Button></div>
                </form>
            </Modal>

            {/* View Applicants Modal */}
            <Modal isOpen={isApplicantsModalOpen} onClose={() => setIsApplicantsModalOpen(false)} title={`Candidatos para ${selectedJob?.title}`} size="4xl">
                 <div className="space-y-2 max-h-[70vh] overflow-y-auto p-1">
                    {applicantsForSelectedJob.map(candidate => {
                        let isRejectedInPipeline = false;
                        return (
                            <div key={candidate.id} className="border rounded-lg">
                                <button onClick={() => setActiveAccordion(activeAccordion === candidate.id ? null : candidate.id)} className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100">
                                    <div className="flex items-center">
                                        <img src={candidate.avatar} className="h-10 w-10 rounded-full mr-3" alt={candidate.name}/>
                                        <span className="font-semibold">{candidate.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${candidate.pipeline.some(s => s.status === 'Rejected') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {candidate.pipeline.some(s => s.status === 'Rejected') ? 'Rechazado' : 'En Proceso'}
                                        </span>
                                        <span className="ml-4">{activeAccordion === candidate.id ? '▲' : '▼'}</span>
                                    </div>
                                </button>
                                {activeAccordion === candidate.id && (
                                    <div className="p-4 space-y-3">
                                        {candidate.pipeline.map((stage) => {
                                            const isDisabled = isRejectedInPipeline;
                                            if (stage.status === 'Rejected') {
                                                isRejectedInPipeline = true;
                                            }
                                            return (
                                            <div key={stage.id} className={`p-3 rounded-md ${isDisabled ? 'bg-gray-100 opacity-60' : 'bg-white border'}`}>
                                                <p className="font-semibold">{stage.name}</p>
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
                                                    <div className="flex-1">
                                                        <textarea 
                                                            placeholder="Observaciones..." 
                                                            defaultValue={stage.notes} 
                                                            disabled={isDisabled}
                                                            onBlur={(e) => handleUpdateStage(candidate.id, stage.id, stage.status, e.target.value)}
                                                            className="w-full p-1 border rounded text-sm" rows={1}></textarea>
                                                    </div>
                                                    {(stage.id.includes('test')) && 
                                                        <div className="w-full md:w-32">
                                                            <input 
                                                                type="number" 
                                                                placeholder="Calif. /100" 
                                                                defaultValue={stage.score} 
                                                                disabled={isDisabled}
                                                                onBlur={(e) => handleUpdateStage(candidate.id, stage.id, stage.status, stage.notes, parseInt(e.target.value))}
                                                                className="w-full p-1 border rounded text-sm"/>
                                                        </div>
                                                    }
                                                    <div className="flex items-center gap-1">
                                                        <Button size="sm" variant={stage.status === 'Approved' ? 'secondary' : 'ghost'} disabled={isDisabled} onClick={() => handleUpdateStage(candidate.id, stage.id, 'Approved')}>✓</Button>
                                                        <Button size="sm" variant={stage.status === 'Rejected' ? 'danger' : 'ghost'} disabled={isDisabled} onClick={() => handleUpdateStage(candidate.id, stage.id, 'Rejected')}>✗</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )})}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </>
    );
};

export default Recruitment;