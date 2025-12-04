
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className={`relative bg-white rounded-xl shadow-xl transform transition-all w-full m-4 ${sizeClasses[size]}`}>
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-dark" id="modal-title">
            {title}
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose}>
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
