import React, { useState, Fragment } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { Employee, ChildInfo } from '../../../types';
import { afcOptions, afpOptions, arlOptions, bancosOptions, ccfOptions, departamentosColombiaOptions, duracionContratoOptions, epsOptions, estratoOptions, etniaOptions, generoOptions, horarioOptions, jornadaOptions, nivelJerarquicoOptions, nivelEscolaridadOptions, orientacionSexualOptions, poblacionEspecialOptions, tipoCuentaOptions, tipoDocumentoAbreviaturaOptions, tipoDocumentoOptions, tipoViviendaOptions, tipoTrabajoOptions, vehiculoPropioOptions, tipoVehiculoOptions, numeroHijosOptions, estadoCivilOptions, parentescoAcudienteOptions, aplicaDotacionOptions, tallaZapatosOptions, tallaPantalonOptions, tallaCamisaOptions, tipoComputadorOptions, propietarioEquipoOptions, practicaDeporteOptions } from './options';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  allEmployees: Employee[];
  onAddEmployee: (employeeData: Omit<Employee, 'id'>) => void;
}

const initialEmployeeState: Omit<Employee, 'id' | 'name'> = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    avatar: 'https://picsum.photos/seed/new-user/200',
    cargo: '',
    departamento: 'Recursos Humanos',
    correoCorporativo: '',
    celular: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    status: 'Active',
    salarioBasicoPrestacional: 0,
    jefeDirectoId: undefined,
    correoPersonal: '',
    otroCelular: '',
    genero: 'No aplica',
    orientacionSexual: 'No aplica',
    fechaNacimiento: '',
    rangoEdad: 'De 18 a 29 años',
    tipoSangre: 'O+',
    nacionalidad: 'Colombiano',
    pais: 'Colombia',
    nivelEscolaridad: 'Profesional (Universitario)',
    tituloAcademico: '',
    tipoDocumento: 'Cédula de ciudadanía',
    abreviaturaDocumento: 'CC',
    numeroIdentificacion: '',
    identificacionExpedidaEn: '',
    fechaExpedicion: '',
    departamentoResidencia: 'Cundinamarca',
    ciudadResidencia: '',
    localidadBarrio: '',
    estrato: '3',
    tipoVivienda: 'Apartamento',
    direccionResidencia: '',
    especificacionesDomicilio: '',
    // FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
    vehiculoPropio: 'No',
    tipoVehiculo: 'No aplica',
    estadoCivil: 'Soltero/a',
    tieneHijos: 'No',
    numeroHijos: 0,
    informacionHijos: [],
    nombreAcudiente: '',
    celularAcudiente: '',
    parentescoAcudiente: 'Padre',
    nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)',
    duracionContrato: 'Contrato a Término Indefinido',
    registradoRutec: 'No Aplica',
    funcionesResponsabilidades: '',
    jornadaHorarios: 'Lunes - Viernes',
    tipoHorario: 'Fijo',
    tipoTrabajo: 'Híbrido',
    perteneceSindicato: 'No',
    salarioNoPrestacional: 0,
    bonosExtralaborales: 0,
    recibeComisiones: 'No',
    banco: 'Bancolombia',
    tipoCuenta: 'Ahorro',
    numeroCuentaBancaria: '',
    arl: 'Sura',
    eps: 'Sura',
    afp: 'Protección',
    afc: 'Protección',
    ccf: 'Comfama',
    medicinaPrepagada: 'No',
    enfermedadesPadece: '',
    alergiasPadece: '',
    pertenenciaEtnica: 'No aplica',
    poblacionEspecial: 'No aplica',
    discapacidad: 'No',
    tipoDiscapacidad: '',
    restriccionesMedicas: '',
    comorbilidades: '',
    reubicado: 'No',
    cargosReubicacion: '',
    pensionado: 'No',
    aplicaDotacion: 'Sí',
    tallaCamisa: 'Mujer S (Cintura 64-69 cm)',
    tallaPantalon: 'Mujer 6 (Cintura 69 cm)',
    tallaZapatos: '37',
    tipoComputador: 'Portatil',
    propietarioEquipo: 'Empresa',
    sillaEmpresa: 'Sí',
    comidaFavorita: '',
    practicaDeporte: 'No',
    cualDeporte: '',
    fuma: 'No',
    musicaFavorita: '',
    superheroeFavorito: '',
};

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, allEmployees, onAddEmployee }) => {
  const [activeTab, setActiveTab] = useState('Personal');
  const [formData, setFormData] = useState(initialEmployeeState);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File | null>>({
    cedula: null,
    certificadosAcademicos: null,
    certificadosLaborales: null,
    hojaDeVida: null,
    documentosBeneficiarios: null,
    certificadoBancario: null,
    contratoTrabajo: null,
    constanciaAfiliacion: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
        let finalValue: any = value;
        if (name === 'jefeDirectoId') {
            finalValue = value ? parseInt(value, 10) : undefined;
        }
        
        const newState = { ...prev, [name]: finalValue };

        if (name === 'tieneHijos' && value === 'No') {
            newState.numeroHijos = 0;
            newState.informacionHijos = [];
        }
        // FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        if (name === 'vehiculoPropio' && value === 'No') {
            newState.tipoVehiculo = 'No aplica';
        }
        if (name === 'practicaDeporte' && value === 'No') {
            newState.cualDeporte = '';
        }
        if (name === 'numeroHijos') {
            const count = parseInt(value, 10) || 0;
            const currentChildren = prev.informacionHijos || [];
            const newChildren = Array.from({ length: count }, (_, i) => 
                currentChildren[i] || { nombre: '', documento: '', edad: '' }
            );
            newState.informacionHijos = newChildren;
        }

        return newState;
    });
  };

  const handleChildInfoChange = (index: number, field: keyof ChildInfo, value: string) => {
    setFormData(prev => {
        const newInformacionHijos = [...(prev.informacionHijos || [])];
        if (newInformacionHijos[index]) {
            newInformacionHijos[index] = { ...newInformacionHijos[index], [field]: value };
        }
        return { ...prev, informacionHijos: newInformacionHijos };
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, avatar: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedDocs(prev => ({ ...prev, [docType]: file }));
    }
  };

  const handleRemoveFile = (docType: string) => {
    setUploadedDocs(prev => ({...prev, [docType]: null}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEmployee({
      ...formData,
      salarioBasicoPrestacional: Number(formData.salarioBasicoPrestacional) || 0,
      salarioNoPrestacional: Number(formData.salarioNoPrestacional) || 0,
      bonosExtralaborales: Number(formData.bonosExtralaborales) || 0,
      numeroHijos: Number(formData.numeroHijos) || 0,
    });
    setFormData(initialEmployeeState); // Reset form
    onClose();
  };

  const renderInput = (id: keyof Omit<Employee, 'id'|'name'>, label: string, description?: string, type: string = 'text', required: boolean = false) => (
    <div>
        <label htmlFor={String(id)} className="block text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        <input
            type={type}
            id={String(id)}
            name={String(id)}
            value={String((formData as any)[id] ?? '')}
            onChange={handleChange}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
    </div>
  );
  
  const renderSelect = (id: keyof Omit<Employee, 'id'|'name'>, label: string, options: readonly string[] | string[], description?: string, required: boolean = false) => (
    <div>
        <label htmlFor={String(id)} className="block text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        <select
            id={String(id)}
            name={String(id)}
            value={String((formData as any)[id] ?? '')}
            onChange={handleChange}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
    );
    
    const renderTextarea = (id: keyof Omit<Employee, 'id'|'name'>, label: string, description?: string, rows: number = 3) => (
        <div className="md:col-span-2">
            <label htmlFor={String(id)} className="block text-sm font-medium text-gray-700">{label}</label>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
            <textarea
                id={String(id)}
                name={String(id)}
                rows={rows}
                value={String((formData as any)[id] ?? '')}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            ></textarea>
        </div>
    );

  const Section: React.FC<{title: string; description: string; children: React.ReactNode}> = ({title, description, children}) => (
      <>
        <hr/>
        <div>
            <h4 className="font-semibold text-md text-dark">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {children}
        </div>
      </>
  );

  const tabs = ['Personal', 'Laboral', 'Financiera', 'Salud y SS', 'Poblaciones Especiales', 'Dotación', 'Documentos', 'Adicional'];

  const documentsToUpload = {
    cedula: 'Sube tu Cedula lado y lado al 150 formato PDF',
    certificadosAcademicos: 'Subir PDF Certificados Académicos',
    certificadosLaborales: 'Subir todos los Certificados Laborales en un PDF unido',
    hojaDeVida: 'Subir Hoja de vida PDF',
    documentosBeneficiarios: 'Subir Documentos Beneficiarios (CC, TI, NUIP, REGISTRO CIVIL) en un solo PDF unido',
    certificadoBancario: 'Subir Certificado Bancario PDF',
    contratoTrabajo: 'Contrato de trabajo',
    constanciaAfiliacion: 'Constancia de afiliación'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Añadir Nuevo Empleado" size="4xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`${
                        activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
        
        <div className="space-y-4">
            {activeTab === 'Personal' && (
                <Fragment>
                    <div className="flex items-center space-x-6">
                        <img 
                            src={formData.avatar} 
                            alt="Avatar" 
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                            <label htmlFor="avatar-upload-add" className="cursor-pointer bg-orange-100 text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-200">
                                Cambiar Foto
                            </label>
                            <input id="avatar-upload-add" name="avatar" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB.</p>
                        </div>
                    </div>
                    <Section title="Información Básica" description="Datos fundamentales para la identificación del empleado.">
                        {renderInput('primerNombre', 'Primer Nombre', undefined, 'text', true)}
                        {renderInput('segundoNombre', 'Segundo Nombre')}
                        {renderInput('primerApellido', 'Primer Apellido', undefined, 'text', true)}
                        {renderInput('segundoApellido', 'Segundo Apellido')}
                        {renderSelect('genero', 'Género', generoOptions)}
                        {renderSelect('orientacionSexual', 'Orientación Sexual', orientacionSexualOptions)}
                        {renderInput('fechaNacimiento', 'Fecha de Nacimiento', undefined, 'date')}
                        {renderSelect('rangoEdad', 'Rango de Edad', ['Menores de 15 años', 'De 15 a 17 años', 'De 18 a 29 años', 'De 30 a 56 años', 'Más de 57 años'])}
                        {renderSelect('tipoSangre', 'Tipo de Sangre', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])}
                        {renderSelect('nacionalidad', 'Nacionalidad', ['Colombiano', 'Extranjero'])}
                        {renderInput('pais', 'País')}
                    </Section>
                     <Section title="Educación" description="Nivel educativo y formación académica del empleado.">
                        {renderSelect('nivelEscolaridad', 'Nivel de Escolaridad', nivelEscolaridadOptions, undefined, true)}
                        {renderInput('tituloAcademico', 'Título Académico', undefined, 'text', true)}
                    </Section>
                    <Section title="Documentación" description="Información del documento de identidad oficial.">
                        {renderSelect('tipoDocumento', 'Tipo de Documento', tipoDocumentoOptions)}
                        {renderSelect('abreviaturaDocumento', 'Abreviatura', tipoDocumentoAbreviaturaOptions)}
                        {renderInput('numeroIdentificacion', 'Número de Identificación', undefined, 'text', true)}
                        {renderInput('identificacionExpedidaEn', 'Lugar de Expedición')}
                        {renderInput('fechaExpedicion', 'Fecha de Expedición', undefined, 'date')}
                    </Section>
                    <Section title="Contacto y Residencia" description="Datos para contactar y ubicar al empleado.">
                        {renderInput('celular', 'Celular', undefined, 'tel', true)}
                        {renderInput('otroCelular', 'Otro Celular', undefined, 'tel')}
                        {renderInput('correoCorporativo', 'Email Corporativo', undefined, 'email', true)}
                        {renderInput('correoPersonal', 'Email Personal', undefined, 'email')}
                        {renderSelect('departamentoResidencia', 'Departamento', departamentosColombiaOptions)}
                        {renderInput('ciudadResidencia', 'Ciudad de Residencia')}
                        {renderInput('localidadBarrio', 'Localidad / Barrio')}
                        {renderSelect('estrato', 'Estrato', estratoOptions)}
                        {renderSelect('tipoVivienda', 'Tipo de Vivienda', tipoViviendaOptions)}
                        {renderInput('direccionResidencia', 'Dirección de Residencia')}
                        {renderInput('especificacionesDomicilio', 'Especificaciones Domicilio')}
                    </Section>
                     <Section title="Vehículo" description="Información sobre el vehículo del empleado, si aplica.">
                        {/* FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'. */}
                        {renderSelect('vehiculoPropio', '¿Vehículo Propio?', vehiculoPropioOptions)}
                        {/* FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'. */}
                        {formData.vehiculoPropio === 'Sí' && renderSelect('tipoVehiculo', 'Tipo de Vehículo', tipoVehiculoOptions)}
                    </Section>
                     <Section title="Información Familiar" description="Datos sobre el estado civil y los hijos del empleado.">
                        {renderSelect('estadoCivil', 'Estado Civil', estadoCivilOptions)}
                        {renderSelect('tieneHijos', '¿Tiene Hijos?', ['Sí', 'No'])}
                        {formData.tieneHijos === 'Sí' && (
                            <div className="md:col-span-4 space-y-2">
                                {renderSelect('numeroHijos', 'Número de Hijos', numeroHijosOptions, 'Indique el número de hijos.')}
                                {formData.informacionHijos?.map((hijo, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-2 p-2 border rounded-md bg-gray-50">
                                        <input value={hijo.nombre} onChange={e => handleChildInfoChange(index, 'nombre', e.target.value)} placeholder={`Nombre Hijo ${index + 1}`} className="p-2 border rounded" />
                                        <input value={hijo.documento} onChange={e => handleChildInfoChange(index, 'documento', e.target.value)} placeholder="Documento" className="p-2 border rounded" />
                                        <input value={hijo.edad} onChange={e => handleChildInfoChange(index, 'edad', e.target.value)} placeholder="Edad" className="p-2 border rounded" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Section>
                     <Section title="Contacto de Emergencia" description="A quién contactar en caso de una emergencia.">
                        {renderInput('nombreAcudiente', 'Nombre Completo')}
                        {renderInput('celularAcudiente', 'Celular de Contacto', undefined, 'tel')}
                        {renderSelect('parentescoAcudiente', 'Parentesco', parentescoAcudienteOptions)}
                    </Section>
                </Fragment>
            )}
            
            {activeTab === 'Laboral' && (
                <Fragment>
                    <Section title="Posición Actual" description="Detalles del cargo y ubicación del empleado en la empresa.">
                        {renderInput('cargo', 'Cargo que ocupa', undefined, 'text', true)}
                        {renderSelect('departamento', 'Área o Departamento', departamentosColombiaOptions)}
                        {renderSelect('status', 'Estado', ['Active', 'On Leave', 'Terminated'])}
                        <div>
                            <label htmlFor="jefeDirectoId" className="block text-sm font-medium text-gray-700">Jefe Directo</label>
                            <select
                                id="jefeDirectoId"
                                name="jefeDirectoId"
                                value={formData.jefeDirectoId || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="">Ninguno</option>
                                {allEmployees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </select>
                        </div>
                        {renderInput('fechaIngreso', 'Fecha de Ingreso', undefined, 'date')}
                        {renderSelect('nivelJerarquico', 'Nivel Jerárquico', nivelJerarquicoOptions)}
                    </Section>
                    <Section title="Contrato y Condiciones" description="Información sobre el tipo de contrato y las condiciones laborales.">
                        {renderSelect('duracionContrato', 'Tipo de Contrato', duracionContratoOptions)}
                        {renderSelect('registradoRutec', '¿Registrado en RUTEC?', ['Sí', 'No', 'No Aplica'])}
                        {renderSelect('jornadaHorarios', 'Jornada', jornadaOptions)}
                        {renderSelect('tipoHorario', 'Tipo de Horario', horarioOptions)}
                        {renderSelect('tipoTrabajo', 'Modalidad de Trabajo', tipoTrabajoOptions)}
                        {renderSelect('perteneceSindicato', '¿Pertenece a un Sindicato?', ['Sí', 'No'])}
                        {renderTextarea('funcionesResponsabilidades', 'Funciones y Responsabilidades', 'Principales tareas y responsabilidades del cargo.')}
                    </Section>
                </Fragment>
            )}

            {activeTab === 'Financiera' && (
                <Fragment>
                    <Section title="Compensación" description="Detalles sobre el salario y otros beneficios económicos.">
                        {renderInput('salarioBasicoPrestacional', 'Salario Básico Prestacional', 'Salario base mensual.', 'number', true)}
                        {renderInput('salarioNoPrestacional', 'Salario No Prestacional', 'Componentes salariales no prestacionales.', 'number')}
                        {renderInput('bonosExtralaborales', 'Bonos Extralaborales', 'Otros bonos y compensaciones.', 'number')}
                        {renderSelect('recibeComisiones', '¿Recibe Comisiones?', ['Sí', 'No'])}
                    </Section>
                    <Section title="Información Bancaria" description="Datos de la cuenta bancaria para el pago de la nómina.">
                        {renderSelect('banco', 'Banco', bancosOptions)}
                        {renderSelect('tipoCuenta', 'Tipo de Cuenta', tipoCuentaOptions)}
                        {renderInput('numeroCuentaBancaria', 'Número de Cuenta', 'Número completo de la cuenta bancaria.')}
                    </Section>
                </Fragment>
            )}

            {activeTab === 'Salud y SS' && (
                <Fragment>
                    <Section title="Afiliaciones a Seguridad Social" description="Entidades a las que está afiliado el empleado.">
                        {renderSelect('arl', 'ARL', arlOptions)}
                        {renderSelect('eps', 'EPS', epsOptions)}
                        {renderSelect('afp', 'Fondo de Pensiones (AFP)', afpOptions)}
                        {renderSelect('afc', 'Fondo de Cesantías (AFC)', afcOptions)}
                        {renderSelect('ccf', 'Caja de Compensación (CCF)', ccfOptions)}
                        {renderSelect('medicinaPrepagada', '¿Tiene Medicina Prepagada?', ['Sí', 'No'])}
                    </Section>
                     <Section title="Información Médica" description="Condiciones médicas relevantes del empleado.">
                        {renderInput('enfermedadesPadece', 'Enfermedades que padece')}
                        {renderInput('alergiasPadece', 'Alergias que padece')}
                        {renderInput('restriccionesMedicas', 'Restricciones Médicas')}
                        {renderInput('comorbilidades', 'Comorbilidades')}
                    </Section>
                    <Section title="Condiciones Especiales" description="Otras condiciones laborales y de salud.">
                        {renderSelect('reubicado', '¿Ha sido Reubicado?', ['Sí', 'No'])}
                        {renderInput('cargosReubicacion', 'Cargos de Reubicación')}
                        {renderSelect('pensionado', '¿Es Pensionado?', ['Sí', 'No'])}
                    </Section>
                </Fragment>
            )}

            {activeTab === 'Poblaciones Especiales' && (
                <Fragment>
                    <Section title="Pertenencia e Inclusión" description="Información sobre pertenencia a grupos étnicos o poblaciones especiales.">
                        {renderSelect('pertenenciaEtnica', 'Pertenencia Étnica', etniaOptions)}
                        {renderSelect('poblacionEspecial', 'Población Especial', poblacionEspecialOptions)}
                        {renderSelect('discapacidad', '¿Presenta alguna Discapacidad?', ['Sí', 'No'])}
                        {renderInput('tipoDiscapacidad', 'Tipo de Discapacidad')}
                    </Section>
                </Fragment>
            )}

            {activeTab === 'Dotación' && (
                <Fragment>
                    <Section title="Dotación" description="Información sobre la dotación de uniformes y calzado.">
                        {renderSelect('aplicaDotacion', '¿Aplica para Dotación?', aplicaDotacionOptions)}
                        {renderSelect('tallaCamisa', 'Talla de Camisa', tallaCamisaOptions)}
                        {renderSelect('tallaPantalon', 'Talla de Pantalón', tallaPantalonOptions)}
                        {renderSelect('tallaZapatos', 'Talla de Zapatos', tallaZapatosOptions)}
                    </Section>
                    <Section title="Equipo de Trabajo" description="Equipos y herramientas asignados por la empresa.">
                        {renderSelect('tipoComputador', 'Tipo de Computador', tipoComputadorOptions)}
                        {renderSelect('propietarioEquipo', 'Propietario del Equipo', propietarioEquipoOptions)}
                        {renderSelect('sillaEmpresa', '¿Silla Ergonómica de la Empresa?', ['Sí', 'No'])}
                    </Section>
                </Fragment>
            )}
            
             {activeTab === 'Documentos' && (
                <Fragment>
                    <Section title="Carga de Documentos" description="Adjunte los documentos requeridos para el expediente del empleado.">
                        <div className="md:col-span-4 space-y-4">
                            {Object.entries(documentsToUpload).map(([key, label]) => (
                                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">{label}</span>
                                    {uploadedDocs[key] ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-green-700">{uploadedDocs[key]?.name}</span>
                                            <Button type="button" variant="ghost" onClick={() => handleRemoveFile(key)} className="text-red-500 text-xs">Quitar</Button>
                                        </div>
                                    ) : (
                                        <label htmlFor={`doc-add-${key}`} className="cursor-pointer bg-white border border-primary text-primary px-3 py-1 rounded-md text-sm font-medium hover:bg-orange-50">
                                            Adjuntar Archivo
                                        </label>
                                    )}
                                    <input id={`doc-add-${key}`} type="file" className="hidden" onChange={(e) => handleFileUpload(e, key)} />
                                </div>
                            ))}
                        </div>
                    </Section>
                </Fragment>
            )}

             {activeTab === 'Adicional' && (
                <Fragment>
                    <Section title="Preferencias Personales" description="Información adicional para actividades de bienestar.">
                        {renderInput('comidaFavorita', 'Comida Favorita')}
                        {renderSelect('practicaDeporte', '¿Practica algún Deporte?', practicaDeporteOptions)}
                        {formData.practicaDeporte === 'Sí' && renderInput('cualDeporte', '¿Cuál Deporte?')}
                        {renderSelect('fuma', '¿Fuma?', ['Sí', 'No'])}
                        {renderInput('musicaFavorita', 'Música Favorita')}
                        {renderInput('superheroeFavorito', 'Superhéroe Favorito')}
                    </Section>
                </Fragment>
            )}
        </div>
        
        <div className="flex justify-end items-center pt-4 mt-4 border-t">
            <Button type="button" variant="ghost" onClick={onClose} className="mr-2">Cancelar</Button>
            <Button type="submit">Añadir Empleado</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEmployeeModal;