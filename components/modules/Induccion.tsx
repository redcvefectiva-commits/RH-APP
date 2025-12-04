import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { employees } from '../../services/mockData';
import { onboardingProcesses as mockOnboarding } from '../../services/mockData';
// FIX: Corrected import path for types.
import { OnboardingProcess, OnboardingTask } from '../../types';

const Induccion: React.FC = () => {
    const [processes, setProcesses] = useState<OnboardingProcess[]>(mockOnboarding);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState<OnboardingProcess | null>(null);

    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

    const openDetails = (process: OnboardingProcess) => {
        setSelectedProcess(process);
        setIsModalOpen(true);
    };

    const handleTaskToggle = (processId: number, taskId: number) => {
        setProcesses(prev => prev.map(p => {
            if (p.id === processId) {
                return { ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) };
            }
            return p;
        }));
        // Also update the selected process if it's open
        if(selectedProcess && selectedProcess.id === processId) {
            setSelectedProcess(prev => prev ? {...prev, tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)} : null);
        }
    };

    return (
        <>
            <Card>
                <h3 className="text-xl font-semibold text-dark mb-6">Procesos de Inducción (Onboarding)</h3>
                <div className="space-y-4">
                    {processes.map(process => {
                        const completedTasks = process.tasks.filter(t => t.completed).length;
                        const totalTasks = process.tasks.length;
                        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                        return (
                            <div key={process.id} className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50">
                                <div>
                                    <p className="font-semibold text-primary">{getEmployeeName(process.employeeId)}</p>
                                    <p className="text-sm text-gray-500">Inició el: {process.startDate}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-40 bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span className="font-semibold text-sm">{progress}%</span>
                                    <button onClick={() => openDetails(process)} className="text-sm text-primary hover:underline">Ver Checklist</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {selectedProcess && (
                 <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Checklist de Inducción para ${getEmployeeName(selectedProcess.employeeId)}`}>
                    <div className="space-y-3">
                        {selectedProcess.tasks.map(task => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className={`${task.completed ? 'line-through text-gray-500' : 'text-dark'}`}>{task.title}</p>
                                    <p className="text-xs text-gray-400">Área: {task.area}</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => handleTaskToggle(selectedProcess.id, task.id)}
                                    className="h-5 w-5 rounded text-primary focus:ring-primary"
                                />
                            </div>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Induccion;