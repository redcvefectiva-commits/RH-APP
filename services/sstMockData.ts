import { Risk, AnnualPlanTask, TrainingRecord, EPPRecord, HealthExam, AccidentReport, ComplianceRecord, SSTDocument } from '../types';

export const sstRisks: Risk[] = [
  { id: 1, area: 'Oficina Administrativa', task: 'Uso de computador', description: 'Posturas prolongadas y movimientos repetitivos', classification: 'Ergonómico', level: 'Medio', controlMeasures: 'Pausas activas, silla ergonómica' },
  { id: 2, area: 'Bodega', task: 'Manejo de cargas', description: 'Levantamiento manual de cajas', classification: 'Ergonómico', level: 'Alto', controlMeasures: 'Capacitación en higiene postural, uso de ayudas mecánicas' },
  { id: 3, area: 'Laboratorio', task: 'Manipulación de químicos', description: 'Contacto con sustancias irritantes', classification: 'Químico', level: 'Alto', controlMeasures: 'Uso de EPP (guantes, gafas), ventilación adecuada' },
  { id: 4, area: 'Todas las áreas', task: 'Trabajo bajo presión', description: 'Altas cargas de trabajo y fechas límite ajustadas', classification: 'Psicosocial', level: 'Medio', controlMeasures: 'Programa de manejo del estrés, distribución de tareas' },
];

export const sstAnnualPlan: AnnualPlanTask[] = [
  { id: 1, activity: 'Realizar inspecciones de seguridad trimestrales', responsible: 'Coordinador SST', deadline: '2025-12-31', status: 'En Progreso' },
  { id: 2, activity: 'Capacitación en manejo de emergencias', responsible: 'Brigada de Emergencia', deadline: '2025-10-30', status: 'Programado' },
  { id: 3, activity: 'Actualización de la matriz de riesgos', responsible: 'Coordinador SST', deadline: '2025-11-15', status: 'Programado' },
  { id: 4, activity: 'Campaña de salud visual para personal administrativo', responsible: 'RRHH', deadline: '2025-09-30', status: 'Completado', evidence: 'Lista de asistencia.pdf' },
];

export const sstTrainingRecords: TrainingRecord[] = [
  { id: 1, topic: 'Primeros Auxilios Básicos', date: '2025-08-20', instructor: 'ARL Sura', attendees: [1, 3, 5, 7], signed: false },
  { id: 2, topic: 'Manejo Defensivo (PESV)', date: '2025-07-15', instructor: 'Juan Transito', attendees: [2, 4, 6], signed: true },
];

export const sstEPPRecords: EPPRecord[] = [
  { id: 1, employeeId: 3, epp: 'Guantes de Nitrilo', deliveryDate: '2025-09-01', quantity: 1, signed: true },
  { id: 2, employeeId: 4, epp: 'Botas de Seguridad', deliveryDate: '2025-09-05', quantity: 1, signed: false },
];

export const sstHealthExams: HealthExam[] = [
  { id: 1, employeeId: 1, examType: 'Ingreso', date: '2022-01-10', result: 'Apto', recommendations: 'N/A' },
  { id: 2, employeeId: 3, examType: 'Periódico', date: '2025-08-01', result: 'Apto con Restricciones', recommendations: 'Realizar pausas activas cada 2 horas.' },
  { id: 3, employeeId: 4, examType: 'Periódico', date: '2025-08-05', result: 'Apto', recommendations: 'N/A' },
];

export const sstAccidentReports: AccidentReport[] = [
    { id: 1, employeeId: 4, date: '2025-07-22', type: 'AT', description: 'Caída al mismo nivel en área de bodega, resultando en esguince de tobillo.', investigationStatus: 'Cerrada' },
    { id: 2, employeeId: 8, date: '2025-09-10', type: 'AT', description: 'Corte leve en dedo índice con hoja de papel en oficina.', investigationStatus: 'Abierta' },
];

export const sstComplianceRecords: ComplianceRecord[] = [
    { id: 1, norm: 'Resolución 0312 de 2019', article: 'Estándares Mínimos SST', status: 'Cumple', evidence: 'Autoevaluacion_SST_2025.pdf' },
    { id: 2, norm: 'Ley 1562 de 2012', article: 'Sistema de Riesgos Laborales', status: 'Cumple', evidence: 'Afiliaciones_ARL.zip' },
];

export const sstDocuments: SSTDocument[] = [
    { id: 1, name: 'Política de Seguridad y Salud en el Trabajo', category: 'Política', lastModified: '2025-01-15', url: '#' },
    { id: 2, name: 'Procedimiento de Investigación de Accidentes', category: 'Procedimiento', lastModified: '2025-03-20', url: '#' },
    { id: 3, name: 'Formato de Inspección de Botiquines', category: 'Formato', lastModified: '2024-11-10', url: '#' },
];
