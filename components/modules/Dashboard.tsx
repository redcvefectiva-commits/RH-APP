import React from 'react';
import WelcomeWidget from './dashboard/WelcomeWidget';
import KpiWidget from './dashboard/KpiWidget';
import AlertsWidget from './dashboard/AlertsWidget';
import NewsFeed from './dashboard/NewsFeed';
import { employees, requests, jobOpenings } from '../../services/mockData';

const Dashboard: React.FC = () => {
    const activeEmployees = employees.filter(e => e.status === 'Active').length;
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;
    const openVacancies = jobOpenings.filter(j => j.status === 'Open').length;

    return (
        <div className="space-y-6">
            <WelcomeWidget />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KpiWidget title="Empleados Activos" value={activeEmployees.toString()} />
                <KpiWidget title="Solicitudes Pendientes" value={pendingRequests.toString()} />
                <KpiWidget title="Vacantes Abiertas" value={openVacancies.toString()} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <NewsFeed />
                </div>
                <div className="lg:col-span-1">
                    <AlertsWidget />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
