
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { DownloadIcon, PlusIcon, TrashIcon } from '../ui/Icons';
import { employees as mockEmployees } from '../../services/mockData';
// FIX: Corrected import path
import { OvertimeRecord, OvertimeType, Employee } from '../../types';
import { calculateOvertime, overtimeTypes } from '../../services/overtimeCalculator';
import Modal from '../ui/Modal';

declare const Chart: any;

const Overtime: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gestion');
  const [overtimeRecords, setOvertimeRecords] = useState<OvertimeRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [newEmployeeName, setNewEmployeeName] = useState('');

  const [formState, setFormState] = useState({
    docente: mockEmployees[0]?.name || '',
    salario: mockEmployees[0]?.salarioBasicoPrestacional || 0,
    fecha: new Date().toISOString().split('T')[0],
    tipo: overtimeTypes[0].value,
    cantidad: 1,
    autorizadoPor: '',
    observaciones: ''
  });
  
  const [previewTotal, setPreviewTotal] = useState(0);

  const charts = useRef<{[key: string]: any}>({});
  const costoChartRef = useRef<HTMLCanvasElement>(null);
  const docentesChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateSampleData = () => {
      let sampleData: OvertimeRecord[] = [];
      for (let i = 0; i < 40; i++) { // Reduced from 150 to 40 for performance
        const employee = employees[Math.floor(Math.random() * employees.length)];
        if (!employee) continue;
        const tipo = overtimeTypes[Math.floor(Math.random() * overtimeTypes.length)].value;
        const cantidad = Math.floor(Math.random() * 3) + 1;
        const fecha = `2025-10-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
        
        const result = calculateOvertime(fecha, employee.salarioBasicoPrestacional, tipo, cantidad);
        
        sampleData.push({
          id: Date.now() + i,
          docente: employee.name,
          salario: employee.salarioBasicoPrestacional,
          fecha: result.fecha,
          tipo: result.tipoHora,
          cantidad: result.horas,
          observaciones: 'Actividad extracurricular programada',
          autorizadoPor: 'Rectoría',
          valorHoraBase: result.valorHoraBase,
          valorPagado: result.total,
          porcentaje: result.porcentaje,
          norma: result.norma,
        });
      }
      setOvertimeRecords(sampleData);
    };
    if (employees.length > 0 && overtimeRecords.length === 0) {
        generateSampleData();
    }
  }, [employees, overtimeRecords.length]);
  
  useEffect(() => {
    if (formState.salario > 0 && formState.tipo && formState.cantidad > 0 && formState.fecha) {
        const result = calculateOvertime(formState.fecha, formState.salario, formState.tipo, formState.cantidad);
        setPreviewTotal(result.total);
    } else {
        setPreviewTotal(0);
    }
  }, [formState]);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => {
        if (name === 'docente') {
            const newSalario = employees.find(emp => emp.name === value)?.salarioBasicoPrestacional || 0;
            return { ...prev, docente: value, salario: newSalario };
        }
        if (name === 'salario' || name === 'cantidad') {
            return { ...prev, [name]: parseFloat(value) || 0 };
        }
        return { ...prev, [name]: value };
    });
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numericSalario = parseFloat(String(formState.salario)) || 0;
    const numericCantidad = parseFloat(String(formState.cantidad)) || 0;

    const result = calculateOvertime(formState.fecha, numericSalario, formState.tipo, numericCantidad);
    
    const newRecord: OvertimeRecord = {
        id: Date.now(),
        docente: formState.docente,
        salario: numericSalario,
        fecha: formState.fecha,
        tipo: formState.tipo,
        cantidad: numericCantidad,
        observaciones: formState.observaciones,
        autorizadoPor: formState.autorizadoPor,
        valorHoraBase: result.valorHoraBase,
        valorPagado: result.total,
        porcentaje: result.porcentaje,
        norma: result.norma,
    };

    setOvertimeRecords(prev => [newRecord, ...prev].sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));
    setIsModalOpen(false);
  };
  
  const handleDeleteRecord = (id: number) => {
    if(window.confirm('¿Está seguro de eliminar este registro?')) {
      setOvertimeRecords(prev => prev.filter(r => r.id !== id));
    }
  };
  
  const handleAddNewEmployee = () => {
    const name = newEmployeeName.trim();
    if (name && !employees.some(e => e.name === name)) {
      const newEmployee: Employee = {
        // FIX: Replaced Math.max with a reduce function to calculate the new employee ID. This resolves a potential type inference error with the spread operator in some environments.
        id: employees.reduce((maxId, emp) => Math.max(emp.id, maxId), 0) + 1,
        primerNombre: name.split(' ')[0] || '',
        primerApellido: name.split(' ')[1] || '',
        name: name,
        salarioBasicoPrestacional: 2000000, // Default salary
        cargo: 'Nuevo Cargo',
        departamento: 'Sin Asignar',
        correoCorporativo: `${name.toLowerCase().replace(/\s/g, '.')}@example.com`,
        celular: '0000000000',
        fechaIngreso: new Date().toISOString().split('T')[0],
        status: 'Active',
        avatar: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/200`,
      } as Employee; // Using 'as' to satisfy all Employee properties not listed here. A more robust solution would be to provide all properties.
      setEmployees(prev => [...prev, newEmployee]);
      setNewEmployeeName('');
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

  const renderChart = useCallback((canvasRef: React.RefObject<HTMLCanvasElement>, chartId: string, type: 'bar' | 'pie' | 'line', label: string, labels: string[], data: number[], colors: string[], extraOptions: any = {}) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      if (charts.current[chartId]) charts.current[chartId].destroy();
      
      charts.current[chartId] = new Chart(ctx, {
        type: type,
        data: { labels, datasets: [{ label, data, backgroundColor: colors }] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            ...extraOptions
        }
      });
  }, []);

  const renderDashboard = useCallback(() => {
      const costoPorTipo = overtimeTypes.reduce((acc, ot) => {
          acc[ot.label] = overtimeRecords
              .filter(he => he.tipo === ot.value)
              .reduce((sum, he) => sum + he.valorPagado, 0);
          return acc;
      }, {} as {[key: string]: number});
      renderChart(costoChartRef, 'costoChart', 'bar', 'Costo por Tipo', Object.keys(costoPorTipo), Object.values(costoPorTipo), ['#F58B10']);

      const horasPorDocente = overtimeRecords.reduce((acc, he) => {
        acc[he.docente] = (acc[he.docente] || 0) + he.cantidad;
        return acc;
      }, {} as {[key: string]: number});
      renderChart(docentesChartRef, 'docentesChart', 'pie', 'Horas por Docente', Object.keys(horasPorDocente), Object.values(horasPorDocente), ['#F58B10', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6']);

  }, [overtimeRecords, renderChart]);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      renderDashboard();
    }
  }, [activeTab, overtimeRecords, renderDashboard]);

  const tabs = [
      { id: 'gestion', label: 'Gestión de Horas' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'config', label: 'Configuración' },
  ];

  return (
    <div className="space-y-6">
       <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map(tab => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`${
                      activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                  >
                      {tab.label}
                  </button>
              ))}
          </nav>
      </div>

      {activeTab === 'gestion' && (
        <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Registro de Horas Extras</h2>
              <div className="flex gap-2">
                <Button onClick={() => console.log('Exporting...')} variant="secondary" leftIcon={<DownloadIcon />}>Exportar</Button>
                <Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusIcon />}>Nuevo Registro</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="p-3">Docente</th>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Valor Pagado</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {overtimeRecords.map(record => (
                          <tr key={record.id} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{record.docente}</td>
                              <td>{record.fecha}</td>
                              <td>{overtimeTypes.find(ot => ot.value === record.tipo)?.label}</td>
                              <td>{record.cantidad}h</td>
                              <td>{formatCurrency(record.valorPagado)}</td>
                              <td><Button variant="ghost" onClick={() => handleDeleteRecord(record.id)}><TrashIcon className="h-4 w-4 text-red-500"/></Button></td>
                          </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </Card>
      )}

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Card>
                  <h3 className="text-lg font-semibold mb-4">Costo de Horas Extras por Tipo</h3>
                  <div className="h-80"><canvas ref={costoChartRef}></canvas></div>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card>
                  <h3 className="text-lg font-semibold mb-4">Distribución de Horas por Docente</h3>
                  <div className="h-80"><canvas ref={docentesChartRef}></canvas></div>
              </Card>
            </div>
        </div>
      )}

      {activeTab === 'config' && (
        <Card>
          <h2 className="text-xl font-semibold">Configuración</h2>
          <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-medium">Gestionar Docentes</h3>
              <ul className="my-2 space-y-1">
                {employees.map(e => <li key={e.id} className="text-sm">{e.name} - {formatCurrency(e.salarioBasicoPrestacional)}</li>)}
              </ul>
              <div className="flex gap-2 items-end">
                  <input value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)} placeholder="Nombre nuevo docente" className="p-2 border rounded-md"/>
                  <Button onClick={handleAddNewEmployee}>Añadir Docente</Button>
              </div>
          </div>
        </Card>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Hora Extra">
          <form onSubmit={handleAddRecord} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block">Docente</label><select name="docente" value={formState.docente} onChange={handleFormChange} className="w-full p-2 border rounded"><option value="">Seleccionar...</option>{employees.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}</select></div>
                <div><label className="block">Salario</label><input type="number" name="salario" value={formState.salario} onChange={handleFormChange} className="w-full p-2 border rounded bg-gray-100" readOnly/></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block">Fecha</label><input type="date" name="fecha" value={formState.fecha} onChange={handleFormChange} className="w-full p-2 border rounded"/></div>
                <div><label className="block">Tipo de Hora</label><select name="tipo" value={formState.tipo} onChange={handleFormChange} className="w-full p-2 border rounded"><option value="">Seleccionar...</option>{overtimeTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
                <div><label className="block">Cantidad (horas)</label><input type="number" name="cantidad" value={formState.cantidad} onChange={handleFormChange} className="w-full p-2 border rounded"/></div>
              </div>
              <div><label className="block">Autorizado Por</label><input name="autorizadoPor" value={formState.autorizadoPor} onChange={handleFormChange} className="w-full p-2 border rounded"/></div>
              <div><label className="block">Observaciones</label><textarea name="observaciones" value={formState.observaciones} onChange={handleFormChange} className="w-full p-2 border rounded"></textarea></div>
              <div className="text-right font-semibold text-lg">Total a Pagar: <span className="text-primary">{formatCurrency(previewTotal)}</span></div>
              <div className="flex justify-end pt-4"><Button type="submit">Guardar Registro</Button></div>
          </form>
      </Modal>

    </div>
  );
};

export default Overtime;