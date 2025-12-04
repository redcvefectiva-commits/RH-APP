import React from 'react';
import Card from '../ui/Card';
import { trainingCourses, employees } from '../../services/mockData';
// FIX: Corrected import path for types.
import { TrainingCourse } from '../../types';

const Capacitaciones: React.FC = () => {

    const getParticipantNames = (ids: number[]): string => {
        return ids.map(id => employees.find(e => e.id === id)?.name || '').filter(Boolean).join(', ');
    }

    return (
        <Card>
            <h3 className="text-xl font-semibold text-dark mb-6">Plan de Capacitaciones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingCourses.map(course => (
                    <Card key={course.id} className="border">
                        <h4 className="font-bold text-lg text-primary">{course.title}</h4>
                        <p className="text-sm text-gray-500">Área: {course.area}</p>
                        <p className="text-sm mt-2"><strong>Modalidad:</strong> {course.modality}</p>
                        <p className="text-sm"><strong>Duración:</strong> {course.durationHours} horas</p>
                        <p className="text-sm mt-2"><strong>Participantes ({course.participants.length}):</strong> <span className="text-gray-600">{getParticipantNames(course.participants)}</span></p>
                    </Card>
                ))}
            </div>
        </Card>
    );
};

export default Capacitaciones;