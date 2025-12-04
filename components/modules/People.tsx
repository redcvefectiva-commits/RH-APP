import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PlusIcon, SearchIcon } from '../ui/Icons';
import { employees as mockEmployees } from '../../services/mockData';
import { Employee } from '../../types';
import EmployeeDetailModal from './people/EmployeeDetailModal';
import AddEmployeeModal from './people/AddEmployeeModal';
import ExportEmployeesModal from './people/ExportEmployeesModal';

const People: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departamento.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setIsDetailModalOpen(false);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    if (window.confirm("¿Está seguro de que desea eliminar a este empleado?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      setIsDetailModalOpen(false);
    }
  };
  
  const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id'>) => {
    const newId = Math.max(...employees.map(e => e.id)) + 1;
    const newEmployee: Employee = {
        ...(mockEmployees[0] || {}), // Use a base for all the detailed fields
        ...newEmployeeData, 
        id: newId,
        name: `${newEmployeeData.primerNombre} ${newEmployeeData.primerApellido}`,
    };
    setEmployees(prev => [newEmployee, ...prev]);
  };

  return (
    <>
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Gestión de Personas</h2>
          <div className="relative w-full md:w-1/3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsExportModalOpen(true)}>Exportar</Button>
            <Button onClick={() => setIsAddModalOpen(true)} leftIcon={<PlusIcon />}>Añadir Empleado</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left bg-gray-50">
              <tr>
                <th className="p-4">Nombre</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Email</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center">
                    <img src={employee.avatar} alt={employee.name} className="h-10 w-10 rounded-full mr-3 object-cover" />
                    <span className="font-medium">{employee.name}</span>
                  </td>
                  <td>{employee.cargo}</td>
                  <td>{employee.departamento}</td>
                  <td>{employee.correoCorporativo}</td>
                  <td><span className={`px-2 py-1 text-xs rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{employee.status}</span></td>
                  <td><Button variant="ghost" onClick={() => handleViewDetails(employee)}>Ver Perfil</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isDetailModalOpen && selectedEmployee && (
        <EmployeeDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          employee={selectedEmployee}
          allEmployees={employees}
          onUpdateEmployee={handleUpdateEmployee}
          onDeleteEmployee={handleDeleteEmployee}
        />
      )}
      
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEmployee={handleAddEmployee}
        allEmployees={employees}
       />

      <ExportEmployeesModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        employees={filteredEmployees}
      />
    </>
  );
};

export default People;
