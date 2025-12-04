import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { surveys } from '../../services/mockData';

const Surveys: React.FC = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Encuestas y Sondeos</h2>
        <Button>Crear Encuesta</Button>
      </div>
      <div className="space-y-4">
        {surveys.map(survey => (
          <div key={survey.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{survey.title}</h3>
                <p className="text-sm text-gray-500">Cierra el: {survey.closingDate}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${survey.status === 'Abierta' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {survey.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tasa de Respuesta</span>
                <span>{survey.responseRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${survey.responseRate}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Surveys;
