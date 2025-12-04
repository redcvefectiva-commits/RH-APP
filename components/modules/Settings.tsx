import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'notifications', label: 'Notificaciones' },
        { id: 'integrations', label: 'Integraciones' },
        { id: 'security', label: 'Seguridad' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">Nombre de la Empresa</label>
                            <input type="text" defaultValue="CV efectiva" className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="font-medium">Zona Horaria</label>
                            <select className="w-full mt-1 p-2 border rounded-md">
                                <option>GMT-5 Bogota, Lima, Quito</option>
                            </select>
                        </div>
                    </div>
                );
            case 'notifications':
                 return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <label>Notificaciones por Email</label>
                            <input type="checkbox" className="toggle-checkbox" defaultChecked />
                        </div>
                         <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <label>Resumen Diario de Tareas</label>
                            <input type="checkbox" className="toggle-checkbox" defaultChecked />
                        </div>
                    </div>
                );
             case 'integrations':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-semibold">Slack</h4>
                                <p className="text-sm text-gray-500">Recibe notificaciones directamente en tus canales de Slack.</p>
                            </div>
                            <Button>Conectar</Button>
                        </div>
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-semibold">Google Calendar</h4>
                                <p className="text-sm text-gray-500">Sincroniza eventos y plazos con tu calendario de Google.</p>
                            </div>
                            <Button variant="ghost">Conectado</Button>
                        </div>
                    </div>
                );
            case 'security':
                 return (
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">Contraseña</label>
                            <Button variant="ghost" className="mt-1">Cambiar Contraseña</Button>
                        </div>
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-semibold">Autenticación de Dos Factores (2FA)</h4>
                                <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta.</p>
                            </div>
                            <Button>Habilitar</Button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-dark mb-6">Ajustes</h2>
            <div className="flex">
                <div className="w-1/4 pr-6 border-r">
                    <nav className="flex flex-col space-y-2">
                        {tabs.map(tab => (
                             <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="w-3/4 pl-6">
                    {renderContent()}
                </div>
            </div>
        </Card>
    );
};

export default Settings;
