import React, { useState, Fragment, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { DownloadIcon, PlusIcon } from '../ui/Icons';
import { jobProfiles as mockJobProfiles } from '../../services/mockData';
// FIX: Corrected import path for types.
import { JobProfile } from '../../types';
import JobProfilePDFLayout from './crear_perfil/JobProfilePDFLayout';
import VacancyPDFLayout from './crear_perfil/VacancyPDFLayout';
import { duracionContratoOptions, horarioOptions, nivelJerarquicoOptions, propietarioEquipoOptions, tipoComputadorOptions, tipoTrabajoOptions, vehiculoPropioOptions } from './people/options';


declare const jspdf: any;
declare const html2canvas: any;

const initialNewProfileState: Omit<JobProfile, 'id'> = {
    jobTitle: '',
    department: '',
    location: '',
    reportsTo: '',
    directReports: '',
    contractType: 'Indefinido',
    level: 'Profesional',
    workingHours: '',
    workdayType: 'Diurna',
    salaryBase: 0,
    nonSalaryCompensation: 0,
    bonuses: 'No aplica',
    commissions: 'No aplica',
    travelRequired: 'No aplica',
    transfersPolicy: 'No aplica',
    relocationPolicy: 'No aplica',
    creationDate: new Date().toISOString().split('T')[0],
    purpose: '',
    mainFunctions: [''],
    secondaryFunctions: [''],
    occasionalFunctions: [''],
    educationRequirements: '',
    experienceYears: 0,
    requiredCertifications: '',
    technicalKnowledge: [''],
    requiredSoftSkills: [],
    otherSoftSkills: [''],
    occupationalRisks: [],
    otherRisk: '',
    physicalDemands: [],
    epp: '',
    preventiveTraining: [],
    autonomyLevel: 'Media',
    authorizedDecisions: [''],
    resourceResponsibility: [''],
    evaluationCriteria: [''],
    // New fields
    genderRequirement: 'Indiferente',
    genderJustification: '',
    vehicleRequired: 'No',
    hierarchicalLevel: 'Nivel Operativo (Profesionales y Técnicos)',
    registeredRutec: 'No Aplica',
    scheduleType: 'Fijo',
    workModality: 'Presencial',
    endowmentRequired: 'No',
    computerType: 'No cuenta',
    equipmentOwner: 'Empresa',
    ergonomicChairRequired: 'No',
};

type DynamicStringList = 'mainFunctions' | 'secondaryFunctions' | 'occasionalFunctions' | 'technicalKnowledge' | 'otherSoftSkills' | 'authorizedDecisions' | 'resourceResponsibility' | 'evaluationCriteria';
type DynamicCheckboxList = 'requiredSoftSkills' | 'occupationalRisks' | 'physicalDemands' | 'preventiveTraining';

const CrearPerfil: React.FC = () => {
    const [profiles, setProfiles] = useState<JobProfile[]>(mockJobProfiles);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<JobProfile | null>(null);
    const [newProfile, setNewProfile] = useState<Omit<JobProfile, 'id'>>(initialNewProfileState);
    
    const profilePdfRef = useRef<HTMLDivElement>(null);
    const vacancyPdfRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericFields = ['experienceYears', 'salaryBase', 'nonSalaryCompensation'];
        setNewProfile(prev => ({ ...prev, [name]: numericFields.includes(name) ? parseInt(value) || 0 : value }));
    };

    const handleDynamicListChange = (listName: DynamicStringList, index: number, value: string) => {
        setNewProfile(prev => {
            const newList = [...prev[listName]];
            newList[index] = value;
            return { ...prev, [listName]: newList };
        });
    };

    const addDynamicListItem = (listName: DynamicStringList) => {
        setNewProfile(prev => ({ ...prev, [listName]: [...prev[listName], ''] }));
    };
    
    const removeDynamicListItem = (listName: DynamicStringList, index: number) => {
        setNewProfile(prev => {
            const newList = [...prev[listName]];
            if(newList.length > 1) {
                newList.splice(index, 1);
                return { ...prev, [listName]: newList };
            }
            return prev;
        });
    };
    
    const handleCheckboxChange = (listName: DynamicCheckboxList, value: string) => {
        setNewProfile(prev => {
            const list = prev[listName];
            const newList = list.includes(value) ? list.filter(item => item !== value) : [...list, value];
            return { ...prev, [listName]: newList };
        });
    };


    const handleCreateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = Math.max(...profiles.map(p => p.id), 0) + 1;
        setProfiles(prev => [{ id: newId, ...newProfile }, ...prev]);
        setNewProfile(initialNewProfileState);
        setIsCreateModalOpen(false);
    };

    const openViewModal = (profile: JobProfile) => {
        setSelectedProfile(profile);
        setIsViewModalOpen(true);
    };

    const generatePdf = async (elementRef: React.RefObject<HTMLDivElement>, filename: string) => {
        const input = elementRef.current;
        if (!input) return;

        const { jsPDF } = jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        
        const pages = input.querySelectorAll('.pdf-page');

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            const canvas = await html2canvas(page, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        }

        pdf.save(filename);
    };
    
    const renderInputField = (name: keyof Omit<JobProfile, 'id'>, label: string, description: string, options: {type?: string, required?: boolean} = {}) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <p className="text-xs text-gray-500 mt-1">({description})</p>
            <input 
                name={name}
                id={name}
                type={options.type || 'text'}
                value={(newProfile as any)[name]}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-md text-sm"
                required={options.required || false}
            />
        </div>
    );
    
    const renderTextareaField = (name: keyof Omit<JobProfile, 'id'>, label: string, description: string, required: boolean = false) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <p className="text-xs text-gray-500 mt-1">({description})</p>
            <textarea 
                name={name}
                id={name}
                value={(newProfile as any)[name]}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-md text-sm"
                rows={2}
                required={required}
            />
        </div>
    )

    const renderSelectField = (name: keyof Omit<JobProfile, 'id'>, label: string, description: string, options: readonly string[] | string[]) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <p className="text-xs text-gray-500 mt-1">({description})</p>
            <select name={name} id={name} value={(newProfile as any)[name]} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md text-sm">
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    const renderDynamicList = (label: string, description: string, listName: DynamicStringList) => (
        <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="font-medium text-sm">{label}</label>
            <p className="text-xs text-gray-500 mt-1">({description})</p>
            {newProfile[listName].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input type="text" value={item} onChange={(e) => handleDynamicListChange(listName, index, e.target.value)} className="w-full p-2 border rounded-md text-sm"/>
                    <Button type="button" variant="danger" onClick={() => removeDynamicListItem(listName, index)} className="p-2 h-9 w-9 text-xs !min-w-0">X</Button>
                </div>
            ))}
            <Button type="button" variant="ghost" onClick={() => addDynamicListItem(listName)} className="text-sm">+ Añadir</Button>
        </div>
    );
    
    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-dark">Perfiles de Cargo</h3>
                    <Button onClick={() => setIsCreateModalOpen(true)} leftIcon={<PlusIcon />}>
                        Crear Nuevo Perfil
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map(profile => (
                        <Card key={profile.id} className="flex flex-col">
                            <h4 className="font-bold text-lg text-primary">{profile.jobTitle}</h4>
                            <p className="text-sm text-gray-500">{profile.department}</p>
                            <p className="text-sm text-gray-600 mt-2 flex-grow">{profile.purpose.substring(0, 100)}...</p>
                            <div className="mt-4">
                                <Button className="w-full" variant="ghost" onClick={() => openViewModal(profile)}>Ver Detalles</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Crear Nuevo Perfil de Cargo" size="4xl">
                <form onSubmit={handleCreateProfile} className="space-y-6 max-h-[75vh] overflow-y-auto p-2">
                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">1. Identificación del Cargo</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {renderInputField('jobTitle', 'Nombre del cargo', 'Escriba el nombre completo del puesto', {required: true})}
                            {renderInputField('department', 'Área/Departamento', 'Área a la que pertenece el cargo')}
                            {renderInputField('location', 'Ubicación', 'Ciudad y/o sede de trabajo')}
                             <div>
                                <label htmlFor="reportsTo" className="block text-sm font-medium text-gray-700">Cargo al que reporta</label>
                                <p className="text-xs text-gray-500 mt-1">(Jefe o supervisor directo)</p>
                                <select name="reportsTo" id="reportsTo" value={newProfile.reportsTo} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md text-sm">
                                    <option value="">Ninguno</option>
                                    {profiles.map(p => <option key={p.id} value={p.jobTitle}>{p.jobTitle}</option>)}
                                </select>
                            </div>
                            {renderInputField('directReports', 'Cargos bajo su responsabilidad', 'Si no aplica, escriba N/A')}
                             {renderSelectField('hierarchicalLevel', 'Nivel Jerárquico', 'Seleccione el nivel del cargo', nivelJerarquicoOptions)}
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">1.1. Condiciones Laborales</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {renderSelectField('contractType', 'Tipo de contrato', 'Seleccione la modalidad contractual', duracionContratoOptions as any)}
                             {renderSelectField('registeredRutec', '¿Registrado en RUTEC?', 'Indique si el cargo requiere registro', ['Sí', 'No', 'No Aplica'])}
                             <div className="md:col-span-3 grid grid-cols-3 gap-4">
                               {renderInputField('workingHours', 'Jornada laboral', 'Ej: Lunes a Viernes')}
                               {renderSelectField('scheduleType', 'Tipo de Horario', 'Seleccione el tipo de horario', horarioOptions as any)}
                               {renderSelectField('workModality', 'Modalidad de Trabajo', 'Seleccione la modalidad', tipoTrabajoOptions as any)}
                            </div>
                        </div>
                    </fieldset>
                    
                     <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">1.2. Compensación y Movilidad</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             {renderInputField('salaryBase', 'Salario base mensual', 'Valor numérico sin puntos', {type: 'number'})}
                             {renderInputField('nonSalaryCompensation', 'Salario no prestacional', 'Si no aplica, dejar en 0', {type: 'number'})}
                             {renderInputField('bonuses', 'Bonos Extralaborales', 'Ej: Bono por cumplimiento de metas')}
                             {renderSelectField('commissions', '¿Recibe Comisiones?', 'Seleccione si aplica', ['Sí', 'No'])}
                             {renderInputField('travelRequired', 'Requiere desplazamiento', 'Ej: Ocasional, a nivel nacional')}
                             {renderSelectField('vehicleRequired', '¿Vehículo Propio?', 'Indique si se requiere vehículo', vehiculoPropioOptions as any)}
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">2. Propósito General del Cargo</legend>
                        <label className="text-xs text-gray-500">(Describir en un párrafo el objetivo estratégico del cargo, su impacto y conexión con la misión de la empresa.)</label>
                        <textarea name="purpose" value={newProfile.purpose} onChange={handleInputChange} className="w-full p-2 border rounded-md" rows={3}></textarea>
                    </fieldset>
                    
                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">3. Responsabilidades y Funciones</legend>
                        {renderDynamicList('Funciones Principales', 'Actividades esenciales del rol', 'mainFunctions')}
                        {renderDynamicList('Funciones Secundarias', 'Actividades complementarias', 'secondaryFunctions')}
                        {renderDynamicList('Funciones de Apoyo Ocasional', 'Actividades eventuales', 'occasionalFunctions')}
                    </fieldset>
                    
                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">4. Requisitos Mínimos del Cargo</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderInputField('educationRequirements', 'Formación académica', 'Ej: Profesional en Ingeniería de Sistemas')}
                            {renderInputField('experienceYears', 'Años de experiencia', 'Valor numérico', {type: 'number'})}
                         </div>
                        {renderInputField('requiredCertifications', 'Certificaciones obligatorias', 'Si no aplica, escriba N/A', {type:'text'})}
                         <div>
                            {renderSelectField('genderRequirement', 'Género Requerido', 'Seleccione el género requerido para el cargo', ['Indiferente', 'Masculino', 'Femenino'])}
                         </div>
                         {newProfile.genderRequirement !== 'Indiferente' && (
                             <div className="md:col-span-2">
                                {renderTextareaField('genderJustification', 'Justificación de Género', 'Explique por qué se requiere este género específico. Asegúrese de cumplir con la normativa de no discriminación.', true)}
                             </div>
                         )}
                        {renderDynamicList('Conocimientos técnicos y normativos', 'Liste los conocimientos específicos requeridos', 'technicalKnowledge')}
                        <div>
                           <label className="font-medium text-sm">Habilidades blandas requeridas</label>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {['Comunicación efectiva', 'Orientación a resultados', 'Ética y responsabilidad laboral', 'Trabajo en equipo'].map(skill => (
                                <label key={skill} className="flex items-center gap-2"><input type="checkbox" checked={newProfile.requiredSoftSkills.includes(skill)} onChange={() => handleCheckboxChange('requiredSoftSkills', skill)}/>{skill}</label>
                            ))}
                           </div>
                        </div>
                        {renderDynamicList('Otras habilidades blandas', 'Liste otras habilidades deseadas', 'otherSoftSkills')}
                    </fieldset>
                    
                     <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">4.1. Herramientas y Dotación</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderSelectField('endowmentRequired', '¿Aplica para Dotación?', 'Indique si el cargo recibe dotación', ['Sí', 'No'])}
                            {renderSelectField('computerType', 'Tipo de Computador', 'Seleccione el equipo a asignar', tipoComputadorOptions as any)}
                            {renderSelectField('equipmentOwner', 'Propietario del Equipo', 'Indique a quién pertenece el equipo', propietarioEquipoOptions as any)}
                            {renderSelectField('ergonomicChairRequired', '¿Silla Ergonómica de la Empresa?', 'Indique si se entrega silla', ['Sí', 'No'])}
                        </div>
                    </fieldset>

                     <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">5. Riesgos Ocupacionales y Exigencias Físicas</legend>
                        <div>
                            <label className="font-medium text-sm">Riesgos asociados al cargo</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {['Biológicos', 'Químicos', 'Físicos', 'Psicosociales'].map(risk => (
                                    <label key={risk} className="flex items-center gap-2"><input type="checkbox" checked={newProfile.occupationalRisks.includes(risk)} onChange={() => handleCheckboxChange('occupationalRisks', risk)}/>{risk}</label>
                                ))}
                                <input name="otherRisk" placeholder="Otro" value={newProfile.otherRisk} onChange={handleInputChange} className="p-2 border rounded text-sm"/>
                            </div>
                        </div>
                        <div>
                            <label className="font-medium text-sm">Exigencias físicas y cognitivas</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {['Carga física', 'Manipulación de equipos', 'Toma de decisiones bajo presión'].map(demand => (
                                    <label key={demand} className="flex items-center gap-2"><input type="checkbox" checked={newProfile.physicalDemands.includes(demand)} onChange={() => handleCheckboxChange('physicalDemands', demand)}/>{demand}</label>
                                ))}
                            </div>
                        </div>
                        {renderInputField('epp', 'Elementos de protección personal (EPP)', 'Si no aplica, escriba N/A')}
                        <div>
                            <label className="font-medium text-sm">Formación preventiva obligatoria</label>
                            <div className="flex gap-4 mt-2">
                                {['Inducción inicial', 'Capacitaciones periódicas'].map(training => (
                                    <label key={training} className="flex items-center gap-2"><input type="checkbox" checked={newProfile.preventiveTraining.includes(training)} onChange={() => handleCheckboxChange('preventiveTraining', training)}/>{training}</label>
                                ))}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">6. Autonomía y Toma de Decisiones</legend>
                        {renderSelectField('autonomyLevel', 'Grado de autonomía', 'Seleccione el nivel de supervisión requerida', ['Alta', 'Media', 'Limitada'])}
                        {renderDynamicList('Decisiones autorizadas', 'Decisiones que el cargo puede tomar sin supervisión', 'authorizedDecisions')}
                        {renderDynamicList('Responsabilidad sobre recursos', 'Recursos humanos, financieros o materiales a cargo', 'resourceResponsibility')}
                    </fieldset>

                    <fieldset className="border p-4 rounded-lg space-y-4">
                        <legend className="font-semibold px-2">7. Criterios de Evaluación y Resultados Esperados</legend>
                        {renderDynamicList('Criterios de evaluación', 'Indicadores clave para medir el desempeño', 'evaluationCriteria')}
                    </fieldset>
                    
                    <div className="text-xs text-gray-500 space-y-2 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold">8. Cláusulas de Blindaje Empresarial</h4>
                        <p>• Este perfil hace parte integral del contrato de trabajo, conforme al Artículo 25 del Código Sustantivo del Trabajo.</p>
                        <p>• Toda modificación será notificada por escrito y podrá ejecutarse bajo el principio de ius variandi.</p>
                        <p>• Las funciones aquí descritas constituyen el marco referencial para procesos de evaluación, sanción o finalización del contrato.</p>
                    </div>

                    <div className="flex justify-end pt-4"><Button type="submit">Guardar Perfil</Button></div>
                </form>
            </Modal>
            
             {selectedProfile && (
                <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title={`Perfil: ${selectedProfile.jobTitle}`} size="3xl">
                    <div className="space-y-4 max-h-[75vh] overflow-y-auto p-2 text-sm">
                        <p><strong>Departamento:</strong> {selectedProfile.department}</p>
                        <p><strong>Reporta a:</strong> {selectedProfile.reportsTo}</p>
                        <p><strong>Modalidad:</strong> {selectedProfile.workModality}</p>
                        <p><strong>Salario Base:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(selectedProfile.salaryBase)}</p>
                        <hr/>
                        <h4 className="font-bold">Propósito</h4>
                        <p>{selectedProfile.purpose}</p>
                         <hr/>
                        <h4 className="font-bold">Funciones Principales</h4>
                        <ul className="list-disc pl-5">{selectedProfile.mainFunctions.map((f, i) => <li key={i}>{f}</li>)}</ul>
                        <h4 className="font-bold">Requisitos</h4>
                        <p><strong>Educación:</strong> {selectedProfile.educationRequirements}</p>
                        <p><strong>Experiencia:</strong> {selectedProfile.experienceYears} años</p>
                        <p><strong>Género Requerido:</strong> {selectedProfile.genderRequirement} {selectedProfile.genderRequirement !== 'Indiferente' ? `(${selectedProfile.genderJustification})` : ''}</p>
                        <hr/>
                        <h4 className="font-bold">Riesgos y Exigencias</h4>
                        <p><strong>Riesgos:</strong> {selectedProfile.occupationalRisks.join(', ')}</p>
                         <p><strong>Demandas Físicas:</strong> {selectedProfile.physicalDemands.join(', ')}</p>
                    </div>
                     <div className="flex justify-end items-center pt-4 mt-4 border-t gap-2">
                        <Button variant="secondary" onClick={() => generatePdf(profilePdfRef, `perfil_cargo_${selectedProfile.jobTitle.replace(/\s+/g, '_').toLowerCase()}.pdf`)} leftIcon={<DownloadIcon />}>
                            Descargar Perfil (Firma)
                        </Button>
                        <Button onClick={() => generatePdf(vacancyPdfRef, `plantilla_vacante_${selectedProfile.jobTitle.replace(/\s+/g, '_').toLowerCase()}.pdf`)} leftIcon={<DownloadIcon />}>
                           Descargar Plantilla Vacante
                        </Button>
                    </div>
                </Modal>
             )}

            {/* Hidden elements for PDF generation */}
            <div className="opacity-0 fixed -z-10 top-0 left-0">
                 <div ref={profilePdfRef}>
                    {selectedProfile && <JobProfilePDFLayout profile={selectedProfile} />}
                 </div>
                 <div ref={vacancyPdfRef}>
                    {selectedProfile && <VacancyPDFLayout profile={selectedProfile} />}
                 </div>
            </div>
        </>
    );
};

export default CrearPerfil;