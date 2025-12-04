// constants.ts
import { NavItem, NavGroup } from './types';
import {
    HomeIcon,
    UsersIcon,
    ClipboardListIcon,
    BriefcaseIcon,
    CalendarIcon,
    ChartBarIcon,
    CogIcon,
    SitemapIcon,
    UserAddIcon,
    PencilAltIcon,
    GiftIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    DocumentTextIcon,
    ClockIcon,
    ChatAltIcon,
    LibraryIcon,
    RefreshIcon,
    FolderIcon,
    ArchiveIcon
} from './components/ui/Icons';

export const navStructure: (NavItem | NavGroup)[] = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'my_activities', label: 'Mis Actividades', icon: ClipboardListIcon },
    { id: 'my_attendance', label: 'Mi Asistencia', icon: ClockIcon },
    {
        id: 'gestion_humana',
        label: 'Gestión Humana',
        children: [
            { id: 'people', label: 'Personas', icon: UsersIcon },
            { id: 'organigrama', label: 'Organigrama', icon: SitemapIcon },
        ],
    },
    {
        id: 'talento',
        label: 'Atracción de Talento',
        children: [
            { id: 'crear_perfil', label: 'Crear Perfil', icon: PencilAltIcon },
            { id: 'crear_vacante', label: 'Crear Vacante', icon: BriefcaseIcon },
            { id: 'recruitment', label: 'Gestión de Candidatos', icon: UserAddIcon },
            { id: 'seleccion', label: 'Selección', icon: UsersIcon },
            { id: 'contratacion', label: 'Contratación', icon: DocumentTextIcon },
        ]
    },
    {
        id: 'permanencia_gestion',
        label: 'Permanencia y Gestión',
        children: [
            { id: 'induccion', label: 'Inducción', icon: CheckCircleIcon },
            { id: 'entrega_dotacion', label: 'Entrega de Dotación', icon: GiftIcon },
            { id: 'sst', label: 'SST', icon: ShieldCheckIcon },
            { id: 'capacitaciones', label: 'Capacitaciones', icon: LibraryIcon },
            { id: 'novedades_nomina', label: 'Gestión de Nómina', icon: DocumentTextIcon },
            { id: 'descuentos_prestamos', label: 'Descuentos y Préstamos', icon: DocumentTextIcon },
            { id: 'salida_colaborador', label: 'Salida del Colaborador', icon: UsersIcon },
        ]
    },
    {
        id: 'tiempos_turnos',
        label: 'Tiempos y Turnos',
        children: [
            { id: 'shifts', label: 'Turnos', icon: CalendarIcon },
            { id: 'overtime', label: 'Horas Extras', icon: ClockIcon },
        ]
    },
    {
        id: 'comunicacion_corporativa',
        label: 'Comunicación Corporativa',
        children: [
             { id: 'chat', label: 'Chat Empresarial', icon: ChatAltIcon },
        ]
    },
    {
        id: 'gestion_procesos',
        label: 'Gestión de Procesos',
        children: [
            { id: 'tasks', label: 'Tareas', icon: ClipboardListIcon },
            { id: 'performance', label: 'Desempeño', icon: ChartBarIcon },
            { id: 'attendance', label: 'Asistencia (Admin)', icon: ClockIcon },
            { id: 'surveys', label: 'Encuestas', icon: ClipboardListIcon },
            { id: 'documents', label: 'Documentos', icon: FolderIcon },
            { id: 'assets', label: 'Activos', icon: ArchiveIcon },
            { id: 'casos_disciplinarios', label: 'Casos Disciplinarios', icon: BriefcaseIcon },
        ]
    },
    {
        id: 'herramientas',
        label: 'Herramientas',
        children: [
            { id: 'calendar', label: 'Calendario', icon: CalendarIcon },
            { id: 'requests', label: 'Solicitudes', icon: DocumentTextIcon },
            { id: 'security', label: 'Seguridad', icon: ShieldCheckIcon },
            { id: 'library', label: 'Biblioteca', icon: LibraryIcon },
            { id: 'workflows', label: 'Flujos de Aprobación', icon: RefreshIcon },
            { id: 'reports', label: 'Reportes', icon: ChartBarIcon },
        ]
    },
    { id: 'settings', label: 'Ajustes', icon: CogIcon },
];