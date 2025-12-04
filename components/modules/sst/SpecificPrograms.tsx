import React from 'react';
import Button from '../../ui/Button';

const SpecificPrograms: React.FC = () => {
    return (
        <div>
            <p className="text-gray-600 mb-4">
                Gestione aquí los programas específicos como el Plan Estratégico de Seguridad Vial (PESV), BASC, Teletrabajo, etc.
            </p>
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <h4 className="text-lg font-semibold">Módulo en Construcción</h4>
                <p className="text-gray-500">Esta sección se adaptará para incluir las tablas, gráficos y cargadores de documentos para cada programa específico.</p>
                <div className="mt-4 flex justify-center gap-2">
                     <Button>Exportar Datos de PESV</Button>
                     <Button variant="secondary">Cargar Evidencia BASC</Button>
                </div>
            </div>
        </div>
    );
};

export default SpecificPrograms;
