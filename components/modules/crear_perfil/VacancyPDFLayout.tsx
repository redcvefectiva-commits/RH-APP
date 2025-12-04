import React from 'react';
import { JobProfile } from '../../../types';

interface PDFLayoutProps {
    profile: JobProfile | null;
}

const VacancyPDFLayout: React.FC<PDFLayoutProps> = ({ profile }) => {
    if (!profile) return null;

    const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    return (
        <div className="bg-white text-black">
            <div className="pdf-page w-[794px] h-[1123px] p-12 font-sans">
                <header className="text-center border-b-2 border-gray-300 pb-4">
                     <h1 className="text-2xl font-bold text-primary">¡Estamos Contratando!</h1>
                     <h2 className="text-3xl font-extrabold mt-2">{profile.jobTitle}</h2>
                     <p className="text-md text-gray-600 mt-1">{profile.department} | {profile.location}</p>
                </header>

                <section className="mt-6">
                    <h3 className="text-xl font-bold border-b border-gray-200 pb-1 mb-2">Propósito del Cargo</h3>
                    <p className="text-sm">{profile.purpose}</p>
                </section>

                <section className="mt-6">
                    <h3 className="text-xl font-bold border-b border-gray-200 pb-1 mb-2">Tus Responsabilidades Serán</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {profile.mainFunctions.filter(f => f.trim()).map((func, i) => <li key={i}>{func}</li>)}
                         {profile.secondaryFunctions.filter(f => f.trim()).map((func, i) => <li key={i}>{func}</li>)}
                    </ul>
                </section>

                <section className="mt-6">
                    <h3 className="text-xl font-bold border-b border-gray-200 pb-1 mb-2">¿Qué Buscamos?</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>Formación:</strong> {profile.educationRequirements}</li>
                        <li><strong>Experiencia:</strong> Mínimo {profile.experienceYears} años en roles similares.</li>
                        {profile.requiredCertifications && profile.requiredCertifications !== 'No aplica' && 
                            <li><strong>Certificaciones:</strong> {profile.requiredCertifications}</li>
                        }
                        <li><strong>Conocimientos Técnicos:</strong> {profile.technicalKnowledge.filter(t => t.trim()).join(', ')}.</li>
                         <li><strong>Habilidades Clave:</strong> {profile.requiredSoftSkills.join(', ')}.</li>
                    </ul>
                </section>

                 <section className="mt-6">
                    <h3 className="text-xl font-bold border-b border-gray-200 pb-1 mb-2">Condiciones y Beneficios</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li><strong>Tipo de Contrato:</strong> {profile.contractType}.</li>
                        <li><strong>Salario Base:</strong> {formatCurrency(profile.salaryBase)} mensuales.</li>
                        {profile.bonuses && profile.bonuses !== 'No aplica' && <li><strong>Bonificaciones:</strong> {profile.bonuses}</li>}
                        {profile.commissions && profile.commissions !== 'No aplica' && <li><strong>Comisiones:</strong> {profile.commissions}</li>}
                        <li><strong>Modalidad de Trabajo:</strong> {profile.workModality}.</li>
                        <li><strong>Jornada Laboral:</strong> {profile.workingHours}.</li>
                    </ul>
                </section>

                <footer className="absolute bottom-12 left-12 right-12 text-center">
                    <p className="text-lg font-bold">¿Te interesa este reto?</p>
                    <p className="text-md">Envía tu hoja de vida a <span className="text-primary font-semibold">talento@cvefectiva.com</span></p>
                    <p className="text-sm text-gray-500 mt-2">CV Efectiva SAS - Todos los derechos reservados</p>
                </footer>
            </div>
        </div>
    );
};

export default VacancyPDFLayout;