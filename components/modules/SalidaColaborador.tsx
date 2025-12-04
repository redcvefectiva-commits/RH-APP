import React from 'react';
import Card from '../ui/Card';
import { employees } from '../../services/mockData';
import { offboardingProcesses } from '../../services/mockData';

const SalidaColaborador: React.FC = () => {

    const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'N/A';

    return (
        <Card>
            <h3 className="text-xl font-semibold text-dark mb-6">Gestión de Salidas (Offboarding)</h3>
            <div className="space-y-6">
                {offboardingProcesses.map(process => {
                    const completedTasks = process.tasks.filter(t => t.completed).length;
                    const totalTasks = process.tasks.length;
                    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                    return (
                        <Card key={process.id} className="border">
                             <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-semibold text-primary">{getEmployeeName(process.employeeId)}</p>
                                    <p className="text-sm text-gray-500">Fecha de Salida: {process.lastDay}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-40 bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span className="font-semibold text-sm">{progress}%</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {process.tasks.map(task => (
                                    <div key={task.id} className="flex items-center">
                                        <input type="checkbox" checked={task.completed} readOnly className="h-4 w-4 rounded text-primary focus:ring-primary mr-3"/>
                                        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-dark'}`}>{task.title} ({task.responsible})</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </Card>
    );
};

export default SalidaColaborador;
