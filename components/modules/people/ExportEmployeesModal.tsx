
import React from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { Employee } from '../../../types';

interface ExportEmployeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
}

const ExportEmployeesModal: React.FC<ExportEmployeesModalProps> = ({ isOpen, onClose, employees }) => {
  
  const handleExport = () => {
    // In a real scenario, this would trigger a CSV/Excel download.
    console.log("Exporting employees:", employees);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar Empleados">
      <div>
        <p className="text-gray-600 mb-4">Se exportarán los datos de {employees.length} empleados.</p>
        <p className="text-sm">Esta es una función de marcador de posición. La funcionalidad de exportación completa se puede agregar aquí, incluyendo la selección de campos y formatos.</p>
      </div>
      <div className="flex justify-end pt-4 mt-4 border-t">
        <Button variant="ghost" onClick={onClose} className="mr-2">Cancelar</Button>
        <Button onClick={handleExport}>Confirmar Exportación</Button>
      </div>
    </Modal>
  );
};

export default ExportEmployeesModal;
