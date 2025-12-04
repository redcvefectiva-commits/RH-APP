
import React from 'react';
import { Employee } from '../../../types';

interface EmployeeProfilePDFProps {
  employee: Employee | null;
}

// This is a placeholder component. To generate actual PDFs, a library like 
// @react-pdf/renderer would be integrated here.
const EmployeeProfilePDF: React.FC<EmployeeProfilePDFProps> = ({ employee }) => {
  if (!employee) {
    return <div>Seleccione un empleado para ver su perfil.</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Perfil de Empleado (Vista Previa)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div><strong className="font-semibold">Nombre:</strong> {employee.name}</div>
        <div><strong className="font-semibold">Cargo:</strong> {employee.cargo}</div>
        <div><strong className="font-semibold">Departamento:</strong> {employee.departamento}</div>
        <div><strong className="font-semibold">Email:</strong> {employee.correoCorporativo}</div>
        <div><strong className="font-semibold">Celular:</strong> {employee.celular}</div>
        <div><strong className="font-semibold">Fecha de Ingreso:</strong> {employee.fechaIngreso}</div>
      </div>
    </div>
  );
};

export default EmployeeProfilePDF;
