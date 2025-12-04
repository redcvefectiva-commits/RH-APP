import React from 'react';
import Card from '../../ui/Card';

const newsItems = [
  { id: 1, title: 'Nueva Política de Trabajo Híbrido', date: 'Oct 1, 2025', content: 'A partir de noviembre, se implementará un nuevo modelo de trabajo híbrido. Consulta los detalles en la biblioteca de documentos.' },
  { id: 2, title: 'Resultados de la Encuesta de Clima Laboral', date: 'Sep 28, 2025', content: 'Gracias a todos por participar. Los resultados ya están disponibles y se presentarán en la reunión general del viernes.' },
  { id: 3, title: 'Inscripciones Abiertas para Capacitación en Liderazgo', date: 'Sep 25, 2025', content: 'Si estás interesado en desarrollar tus habilidades de liderazgo, inscríbete antes del 15 de octubre.' },
];

const NewsFeed: React.FC = () => {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-dark mb-4">Noticias y Anuncios</h3>
      <div className="space-y-4">
        {newsItems.map(item => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-dark">{item.title}</h4>
            <p className="text-xs text-gray-500 mb-1">{item.date}</p>
            <p className="text-sm text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewsFeed;
