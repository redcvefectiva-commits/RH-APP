import React from 'react';
import Card from '../../ui/Card';
import { Employee } from '../../../types';

interface TenureWidgetProps {
  employees: Employee[];
}

const TenureWidget: React.FC<TenureWidgetProps> = ({ employees }) => {
  // Dummy implementation
  const averageTenure = employees.length > 0 
    ? employees.reduce((acc, emp) => {
        const tenure = (new Date().getTime() - new Date(emp.fechaIngreso).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return acc + tenure;
      }, 0) / employees.length
    : 0;

  return (
    <Card>
      <h3 className="text-xl font-semibold text-dark">Antigüedad del Personal</h3>
      <div className="mt-4 text-center">
        <p className="text-4xl font-bold text-primary">{averageTenure.toFixed(1)}</p>
        <p className="text-gray-500">Años de antigüedad promedio</p>
      </div>
    </Card>
  );
};

export default TenureWidget;
