import React from 'react';
import Card from '../../ui/Card';

const WelcomeWidget: React.FC = () => {
  return (
    <Card className="bg-primary text-white">
      <h2 className="text-3xl font-bold">¡Bienvenida, Isabella!</h2>
    </Card>
  );
};

export default WelcomeWidget;