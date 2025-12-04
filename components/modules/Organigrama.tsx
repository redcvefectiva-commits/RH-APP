import React from 'react';
import { employees } from '../../services/mockData';
// FIX: Corrected import path for types.
import { Employee } from '../../types';
import Card from '../ui/Card';

// Define a new type for the tree node
interface EmployeeTreeNode extends Employee {
  children: EmployeeTreeNode[];
}

// Function to build the tree from a flat list
const buildEmployeeTree = (employees: Employee[]): EmployeeTreeNode[] => {
  const employeeMap: { [id: number]: EmployeeTreeNode } = {};
  const roots: EmployeeTreeNode[] = [];

  // Initialize map and add children array to each employee
  employees.forEach(employee => {
    employeeMap[employee.id] = { ...employee, children: [] };
  });

  // Populate children arrays
  Object.values(employeeMap).forEach(employeeNode => {
    if (employeeNode.jefeDirectoId && employeeMap[employeeNode.jefeDirectoId]) {
      employeeMap[employeeNode.jefeDirectoId].children.push(employeeNode);
    } else {
      roots.push(employeeNode);
    }
  });

  return roots;
};

// Recursive component to render a node and its children
const EmployeeNode: React.FC<{ node: EmployeeTreeNode }> = ({ node }) => {
  return (
    <div className="flex flex-col items-center relative px-4 py-2">
      {/* The Employee Card */}
      <div className="p-3 bg-white border-2 border-primary rounded-lg text-center shadow-lg z-10 w-48">
        <img src={node.avatar} className="w-16 h-16 rounded-full mx-auto border-2 border-gray-200 object-cover" alt={node.name} />
        <p className="font-bold mt-2 text-sm text-dark">{node.name}</p>
        <p className="text-xs text-gray-500">{node.cargo}</p>
      </div>
      
      {/* Children container */}
      {node.children && node.children.length > 0 && (
        <ul className="flex pt-12 relative">
          {/* Connector line down from parent */}
          <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-gray-300"></div>
          
          {node.children.map((child, index) => (
            <li key={child.id} className="relative px-4">
              {/* Connector line up to horizontal line */}
              <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-gray-300"></div>
              {/* Horizontal line */}
              <div className={`absolute top-0 h-0.5 bg-gray-300 
                ${node.children.length === 1 ? 'hidden' : ''}
                ${index === 0 ? 'left-1/2 w-1/2' : ''}
                ${index === node.children.length - 1 ? 'right-1/2 w-1/2' : ''}
                ${index > 0 && index < node.children.length - 1 ? 'left-0 w-full' : ''}
              `}></div>
              <EmployeeNode node={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// Main component
const Organigrama: React.FC = () => {
  const employeeTree = buildEmployeeTree(employees);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-dark mb-6 text-center">Organigrama de la Empresa</h2>
      <div className="overflow-x-auto pb-8">
         <div className="flex justify-center">
            {employeeTree.map(rootNode => <EmployeeNode key={rootNode.id} node={rootNode} />)}
         </div>
      </div>
    </Card>
  );
};

export default Organigrama;