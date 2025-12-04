import React, { useRef, useEffect } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      const getCoords = (e: MouseEvent | TouchEvent): [number, number] => {
          const rect = canvas.getBoundingClientRect();
          if (e instanceof MouseEvent) {
              return [e.clientX - rect.left, e.clientY - rect.top];
          }
          if (e.touches && e.touches[0]) {
              return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
          }
          return [0, 0];
      };

      const startDrawing = (e: MouseEvent | TouchEvent) => {
        isDrawing = true;
        [lastX, lastY] = getCoords(e);
      };

      const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        e.preventDefault();
        const [x, y] = getCoords(e);
        ctx?.beginPath();
        ctx?.moveTo(lastX, lastY);
        ctx?.lineTo(x, y);
        ctx?.stroke();
        [lastX, lastY] = [x, y];
      };

      const stopDrawing = () => { isDrawing = false; };

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
      
      canvas.addEventListener('touchstart', startDrawing, { passive: false });
      canvas.addEventListener('touchmove', draw, { passive: false });
      canvas.addEventListener('touchend', stopDrawing);

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
      };
    }
  }, [isOpen]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL('image/png'));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Firmar Documento">
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={450}
          height={200}
          className="border border-gray-300 rounded-md bg-white"
        ></canvas>
        <p className="text-xs text-gray-500 mt-2">Firme en el recuadro de arriba.</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={clearCanvas}>Limpiar</Button>
        <Button onClick={handleSave}>Guardar Firma</Button>
      </div>
    </Modal>
  );
};

export default SignatureModal;
