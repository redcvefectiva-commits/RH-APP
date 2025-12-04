import React, { useState } from 'react';
import Card from '../ui/Card';
import RiskAssessment from './sst/RiskAssessment';
import AnnualPlan from './sst/AnnualPlan';
import Training from './sst/Training';
import SpecificPrograms from './sst/SpecificPrograms';
import EPP from './sst/EPP';
import OccupationalHealth from './sst/OccupationalHealth';
import Accidents from './sst/Accidents';
import Compliance from './sst/Compliance';
import SSTDocuments from './sst/SSTDocuments';

const SST: React.FC = () => {
    const [activeTab, setActiveTab] = useState('riskAssessment');

    const tabs = [
        { id: 'riskAssessment', label: 'Matriz de Riesgos' },
        { id: 'annualPlan', label: 'Plan Anual' },
        { id: 'training', label: 'Capacitaciones SST' },
        { id: 'programs', label: 'Programas Específicos' },
        { id: 'epp', label: 'Entrega de EPP' },
        { id: 'health', label: 'Salud Ocupacional' },
        { id: 'accidents', label: 'Investigación de Accidentes' },
        { id: 'compliance', label: 'Cumplimiento Legal' },
        { id: 'documents', label: 'Documentos SST' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'riskAssessment': return <RiskAssessment />;
            case 'annualPlan': return <AnnualPlan />;
            case 'training': return <Training />;
            case 'programs': return <SpecificPrograms />;
            case 'epp': return <EPP />;
            case 'health': return <OccupationalHealth />;
            case 'accidents': return <Accidents />;
            case 'compliance': return <Compliance />;
            case 'documents': return <SSTDocuments />;
            default: return <RiskAssessment />;
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-dark mb-6">Gestión de Seguridad y Salud en el Trabajo (SST)</h2>
            <div className="flex border-b overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-primary'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-6">
                {renderContent()}
            </div>
        </Card>
    );
};

export default SST;
