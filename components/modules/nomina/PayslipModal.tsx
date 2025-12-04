import React from 'react';
import Modal from '../../ui/Modal';
import { Employee } from '../../../types';

interface PayslipModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
}

const PayslipModal: React.FC<PayslipModalProps> = ({ isOpen, onClose, employee }) => {
    if (!employee) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Desprendible de Nómina - ${employee.name}`}>
            <div className="text-center p-8">
                <h3 className="text-lg font-semibold">Función en Desarrollo</h3>
                <p className="text-gray-500 mt-2">La generación de desprendibles de pago estará disponible pronto.</p>
            </div>
        </Modal>
    );
};

export default PayslipModal;
