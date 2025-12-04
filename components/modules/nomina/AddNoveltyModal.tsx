import React, { useState, useEffect } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { Employee, PayrollNovelty, NoveltyType } from '../../../types';
import { overtimeTypes } from '../../../services/overtimeCalculator';

interface AddNoveltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onAddNovelty: (novelty: Omit<PayrollNovelty, 'id' | 'employeeId' | 'status'>) => void;
}

const noveltyTypes: { value: NoveltyType; label: string, requires: ('amount'|'days'|'overtime')[] }[] = [
    { value: 'Bonificación', label: 'Bonificación (Ingreso)', requires: ['amount'] },
    { value: 'Comisión', label: 'Comisión (Ingreso)', requires: ['amount'] },
    { value: 'Viáticos', label: 'Viáticos (Ingreso)', requires: ['amount'] },
    { value: 'Otro Ingreso Prestacional', label: 'Otro Ingreso (Prestacional)', requires: ['amount'] },
    { value: 'Otro Ingreso No Prestacional', label: 'Otro Ingreso (No Prestacional)', requires: ['amount'] },
    { value: 'Hora Extra', label: 'Horas Extras / Recargos', requires: ['overtime'] },
    { value: 'Vacaciones Disfrutadas', label: 'Vacaciones Disfrutadas', requires: ['days'] },
    { value: 'Vacaciones Compensadas', label: 'Vacaciones Compensadas', requires: ['days'] },
    { value: 'Licencia Remunerada', label: 'Licencia Remunerada', requires: ['days'] },
    { value: 'Licencia no Remunerada', label: 'Licencia no Remunerada (Ausencia)', requires: ['days'] },
    { value: 'Incapacidad', label: 'Incapacidad (Ausencia)', requires: ['days', 'amount'] },
    { value: 'Descuento Préstamo', label: 'Descuento Préstamo', requires: ['amount'] },
    { value: 'Descuento Sanción', label: 'Descuento por Sanción', requires: ['amount', 'days'] },
    { value: 'Descuento Libranza', label: 'Descuento Libranza', requires: ['amount'] },
    { value: 'Descuento Voluntario', label: 'Descuento Voluntario', requires: ['amount'] },
    { value: 'Otro Descuento', label: 'Otro Descuento', requires: ['amount'] },
    { value: 'Retención en la Fuente', label: 'Retención en la Fuente', requires: ['amount'] },
];

const AddNoveltyModal: React.FC<AddNoveltyModalProps> = ({ isOpen, onClose, employee, onAddNovelty }) => {
  const [type, setType] = useState<NoveltyType>('Bonificación');
  const [amount, setAmount] = useState<number | undefined>();
  const [days, setDays] = useState<number | undefined>();
  const [hours, setHours] = useState<number | undefined>();
  const [overtimeType, setOvertimeType] = useState(overtimeTypes[0].value);
  const [description, setDescription] = useState('');
  
  const selectedNoveltyConfig = noveltyTypes.find(n => n.value === type);

  useEffect(() => {
    // Reset fields when modal opens or type changes
    setAmount(undefined);
    setDays(undefined);
    setHours(undefined);
    setDescription('');
    setOvertimeType(overtimeTypes[0].value);
  }, [isOpen, type]);
  
  if (!employee) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNovelty({ 
        type, 
        amount, 
        description, 
        date: new Date().toISOString().split('T')[0],
        days,
        hours,
        overtimeType
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Añadir Novedad para ${employee.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Novedad</label>
          <select 
            value={type} 
            onChange={e => setType(e.target.value as NoveltyType)} 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
          >
            {noveltyTypes.map(nt => <option key={nt.value} value={nt.value}>{nt.label}</option>)}
          </select>
        </div>

        {selectedNoveltyConfig?.requires.includes('amount') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto</label>
              <input 
                type="number" 
                value={amount || ''}
                onChange={e => setAmount(Number(e.target.value))} 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm" 
                placeholder="0"
                required
              />
            </div>
        )}

        {selectedNoveltyConfig?.requires.includes('days') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Días</label>
              <input 
                type="number" 
                value={days || ''}
                onChange={e => setDays(Number(e.target.value))} 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm" 
                placeholder="0"
                required
              />
            </div>
        )}

        {selectedNoveltyConfig?.requires.includes('overtime') && (
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Hora</label>
                     <select 
                        value={overtimeType} 
                        onChange={e => setOvertimeType(e.target.value as any)} 
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        {overtimeTypes.map(ot => <option key={ot.value} value={ot.value}>{ot.label}</option>)}
                    </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Horas</label>
                  <input 
                    type="number" 
                    value={hours || ''}
                    onChange={e => setHours(Number(e.target.value))} 
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm" 
                    placeholder="0"
                    required
                  />
                </div>
            </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <input 
            type="text" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm" 
            placeholder="Ej: Bono por cumplimiento, Vacaciones Enero"
            required
          />
        </div>
        <div className="flex justify-end pt-4 border-t mt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="mr-2">Cancelar</Button>
            <Button type="submit">Añadir Novedad</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoveltyModal;