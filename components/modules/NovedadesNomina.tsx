import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { DownloadIcon, PlusIcon, TrashIcon } from '../ui/Icons';
import { employees as mockEmployees } from '../../services/mockData';
import { Payslip, Employee, PayrollNovelty, PayrollConfig } from '../../types';
import { generatePayslip } from '../../services/payrollCalculator';
import PayslipDetailModal from './nomina/PayslipDetailModal';
import AddNoveltyModal from './nomina/AddNoveltyModal';
import { exportDataToXLS } from '../../utils/exportUtils';
import * as PC from '../../constants/payrollConstants';

const NovedadesNomina: React.FC = () => {
    const [activeTab, setActiveTab] = useState('gestion');
    const [payrollPeriod, setPayrollPeriod] = useState<'monthly' | 'bi-weekly'>('monthly');
    const [generatedPayslips, setGeneratedPayslips] = useState<Payslip[]>([]);
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isNoveltyModalOpen, setIsNoveltyModalOpen] = useState(false);
    const [employeeForNovelty, setEmployeeForNovelty] = useState<Employee | null>(null);
    const [novelties, setNovelties] = useState<PayrollNovelty[]>([]);
    
    const [payrollConfig, setPayrollConfig] = useState<PayrollConfig>({
        smlv: PC.SMLV_2025,
        auxTransporte: PC.AUXILIO_TRANSPORTE_2025,
        uvt: PC.UVT_2025,
        arlRisk: 1,
    });
    
    useEffect(() => {
        // When novelties or period change, and payroll is already generated, regenerate it.
        if (generatedPayslips.length > 0) {
            handleGeneratePayroll();
        }
    }, [novelties, payrollPeriod, payrollConfig]);


    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPayrollConfig(prev => ({...prev, [name]: parseFloat(value) || 0 }));
    };

    const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    const handleGeneratePayroll = () => {
         const payslips = mockEmployees.map(employee => {
            const empNovelties = novelties.filter(n => n.employeeId === employee.id);
            return generatePayslip({ employee, period: payrollPeriod, novelties: empNovelties, payrollConfig });
        });
        setGeneratedPayslips(payslips);
    };

    const handleAddNovelty = (noveltyData: Omit<PayrollNovelty, 'id' | 'employeeId' | 'status'>) => {
        if (!employeeForNovelty) return;
        const newNovelty: PayrollNovelty = {
            id: Date.now(),
            employeeId: employeeForNovelty.id,
            status: 'Procesada',
            ...noveltyData,
        };
        setNovelties(prev => [...prev, newNovelty]);
        setIsNoveltyModalOpen(false);
        setEmployeeForNovelty(null);
    };

    const handleDeleteNovelty = (noveltyId: number) => {
        setNovelties(prev => prev.filter(n => n.id !== noveltyId));
    };


    const openNoveltyModal = (employeeId: number) => {
        const employee = mockEmployees.find(e => e.id === employeeId);
        if (employee) {
            setEmployeeForNovelty(employee);
            setIsNoveltyModalOpen(true);
        }
    };

    const openDetailModal = (payslip: Payslip) => {
        setSelectedPayslip(payslip);
        setIsDetailModalOpen(true);
    };
    
    const handleExportConsolidated = () => {
        if (generatedPayslips.length === 0) {
            alert("Primero debe generar la nómina para poder exportar.");
            return;
        }
        const dataToExport = generatedPayslips.map(p => ({
            nombre: p.employee.name,
            cargo: p.employee.cargo,
            diasTrabajados: p.workedDays,
            salarioBase: p.employee.salarioBasicoPrestacional,
            totalDevengos: p.totalDevengos,
            totalDeducciones: p.totalDeducciones,
            netoAPagar: p.netoAPagar,
        }));
        const headers = [
            { label: 'Empleado', key: 'nombre' },
            { label: 'Cargo', key: 'cargo' },
            { label: 'Días Liq.', key: 'diasTrabajados' },
            { label: 'Salario Base', key: 'salarioBase' },
            { label: 'Total Devengado', key: 'totalDevengos' },
            { label: 'Total Deducido', key: 'totalDeducciones' },
            { label: 'Neto a Pagar', key: 'netoAPagar' },
        ];
        exportDataToXLS(dataToExport, headers, `Nomina_Consolidada_${payrollPeriod}`);
    };
    
    const targetData = generatedPayslips.length > 0 ? generatedPayslips : mockEmployees.map(e => ({ employee: e }));
    
    return (
        <>
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('gestion')} className={`${activeTab === 'gestion' ? 'border-primary text-primary' : 'border-transparent text-gray-500'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Gestión de Nómina</button>
                    <button onClick={() => setActiveTab('novedades')} className={`${activeTab === 'novedades' ? 'border-primary text-primary' : 'border-transparent text-gray-500'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Registro de Novedades</button>
                    <button onClick={() => setActiveTab('configuracion')} className={`${activeTab === 'configuracion' ? 'border-primary text-primary' : 'border-transparent text-gray-500'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Configuración</button>
                </nav>
            </div>

            {activeTab === 'gestion' && (
                <Card>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">Pre-nómina</h2>
                            <p className="text-sm text-gray-500">Genere, consulte y exporte la nómina de sus colaboradores.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={payrollPeriod}
                                onChange={(e) => setPayrollPeriod(e.target.value as 'monthly' | 'bi-weekly')}
                                className="p-2 border rounded-md"
                            >
                                <option value="monthly">Mensual</option>
                                <option value="bi-weekly">Quincenal</option>
                            </select>
                            <Button onClick={handleGeneratePayroll}>{generatedPayslips.length > 0 ? 'Recalcular Nómina' : 'Generar Nómina'}</Button>
                            <Button variant="secondary" onClick={handleExportConsolidated} leftIcon={<DownloadIcon />}>Exportar</Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="p-3">Empleado</th>
                                    <th>Neto a Pagar</th>
                                    <th>Total Devengado</th>
                                    <th>Total Deducido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targetData.map(item => (
                                    <tr key={item.employee.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{item.employee.name}</td>
                                        {'netoAPagar' in item ? (
                                            <>
                                                <td className="font-semibold text-primary">{formatCurrency((item as Payslip).netoAPagar)}</td>
                                                <td>{formatCurrency((item as Payslip).totalDevengos)}</td>
                                                <td>{formatCurrency((item as Payslip).totalDeducciones)}</td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => openDetailModal(item as Payslip)}>Ver Desglose</Button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <td colSpan={4} className="text-gray-400 p-3">Nómina no generada.</td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {activeTab === 'novedades' && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Novedades Registradas</h2>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="p-3">Empleado</th>
                                    <th>Tipo</th>
                                    <th>Descripción</th>
                                    <th>Valor / Días / Horas</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {novelties.length === 0 && <tr><td colSpan={5} className="text-center p-4 text-gray-500">No hay novedades registradas. Añada una novedad desde la tabla de empleados.</td></tr>}
                                {novelties.map(n => {
                                    const employee = mockEmployees.find(e => e.id === n.employeeId);
                                    let valueDisplay = '';
                                    if(n.amount) valueDisplay = formatCurrency(n.amount);
                                    if(n.days) valueDisplay = `${n.days} días`;
                                    if(n.hours) valueDisplay = `${n.hours} horas`;
                                    return (
                                        <tr key={n.id} className="border-b">
                                            <td className="p-3">{employee?.name}</td>
                                            <td>{n.type}</td>
                                            <td>{n.description}</td>
                                            <td>{valueDisplay}</td>
                                            <td><Button variant="ghost" size="sm" onClick={() => handleDeleteNovelty(n.id)}><TrashIcon className="h-4 w-4 text-red-500"/></Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <h3 className="text-md font-semibold mt-6 mb-2">Añadir Novedad</h3>
                        <p className="text-sm text-gray-500 mb-4">Seleccione un empleado y haga clic en el botón de abajo para añadir una novedad.</p>
                        <div className="flex gap-4 items-center">
                            <select onChange={(e) => setEmployeeForNovelty(mockEmployees.find(emp => emp.id === parseInt(e.target.value)) || null)} className="p-2 border rounded-md">
                                <option>Seleccione un empleado...</option>
                                {mockEmployees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </select>
                            <Button onClick={() => employeeForNovelty && setIsNoveltyModalOpen(true)} disabled={!employeeForNovelty} leftIcon={<PlusIcon />}>Añadir Novedad</Button>
                        </div>
                    </div>
                </Card>
            )}

            {activeTab === 'configuracion' && (
                 <Card>
                    <h2 className="text-xl font-semibold mb-4">Parámetros de Nómina (2025)</h2>
                    <p className="text-sm text-gray-500 mb-6">Ajuste los valores legales que se usan para los cálculos de nómina. Estos valores deben ser actualizados anualmente.</p>
                    <div className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <label htmlFor="smlv" className="font-medium">Salario Mínimo (SMLV)</label>
                            <input type="number" id="smlv" name="smlv" value={payrollConfig.smlv} onChange={handleConfigChange} className="p-2 border rounded-md" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <label htmlFor="auxTransporte" className="font-medium">Auxilio de Transporte</label>
                            <input type="number" id="auxTransporte" name="auxTransporte" value={payrollConfig.auxTransporte} onChange={handleConfigChange} className="p-2 border rounded-md" />
                        </div>
                         <div className="grid grid-cols-2 gap-4 items-center">
                            <label htmlFor="uvt" className="font-medium">Valor UVT</label>
                            <input type="number" id="uvt" name="uvt" value={payrollConfig.uvt} onChange={handleConfigChange} className="p-2 border rounded-md" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <label htmlFor="arlRisk" className="font-medium">Nivel de Riesgo ARL (predeterminado)</label>
                            <select id="arlRisk" name="arlRisk" value={payrollConfig.arlRisk} onChange={handleConfigChange} className="p-2 border rounded-md">
                                <option value={1}>Riesgo 1 (0.522%)</option>
                                <option value={2}>Riesgo 2 (1.044%)</option>
                                <option value={3}>Riesgo 3 (2.436%)</option>
                                <option value={4}>Riesgo 4 (4.350%)</option>
                                <option value={5}>Riesgo 5 (6.960%)</option>
                            </select>
                        </div>
                        <div className="pt-4 text-right">
                            <Button onClick={() => alert('Configuración guardada. La nómina se recalculará si ya fue generada.')}>Guardar Cambios</Button>
                        </div>
                    </div>
                 </Card>
            )}

            {isDetailModalOpen && (
                <PayslipDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    payslip={selectedPayslip}
                />
            )}
            
            {isNoveltyModalOpen && (
                <AddNoveltyModal
                    isOpen={isNoveltyModalOpen}
                    onClose={() => setIsNoveltyModalOpen(false)}
                    employee={employeeForNovelty}
                    onAddNovelty={handleAddNovelty}
                />
            )}
        </>
    );
};

export default NovedadesNomina;