import React from 'react';
import Card from '../ui/Card';
import { tasks, requests, employees, calendarEvents } from '../../services/mockData';
// FIX: Corrected import path
import { Task, Request } from '../../types';

const MyActivities: React.FC = () => {
    const currentUserId = 1; // Isabella Lopez

    const myTasks = tasks.filter(t => t.assignedTo === currentUserId && t.status !== 'Completed')
                         .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    const myRequests = requests.filter(r => r.employeeId === currentUserId);
    
    const today = new Date();
    const upcomingEvents = calendarEvents.filter(e => new Date(e.date) >= today)
                                         .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                         .slice(0, 3);

    const getPriorityInfo = (priority: Task['priority']) => {
        switch (priority) {
            case 'High': return { text: 'Alta', className: 'bg-red-100 text-red-800' };
            case 'Medium': return { text: 'Media', className: 'bg-yellow-100 text-yellow-800' };
            case 'Low': return { text: 'Baja', className: 'bg-gray-100 text-gray-800' };
        }
    };
    
    const getRequestStatusInfo = (status: Request['status']) => {
        switch (status) {
          case 'Approved': return { text: 'Aprobada', className: 'bg-green-100 text-green-800' };
          case 'Pending': return { text: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' };
          case 'Rejected': return { text: 'Rechazada', className: 'bg-red-100 text-red-800' };
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-dark">Mis Actividades</h2>
                <p className="text-gray-500 mt-1">Tu centro de control personal para tareas, solicitudes y eventos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <h3 className="text-xl font-semibold text-dark mb-4">Mis Tareas Prioritarias</h3>
                        {myTasks.length > 0 ? (
                            <div className="space-y-3">
                                {myTasks.map(task => (
                                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
                                        <div>
                                            <p className="font-medium text-dark">{task.title}</p>
                                            <p className="text-sm text-gray-500">Vence: {task.dueDate}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityInfo(task.priority).className}`}>
                                            {getPriorityInfo(task.priority).text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">¡Felicidades! No tienes tareas pendientes.</p>
                        )}
                    </Card>

                     <Card>
                        <h3 className="text-xl font-semibold text-dark mb-4">Mis Solicitudes Recientes</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Tipo</th>
                                        <th className="px-4 py-2">Fechas</th>
                                        <th className="px-4 py-2">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRequests.map(req => (
                                        <tr key={req.id} className="border-b">
                                            <td className="px-4 py-2 font-medium">{req.type}</td>
                                            <td className="px-4 py-2">{req.startDate} - {req.endDate}</td>
                                            <td className="px-4 py-2">
                                                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRequestStatusInfo(req.status).className}`}>
                                                    {getRequestStatusInfo(req.status).text}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
                
                <div className="lg:col-span-1">
                     <Card>
                        <h3 className="text-xl font-semibold text-dark mb-4">Próximos Eventos</h3>
                         {upcomingEvents.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className="flex items-start">
                                        <div className="flex-shrink-0 w-12 text-center mr-3">
                                            <p className="text-xs font-bold text-red-600 uppercase">{new Date(event.date).toLocaleString('es-ES', { month: 'short' })}</p>
                                            <p className="text-xl font-bold text-dark">{new Date(event.date).getDate()}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-dark">{event.title}</p>
                                            <p className="text-sm text-gray-500 capitalize">{event.type.replace('-', ' ')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-gray-500">No tienes eventos próximos en tu calendario.</p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MyActivities;