// types.ts
// FIX: Import React to make React.FC and other types available.
import React from 'react';
import { SVGProps } from 'react';

// Navigation types from Sidebar.tsx & constants.ts
export type NavItemType = string;

export interface NavItem {
  id: NavItemType;
  label: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  id: string;
  label: string;
  children: NavItem[];
}

// From mockData.ts
export interface ChildInfo {
  nombre: string;
  documento: string;
  edad: string;
}

export interface Employee {
  id: number;
  name: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  avatar: string;
  cargo: string;
  departamento: string;
  correoCorporativo: string;
  celular: string;
  fechaIngreso: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  jefeDirectoId?: number;
  salarioBasicoPrestacional: number;
  correoPersonal?: string;
  otroCelular?: string;
  genero: string;
  orientacionSexual: string;
  fechaNacimiento: string;
  rangoEdad: string;
  tipoSangre: string;
  nacionalidad: string;
  pais: string;
  nivelEscolaridad: string;
  tituloAcademico: string;
  tipoDocumento: string;
  abreviaturaDocumento: string;
  numeroIdentificacion: string;
  identificacionExpedidaEn: string;
  fechaExpedicion: string;
  departamentoResidencia: string;
  ciudadResidencia: string;
  localidadBarrio: string;
  estrato: string;
  tipoVivienda: string;
  direccionResidencia: string;
  especificacionesDomicilio: string;
  vehiculoPropio: string;
  tipoVehiculo: string;
  estadoCivil: string;
  tieneHijos: string;
  numeroHijos: number;
  informacionHijos?: ChildInfo[];
  nombreAcudiente: string;
  celularAcudiente: string;
  parentescoAcudiente: string;
  nivelJerarquico: string;
  duracionContrato: string;
  registradoRutec: string;
  funcionesResponsabilidades: string;
  jornadaHorarios: string;
  tipoHorario: string;
  tipoTrabajo: string;
  perteneceSindicato: string;
  salarioNoPrestacional: number;
  bonosExtralaborales: number;
  recibeComisiones: string;
  banco: string;
  tipoCuenta: string;
  numeroCuentaBancaria: string;
  arl: string;
  eps: string;
  afp: string;
  afc: string;
  ccf: string;
  medicinaPrepagada: string;
  enfermedadesPadece: string;
  alergiasPadece: string;
  pertenenciaEtnica: string;
  poblacionEspecial: string;
  discapacidad: string;
  tipoDiscapacidad: string;
  restriccionesMedicas: string;
  comorbilidades: string;
  reubicado: string;
  cargosReubicacion: string;
  pensionado: string;
  aplicaDotacion: string;
  tallaCamisa: string;
  tallaPantalon: string;
  tallaZapatos: string;
  tipoComputador: string;
  propietarioEquipo: string;
  sillaEmpresa: string;
  comidaFavorita: string;
  practicaDeporte: string;
  cualDeporte: string;
  fuma: string;
  musicaFavorita: string;
  superheroeFavorito: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: number;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Request {
  id: number;
  employeeId: number;
  type: 'Vacation' | 'Sick Leave' | 'Personal';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface JobOpening {
  id: number;
  title: string;
  department: string;
  status: 'Open' | 'Closed';
  dateOpened: string;
}

export interface HiringStageDetail {
  id: string;
  name: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  date?: string;
  notes?: string;
  score?: number;
}

export interface Candidate {
  id: number;
  name: string;
  avatar: string;
  appliedFor: number;
  source: string;
  pipeline: HiringStageDetail[];
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'holiday' | 'company-event' | 'deadline';
}

export interface PerformanceReviewMetrics {
  qualityOfWork: number;
  communication: number;
  teamwork: number;
  proactivity: number;
}

export interface PerformanceReview {
  id: number;
  employeeId: number;
  reviewDate: string;
  overallScore: number;
  comments: string;
  metrics: PerformanceReviewMetrics;
}

export interface Survey {
  id: number;
  title: string;
  status: 'Abierta' | 'Cerrada';
  participants: number;
  responseRate: number;
  closingDate: string;
}

export interface DocumentFile {
  id: number;
  name: string;
  category: string;
  lastModified: string;
  size: string;
}

export interface Asset {
  id: number;
  type: string;
  model: string;
  serialNumber: string;
  assignedTo: number;
  assignmentDate: string;
}

export interface JobProfile {
  id: number;
  jobTitle: string;
  department: string;
  location: string;
  reportsTo: string;
  directReports: string;
  contractType: string;
  level: string;
  workingHours: string;
  workdayType: string;
  salaryBase: number;
  nonSalaryCompensation?: number;
  bonuses?: string;
  commissions?: string;
  travelRequired?: string;
  transfersPolicy?: string;
  relocationPolicy?: string;
  creationDate: string;
  purpose: string;
  mainFunctions: string[];
  secondaryFunctions: string[];
  occasionalFunctions: string[];
  educationRequirements: string;
  experienceYears: number;
  requiredCertifications: string;
  technicalKnowledge: string[];
  requiredSoftSkills: string[];
  otherSoftSkills: string[];
  occupationalRisks: string[];
  otherRisk: string;
  physicalDemands: string[];
  epp: string;
  preventiveTraining: string[];
  autonomyLevel: string;
  authorizedDecisions: string[];
  resourceResponsibility: string[];
  evaluationCriteria: string[];
  // New fields from 'Personas'
  genderRequirement: 'Indiferente' | 'Masculino' | 'Femenino';
  genderJustification: string;
  vehicleRequired: string;
  hierarchicalLevel: string;
  registeredRutec: string;
  scheduleType: string;
  workModality: string;
  endowmentRequired: string;
  computerType: string;
  equipmentOwner: string;
  ergonomicChairRequired: string;
}


export interface VacancyRequisition {
  id: number;
  jobProfileId: number;
  requestedBy: string;
  requestDate: string;
  justification: string;
  status: 'Aprobada' | 'Pendiente' | 'Rechazada';
}

export interface OnboardingTask {
  id: number;
  title: string;
  area: string;
  completed: boolean;
}

export interface OnboardingProcess {
  id: number;
  employeeId: number;
  startDate: string;
  tasks: OnboardingTask[];
}

export interface DotacionDelivery {
  id: number;
  employeeId: number;
  deliveryDate: string;
  items: string[];
  nextDeliveryDate: string;
}

export interface SSTActivity {
  id: number;
  type: string;
  description: string;
  date: string;
  status: 'Programada' | 'Completada' | 'Cancelada';
}

export interface TrainingCourse {
  id: number;
  title: string;
  area: string;
  modality: 'Virtual' | 'Presencial' | 'Híbrido';
  durationHours: number;
  participants: number[];
}

export interface Loan {
  id: number;
  employeeId: number;
  requestDate: string;
  amount: number;
  installments: number;
  paidAmount: number;
  status: 'Activo' | 'Pagado';
}

export interface DisciplinaryCase {
  id: number;
  employeeId: number;
  date: string;
  faultType: 'Leve' | 'Grave' | 'Gravísima';
  description: string;
  status: 'Abierto' | 'Cerrado con Sanción' | 'Cerrado sin Sanción';
}

export interface SecurityIncident {
  id: number;
  type: 'Informático' | 'Físico';
  date: string;
  description: string;
  reportedBy: number;
  status: 'Abierto' | 'Cerrado';
}

export interface OffboardingTask {
  id: number;
  title: string;
  responsible: 'RRHH' | 'TI' | 'Finanzas' | 'Jefe Directo';
  completed: boolean;
}

export interface OffboardingProcess {
  id: number;
  employeeId: number;
  lastDay: string;
  tasks: OffboardingTask[];
}

export interface LibraryResource {
  id: number;
  title: string;
  type: 'Manual' | 'Política' | 'Guía' | 'Video';
  category: string;
  url: string;
}

// From attendance files
export type AttendanceEvent = {
  type: 'entrada' | 'salida' | 'inicio_pausa' | 'fin_pausa' | 'inicio_permiso' | 'fin_permiso';
  timestamp: number;
};

export type AbsenceRecord = {
  date: string;
  reason: 'Cita Médica' | 'Asunto Personal' | 'Incapacidad' | 'Licencia no Remunerada' | 'Sanción';
};


export interface EmployeeAttendanceData {
  employeeId: number;
  events: Record<string, AttendanceEvent[]>;
  absences: AbsenceRecord[];
}

// From chat files
export interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export interface Conversation {
  id: string;
  type: 'dm' | 'group';
  name: string;
  avatar?: string;
  messages: ChatMessage[];
  members: Employee[];
}

export type AllConversations = Record<string, Conversation>;

// From overtime files
export type OvertimeType = 'ordinaria_diurna' | 'ordinaria_nocturna' | 'extra_diurna' | 'extra_nocturna' | 'dominical_diurna' | 'dominical_nocturna' | 'extra_diurna_dominical' | 'extra_nocturna_dominical';

export interface OvertimeRecord {
  id: number;
  docente: string;
  salario: number;
  fecha: string;
  tipo: OvertimeType;
  cantidad: number;
  autorizadoPor: string;
  observaciones: string;
  valorHoraBase: number;
  valorPagado: number;
  porcentaje: string;
  norma: string;
}

// From sst files
export interface Risk {
  id: number;
  area: string;
  task: string;
  description: string;
  classification: string;
  level: 'Bajo' | 'Medio' | 'Alto';
  controlMeasures: string;
}

export interface AnnualPlanTask {
    id: number;
    activity: string;
    responsible: string;
    deadline: string;
    status: 'Programado' | 'En Progreso' | 'Completado' | 'Atrasado';
    evidence?: string;
}

export interface TrainingRecord {
    id: number;
    topic: string;
    date: string;
    instructor: string;
    attendees: number[];
    signed: boolean;
}

export interface EPPRecord {
    id: number;
    employeeId: number;
    epp: string;
    deliveryDate: string;
    quantity: number;
    signed: boolean;
}

export interface HealthExam {
    id: number;
    employeeId: number;
    examType: 'Ingreso' | 'Periódico' | 'Retiro';
    date: string;
    result: 'Apto' | 'Apto con Restricciones' | 'No Apto';
    recommendations: string;
}

export interface AccidentReport {
    id: number;
    employeeId: number;
    date: string;
    type: 'AT' | 'Incidente';
    description: string;
    investigationStatus: 'Abierta' | 'Cerrada';
}

export interface ComplianceRecord {
    id: number;
    norm: string;
    article: string;
    status: 'Cumple' | 'No Cumple' | 'En Proceso';
    evidence: string;
}

export interface SSTDocument {
    id: number;
    name: string;
    category: 'Política' | 'Procedimiento' | 'Formato' | 'Informe';
    lastModified: string;
    url: string;
}

// From Payroll files
export type NoveltyType = 
  | 'Comisión' 
  | 'Bonificación' 
  | 'Viáticos'
  | 'Otro Ingreso Prestacional'
  | 'Otro Ingreso No Prestacional'
  | 'Licencia Remunerada'
  | 'Vacaciones Disfrutadas'
  | 'Vacaciones Compensadas'
  | 'Descuento Préstamo'
  | 'Descuento Sanción'
  | 'Descuento Libranza'
  | 'Descuento Voluntario'
  | 'Otro Descuento'
  | 'Incapacidad'
  | 'Licencia no Remunerada'
  | 'Hora Extra'
  | 'Retención en la Fuente';

export interface PayrollNovelty {
    id: number;
    employeeId: number;
    type: NoveltyType;
    date: string;
    description: string;
    status: 'Procesada' | 'Pendiente' | 'Rechazada';
    // Optional fields based on type
    amount?: number;
    days?: number;
    hours?: number;
    overtimeType?: OvertimeType;
}

export interface PayrollConcept {
    type: 'devengo' | 'deduccion' | 'provision';
    name: string;
    value: number;
    isPrestacional?: boolean; // Only for 'devengo'
}

export interface Payslip {
    employee: Employee;
    period: 'monthly' | 'bi-weekly';
    workedDays: number;
    totalDevengos: number;
    totalDeducciones: number;
    netoAPagar: number;
    netoAPagarEnLetras: string;
    concepts: PayrollConcept[];
}

export interface PayrollConfig {
    smlv: number;
    auxTransporte: number;
    uvt: number;
    arlRisk: 1 | 2 | 3 | 4 | 5;
}