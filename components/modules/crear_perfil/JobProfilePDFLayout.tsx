import React from 'react';
import { JobProfile } from '../../../types';

interface PDFLayoutProps {
    profile: JobProfile | null;
}

const PDFSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4">
        <h3 className="text-sm font-bold bg-gray-200 p-1 mb-1">{title}</h3>
        {children}
    </div>
);

const PDFEntry: React.FC<{ label: string; value?: string | number | string[] }> = ({ label, value }) => {
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) return null;
    return (
        <div className="grid grid-cols-3 text-xs mb-1">
            <strong className="font-semibold col-span-1">{label}:</strong>
            <span className="col-span-2">{Array.isArray(value) ? value.join(', ') : value}</span>
        </div>
    );
};

const PDFList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
    if (!items || items.filter(i => i.trim()).length === 0) return null;
    return (
        <div className="text-xs mb-1">
            <strong className="font-semibold">{title}:</strong>
            <ul className="list-disc list-inside ml-2">
                {items.filter(i => i.trim()).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
}

const JobProfilePDFLayout: React.FC<PDFLayoutProps> = ({ profile }) => {
    if (!profile) return null;

    const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    return (
        // A4 size: 210mm x 297mm. We simulate this with pixels.
        <div className="bg-white text-black">
            <div className="pdf-page w-[794px] h-[1123px] p-8">
                <div className="text-center mb-4">
                    <h1 className="text-lg font-bold">PERFIL DE CARGO</h1>
                    <h2 className="text-md font-semibold">{profile.jobTitle}</h2>
                </div>

                <PDFSection title="1. IDENTIFICACIÓN DEL CARGO">
                    <PDFEntry label="Nombre del cargo" value={profile.jobTitle} />
                    <PDFEntry label="Área/Departamento" value={profile.department} />
                    <PDFEntry label="Ubicación" value={profile.location} />
                    <PDFEntry label="Cargo al que reporta" value={profile.reportsTo} />
                    <PDFEntry label="Cargos bajo su responsabilidad" value={profile.directReports} />
                    <PDFEntry label="Nivel del cargo" value={profile.level} />
                    <PDFEntry label="Nivel Jerárquico" value={profile.hierarchicalLevel} />
                    <PDFEntry label="Fecha de creación" value={profile.creationDate} />
                </PDFSection>

                <PDFSection title="1.1. CONDICIONES LABORALES">
                    <PDFEntry label="Tipo de contrato" value={profile.contractType} />
                    <PDFEntry label="Jornada laboral" value={profile.workingHours} />
                    <PDFEntry label="Tipo de jornada" value={profile.workdayType} />
                    <PDFEntry label="Tipo de Horario" value={profile.scheduleType} />
                    <PDFEntry label="Modalidad de Trabajo" value={profile.workModality} />
                    <PDFEntry label="Registrado en RUTEC" value={profile.registeredRutec} />
                </PDFSection>

                <PDFSection title="1.2. COMPENSACIÓN Y MOVILIDAD">
                    <PDFEntry label="Salario base mensual" value={formatCurrency(profile.salaryBase)} />
                    <PDFEntry label="Salario no prestacional" value={profile.nonSalaryCompensation ? formatCurrency(profile.nonSalaryCompensation) : 'N/A'} />
                    <PDFEntry label="Aplica bonificaciones" value={profile.bonuses} />
                    <PDFEntry label="Aplica comisiones" value={profile.commissions} />
                    <PDFEntry label="Requiere desplazamiento" value={profile.travelRequired} />
                    <PDFEntry label="Requiere vehículo propio" value={profile.vehicleRequired} />
                </PDFSection>

                <PDFSection title="2. PROPÓSITO GENERAL DEL CARGO">
                    <p className="text-xs">{profile.purpose}</p>
                </PDFSection>
                
                <PDFSection title="3. RESPONSABILIDADES Y FUNCIONES">
                    <PDFList title="A. FUNCIONES PRINCIPALES" items={profile.mainFunctions} />
                    <PDFList title="B. FUNCIONES SECUNDARIAS" items={profile.secondaryFunctions} />
                    <PDFList title="C. FUNCIONES DE APOYO OCASIONAL" items={profile.occasionalFunctions} />
                </PDFSection>
                 <PDFSection title="4. REQUISITOS MÍNIMOS DEL CARGO">
                    <PDFEntry label="Formación académica" value={profile.educationRequirements} />
                    <PDFEntry label="Años de experiencia" value={`${profile.experienceYears} años`} />
                    <PDFEntry label="Certificaciones obligatorias" value={profile.requiredCertifications} />
                    {profile.genderRequirement !== 'Indiferente' && <PDFEntry label="Género Requerido" value={`${profile.genderRequirement} (${profile.genderJustification})`} />}
                    <PDFList title="Conocimientos técnicos y normativos" items={profile.technicalKnowledge} />
                    <PDFEntry label="Habilidades blandas requeridas" value={profile.requiredSoftSkills} />
                    <PDFList title="Otras habilidades blandas" items={profile.otherSoftSkills} />
                </PDFSection>
            </div>
            
            <div className="pdf-page w-[794px] h-[1123px] p-8">
                <PDFSection title="4.1. HERRAMIENTAS Y DOTACIÓN">
                    <PDFEntry label="Aplica para Dotación" value={profile.endowmentRequired} />
                    <PDFEntry label="Tipo de Computador" value={profile.computerType} />
                    <PDFEntry label="Propietario del Equipo" value={profile.equipmentOwner} />
                    <PDFEntry label="Silla Ergonómica" value={profile.ergonomicChairRequired} />
                </PDFSection>

                <PDFSection title="5. RIESGOS OCUPACIONALES Y EXIGENCIAS FÍSICAS">
                    <PDFEntry label="Riesgos asociados al cargo" value={profile.occupationalRisks.concat(profile.otherRisk ? [profile.otherRisk] : [])} />
                    <PDFEntry label="Exigencias físicas y cognitivas" value={profile.physicalDemands} />
                    <PDFEntry label="Elementos de protección personal (EPP)" value={profile.epp} />
                    <PDFEntry label="Formación preventiva obligatoria" value={profile.preventiveTraining} />
                </PDFSection>

                <PDFSection title="6. AUTONOMÍA Y TOMA DE DECISIONES">
                    <PDFEntry label="Grado de autonomía" value={profile.autonomyLevel} />
                    <PDFList title="Decisiones autorizadas" items={profile.authorizedDecisions} />
                    <PDFList title="Responsabilidad sobre recursos" items={profile.resourceResponsibility} />
                </PDFSection>

                <PDFSection title="7. CRITERIOS DE EVALUACIÓN Y RESULTADOS ESPERADOS">
                    <PDFList title="Criterios de evaluación" items={profile.evaluationCriteria} />
                </PDFSection>

                <PDFSection title="8. CLÁUSULAS DE BLINDAJE EMPRESARIAL">
                    <ul className="text-xs list-disc list-inside space-y-1">
                        <li>Este perfil hace parte integral del contrato de trabajo, conforme al Artículo 25 del Código Sustantivo del Trabajo.</li>
                        <li>Toda modificación será notificada por escrito y podrá ejecutarse bajo el principio de ius variandi.</li>
                        <li>Las funciones aquí descritas constituyen el marco referencial para procesos de evaluación, sanción o finalización del contrato.</li>
                        <li>El presente perfil se articula con el Reglamento Interno de Trabajo y el SG-SST.</li>
                    </ul>
                </PDFSection>

                <div className="absolute bottom-12 left-8 right-8 text-xs">
                     <div className="grid grid-cols-2 gap-8 mt-16">
                        <div className="text-center">
                            <div className="border-t border-black w-3/4 mx-auto pt-1">Firma del Colaborador</div>
                            <div className="mt-1">Nombre:</div>
                            <div className="mt-1">C.C:</div>
                        </div>
                        <div className="text-center">
                            <div className="border-t border-black w-3/4 mx-auto pt-1">Firma del Empleador</div>
                             <div className="mt-1">CV EFECTIVA SAS</div>
                             <div className="mt-1">NIT: 900.000.000-1</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobProfilePDFLayout;