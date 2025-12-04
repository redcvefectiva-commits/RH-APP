import React from 'react';
import Card from '../../ui/Card';
import { InformationCircleIcon, RefreshIcon } from '../../ui/Icons';

const alerts = [
    { id: 1, text: '3 Contratos próximos a vencer este mes.' },
    { id: 2, text: 'Revisar solicitud de vacaciones de Ana Martinez.' },
    { id: 3, text: 'Juan Perez inicia su licencia mañana.' },
];

const AlertsWidget: React.FC = () => {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-dark">Alertas y Recordatorios</h3>
                <button className="text-gray-400 hover:text-primary"><RefreshIcon className="h-5 w-5"/></button>
            </div>
            <div className="space-y-3">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start p-3 bg-orange-50 rounded-lg">
                        <InformationCircleIcon className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                        <p className="text-sm text-gray-700">{alert.text}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default AlertsWidget;
