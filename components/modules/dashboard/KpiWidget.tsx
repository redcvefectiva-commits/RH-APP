import React from 'react';
import Card from '../../ui/Card';
import { UsersIcon, DocumentTextIcon, BriefcaseIcon } from '../../ui/Icons';

interface KpiWidgetProps {
  title: string;
  value: string;
}

const KpiWidget: React.FC<KpiWidgetProps> = ({ title, value }) => {
  const getIcon = () => {
    if (title.toLowerCase().includes('empleados')) {
      return <UsersIcon className="h-8 w-8 text-primary" />;
    }
    if (title.toLowerCase().includes('solicitudes')) {
      return <DocumentTextIcon className="h-8 w-8 text-secondary" />;
    }
    if (title.toLowerCase().includes('vacantes')) {
      return <BriefcaseIcon className="h-8 w-8 text-yellow-500" />;
    }
    return <div className="h-8 w-8" />;
  };

  return (
    <Card className="flex items-center p-4">
        <div className="p-3 bg-orange-50 rounded-lg">
            {getIcon()}
        </div>
        <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-dark">{value}</p>
        </div>
    </Card>
  );
};

export default KpiWidget;
