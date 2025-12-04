import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import MultiSelect from '../../ui/MultiSelect';
import { Employee } from '../../../types';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  allEmployees: Employee[];
  onCreate: (groupName: string, memberIds: string[]) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, allEmployees, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const employeeOptions = allEmployees.map(e => ({ label: e.name, value: String(e.id) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreate(groupName, selectedMembers);
      // Reset form
      setGroupName('');
      setSelectedMembers([]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nuevo Grupo de Chat">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Nombre del Grupo</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="members" className="block text-sm font-medium text-gray-700">Miembros</label>
          <MultiSelect
            options={employeeOptions}
            selectedValues={selectedMembers}
            onChange={setSelectedMembers}
            placeholder="Seleccionar miembros..."
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="mr-2">Cancelar</Button>
          <Button type="submit">Crear Grupo</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGroupModal;
