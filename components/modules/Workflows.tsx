import React from 'react';
import Card from '../ui/Card';

const WorkflowStep: React.FC<{ title: string; description: string; isLast?: boolean }> = ({ title, description, isLast = false }) => (
    <div className="flex items-center">
        <div className="flex flex-col items-center mr-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                →
            </div>
            {!isLast && <div className="w-px h-16 bg-gray-300"></div>}
        </div>
        <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);


const Workflows: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-dark mb-6">Flujos de Aprobación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Solicitud de Vacaciones</h3>
                    <div className="space-y-0">
                        <WorkflowStep title="1. Solicitud del Empleado" description="El empleado llena el formato y lo envía." />
                        <WorkflowStep title="2. Aprobación del Jefe" description="El jefe directo revisa y aprueba." />
                        <WorkflowStep title="3. Visto Bueno de RRHH" description="RRHH valida disponibilidad y registra." isLast/>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Reporte de Gastos</h3>
                     <div className="space-y-0">
                        <WorkflowStep title="1. Registro de Gastos" description="El empleado sube facturas y soportes." />
                        <WorkflowStep title="2. Aprobación del Jefe" description="El jefe directo valida la pertinencia." />
                        <WorkflowStep title="3. Revisión de Finanzas" description="Contabilidad verifica y procesa el pago." isLast/>
                    </div>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Horas Extras</h3>
                     <div className="space-y-0">
                        <WorkflowStep title="1. Solicitud Previa" description="El jefe solicita autorización para HE." />
                        <WorkflowStep title="2. Aprobación de Gerencia" description="Gerencia aprueba el presupuesto." />
                        <WorkflowStep title="3. Registro y Pago" description="RRHH liquida en la nómina correspondiente." isLast/>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Workflows;
