import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { PlusIcon, SparklesIcon } from '../ui/Icons';
import { tasks as mockTasks, employees } from '../../services/mockData';
// FIX: Corrected import path for types.
import { Task } from '../../types';
import { generateTaskDescription } from '../../services/geminiService';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'status'>>({
    title: '',
    description: '',
    assignedTo: 1,
    dueDate: '',
    priority: 'Medium',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: name === 'assignedTo' ? parseInt(value) : value }));
  };

  const handleGenerateDescription = async () => {
    if (!newTask.title) return;
    setIsGenerating(true);
    try {
        const description = await generateTaskDescription(newTask.title);
        setNewTask(prev => ({...prev, description}));
    } catch(error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...tasks.map(t => t.id)) + 1;
    setTasks(prev => [...prev, { id: newId, status: 'Pending', ...newTask }]);
    setIsModalOpen(false);
  };

  const getAssigneeName = (id: number) => employees.find(e => e.id === id)?.name || 'Unknown';

  const getPriorityInfo = (priority: Task['priority']) => {
    switch (priority) {
        case 'High': return { text: 'Alta', className: 'bg-red-100 text-red-800' };
        case 'Medium': return { text: 'Media', className: 'bg-yellow-100 text-yellow-800' };
        case 'Low': return { text: 'Baja', className: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Gestión de Tareas</h2>
          <Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusIcon />}>Nueva Tarea</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Título</th>
                <th>Asignado a</th>
                <th>Vencimiento</th>
                <th>Prioridad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-t">
                  <td className="py-3 font-medium">{task.title}</td>
                  <td>{getAssigneeName(task.assignedTo)}</td>
                  <td>{task.dueDate}</td>
                  <td><span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityInfo(task.priority).className}`}>{getPriorityInfo(task.priority).text}</span></td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nueva Tarea">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Título</label>
            <input name="title" onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" required />
          </div>
          <div>
            <label>Descripción</label>
            <div className="relative">
              <textarea name="description" value={newTask.description} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" rows={3}></textarea>
              <Button type="button" variant="ghost" className="absolute bottom-2 right-2 p-1" onClick={handleGenerateDescription} disabled={isGenerating || !newTask.title}>
                  <SparklesIcon className="h-5 w-5 text-primary"/>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label>Asignado a</label><select name="assignedTo" onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md"><option value="1">Isabella Lopez</option><option value="3">Ana Martinez</option></select></div>
            <div><label>Vencimiento</label><input name="dueDate" type="date" onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
          </div>
          <div>
            <label>Prioridad</label>
            <select name="priority" onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md">
              <option>Medium</option><option>High</option><option>Low</option>
            </select>
          </div>
          <div className="flex justify-end pt-4"><Button type="submit">Crear Tarea</Button></div>
        </form>
      </Modal>
    </>
  );
};

export default Tasks;