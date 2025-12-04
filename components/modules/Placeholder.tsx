import React from 'react';
import Card from '../ui/Card';

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <Card>
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-dark">{title}</h2>
        <p className="mt-2 text-gray-500">¡Esta funcionalidad estará disponible pronto!</p>
      </div>
    </Card>
  );
};

export default Placeholder;