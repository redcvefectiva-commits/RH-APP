import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { DocumentTextIcon, ChartBarIcon, UsersIcon } from '../ui/Icons';

const reportOptions = [
    { title: 'Reporte de Headcount', description: 'Un resumen de la plantilla actual por departamento y cargo.', icon: <UsersIcon className="h-8 w-8 text-primary" /> },
    { title: 'Análisis de Rotación', description: 'Métricas sobre la tasa de rotación de empleados en el último año.', icon: <ChartBarIcon className="h-8 w-8 text-primary" /> },
    { title: 'Reporte de Diversidad', description: 'Desglose de la plantilla por género, edad y etnia.', icon: <UsersIcon className="h-8 w-8 text-primary" /> },
    { title: 'Informe Salarial', description: 'Análisis de la compensación y equidad salarial en la empresa.', icon: <DocumentTextIcon className="h-8 w-8 text-primary" /> },
    { title: 'Resumen de Asistencia', description: 'Informe mensual sobre ausentismo, tardanzas y horas trabajadas.', icon: <DocumentTextIcon className="h-8 w-8 text-primary" /> },
    { title: 'Resultados de Desempeño', description: 'Consolidado de las calificaciones de desempeño del último ciclo.', icon: <ChartBarIcon className="h-8 w-8 text-primary" /> },
];

const Reports: React.FC = () => {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-dark">Centro de Informes</h2>
                <p className="text-gray-500 mt-1">Genera informes personalizados para obtener insights sobre tu organización.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportOptions.map((report, index) => (
                    <Card key={index} className="flex flex-col">
                        <div className="flex items-center mb-4">
                            {report.icon}
                            <h3 className="text-lg font-semibold text-dark ml-3">{report.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 flex-grow">{report.description}</p>
                        <div className="mt-4">
                            <Button className="w-full">Generar Informe</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Reports;
