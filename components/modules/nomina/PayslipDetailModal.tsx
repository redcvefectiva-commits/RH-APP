import React from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { Payslip } from '../../../types';
import { DownloadIcon } from '../../ui/Icons';

declare const jspdf: any;
declare const html2canvas: any;

interface PayslipDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  payslip: Payslip | null;
}

const PayslipDetailModal: React.FC<PayslipDetailModalProps> = ({ isOpen, onClose, payslip }) => {
  if (!payslip) return null;

  const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

  const devengos = payslip.concepts.filter(c => c.type === 'devengo');
  const deducciones = payslip.concepts.filter(c => c.type === 'deduccion');
  const provisiones = payslip.concepts.filter(c => c.type === 'provision');
  
  const handleDownloadPdf = () => {
    const input = document.getElementById('payslip-content');
    if (!input) return;

    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.height / imgProps.width;
      const imgHeight = pdfWidth * ratio;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`desprendible_${payslip.employee.name.replace(/\s/g, '_')}.pdf`);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comprobante de Pago de Nómina" size="3xl">
      <div id="payslip-content" className="p-4 bg-white text-gray-800 text-sm">
        {/* Header */}
        <div className="text-center mb-6 border-b pb-4">
            <h3 className="font-bold text-xl">CV EFECTIVA SAS</h3>
            <p className="text-xs">NIT: 900.000.000-1</p>
            <p className="text-xs">COMPROBANTE DE PAGO DE NÓMINA</p>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 mb-6 p-3 bg-gray-50 rounded-lg text-xs">
            <div><strong className="block text-gray-500">EMPLEADO:</strong> <span className="font-semibold">{payslip.employee.name}</span></div>
            <div><strong className="block text-gray-500">IDENTIFICACIÓN:</strong> <span className="font-semibold">{payslip.employee.numeroIdentificacion}</span></div>
            <div><strong className="block text-gray-500">CARGO:</strong> <span className="font-semibold">{payslip.employee.cargo}</span></div>
            <div><strong className="block text-gray-500">PERIODO DE PAGO:</strong> <span className="font-semibold capitalize">{payslip.period === 'monthly' ? 'Mensual' : 'Quincenal'}</span></div>
            <div><strong className="block text-gray-500">SALARIO BÁSICO:</strong> <span className="font-semibold">{formatCurrency(payslip.employee.salarioBasicoPrestacional)}</span></div>
            <div><strong className="block text-gray-500">DÍAS LIQUIDADOS:</strong> <span className="font-semibold">{payslip.workedDays}</span></div>
        </div>

        {/* Earnings and Deductions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-bold text-md mb-2 border-b-2 border-green-500 pb-1 text-green-700">INGRESOS (DEVENGOS)</h4>
                {devengos.map((c, i) => (
                    <div key={`dev-${i}`} className="flex justify-between py-1 border-b border-gray-100">
                        <span>{c.name}</span>
                        <span className="font-mono">{c.value > 0 ? formatCurrency(c.value) : ''}</span>
                    </div>
                ))}
                 <div className="flex justify-between font-bold text-md mt-2 pt-2 border-t-2">
                    <span>TOTAL INGRESOS</span>
                    <span className="font-mono">{formatCurrency(payslip.totalDevengos)}</span>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-md mb-2 border-b-2 border-red-500 pb-1 text-red-700">DEDUCCIONES</h4>
                {deducciones.map((c, i) => (
                    <div key={`ded-${i}`} className="flex justify-between py-1 border-b border-gray-100">
                        <span>{c.name}</span>
                        <span className="font-mono">{c.value > 0 ? formatCurrency(c.value) : ''}</span>
                    </div>
                ))}
                 <div className="flex justify-between font-bold text-md mt-2 pt-2 border-t-2">
                    <span>TOTAL DEDUCCIONES</span>
                    <span className="font-mono">{formatCurrency(payslip.totalDeducciones)}</span>
                </div>
            </div>
        </div>
        
        {/* Net Pay */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-right">
            <span className="text-lg font-bold">NETO A PAGAR</span>
            <span className="text-2xl font-bold ml-4 text-primary font-mono">{formatCurrency(payslip.netoAPagar)}</span>
            <p className="text-xs text-gray-600 capitalize-first mt-1">SON: {payslip.netoAPagarEnLetras.toLowerCase()}</p>
        </div>
        
        {/* Employer Contributions */}
        <div className="mt-8">
            <h4 className="font-bold text-md mb-2 border-b pb-1 text-gray-600">APORTES EMPRESA Y PROVISIONES (Informativo)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-gray-700">
                {provisiones.map((c, i) => (
                    <div key={`prov-${i}`} className="flex justify-between py-1 border-b border-gray-100">
                        <span>{c.name}</span>
                        <span className="font-mono">{formatCurrency(c.value)}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
      <div className="flex justify-end pt-4 mt-4 border-t">
        <Button onClick={handleDownloadPdf} leftIcon={<DownloadIcon />}>Descargar PDF</Button>
      </div>
    </Modal>
  );
};

export default PayslipDetailModal;