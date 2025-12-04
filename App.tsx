
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/modules/Dashboard';
import People from './components/modules/people/People';
import Tasks from './components/modules/Tasks';
import Requests from './components/modules/Requests';
import MyActivities from './components/modules/MyActivities';
import MyAttendance from './components/modules/MyAttendance';
import Calendar from './components/modules/Calendar';
import Recruitment from './components/modules/Recruitment';
import Performance from './components/modules/Performance';
import Attendance from './components/modules/Attendance';
import Surveys from './components/modules/Surveys';
import Documents from './components/modules/Documents';
import Assets from './components/modules/Assets';
import Cases from './components/modules/Cases';
import Security from './components/modules/Security';
import Library from './components/modules/Library';
import Workflows from './components/modules/Workflows';
import Reports from './components/modules/Reports';
import Settings from './components/modules/Settings';
import Organigrama from './components/modules/Organigrama';
import CrearPerfil from './components/modules/CrearPerfil';
import CrearVacante from './components/modules/CrearVacante';
import Seleccion from './components/modules/Seleccion';
import Contratacion from './components/modules/Contratacion';
import Induccion from './components/modules/Induccion';
import EntregaDotacion from './components/modules/EntregaDotacion';
// FIX: Corrected import path for SST component.
import SST from './components/modules/SST';
import Capacitaciones from './components/modules/Capacitaciones';
import NovedadesNomina from './components/modules/NovedadesNomina';
import DescuentosPrestamos from './components/modules/DescuentosPrestamos';
import SalidaColaborador from './components/modules/SalidaColaborador';
import Shifts from './components/modules/Shifts';
import Overtime from './components/modules/Overtime';
import ChatEmpresarial from './components/modules/ChatEmpresarial';
import Placeholder from './components/modules/Placeholder';
// FIX: Corrected import path for types.
import { NavItemType } from './types';
import { navStructure } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<NavItemType>('dashboard');

  const getModuleTitle = (): string => {
    for (const item of navStructure) {
      if ('children' in item) {
        const child = item.children.find(c => c.id === activeModule);
        if (child) return child.label;
      } else {
        if (item.id === activeModule) return item.label;
      }
    }
    return 'Dashboard';
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'people': return <People />;
      case 'requests': return <Requests />;
      case 'my_activities': return <MyActivities />;
      case 'my_attendance': return <MyAttendance />;
      case 'calendar': return <Calendar />;
      case 'recruitment': return <Recruitment />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      case 'organigrama': return <Organigrama />;
      case 'crear_perfil': return <CrearPerfil />;
      case 'crear_vacante': return <CrearVacante />;
      case 'seleccion': return <Seleccion />;
      case 'contratacion': return <Contratacion />;
      case 'induccion': return <Induccion />;
      case 'entrega_dotacion': return <EntregaDotacion />;
      case 'sst': return <SST />;
      case 'capacitaciones': return <Capacitaciones />;
      case 'novedades_nomina': return <NovedadesNomina />;
      case 'descuentos_prestamos': return <DescuentosPrestamos />;
      case 'salida_colaborador': return <SalidaColaborador />;
      case 'shifts': return <Shifts />;
      case 'overtime': return <Overtime />;
      case 'chat': return <ChatEmpresarial />;
      
      // Modules with placeholder content
      case 'tasks': return <Tasks />;
      case 'performance': return <Performance />;
      case 'attendance': return <Attendance />;
      case 'surveys': return <Surveys />;
      case 'documents': return <Documents />;
      case 'assets': return <Assets />;
      case 'casos_disciplinarios': return <Cases />;
      
      default: return <Placeholder title={getModuleTitle()} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-soft">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getModuleTitle()} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-soft p-6">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default App;