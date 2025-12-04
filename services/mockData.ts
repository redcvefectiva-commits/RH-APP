// FIX: Corrected import path for types
import { Employee, Task, Request, JobOpening, Candidate, CalendarEvent, PerformanceReview, Survey, DocumentFile, Asset, JobProfile, VacancyRequisition, OnboardingProcess, DotacionDelivery, SSTActivity, TrainingCourse, PayrollNovelty, Loan, DisciplinaryCase, SecurityIncident, OffboardingProcess, LibraryResource } from '../types';

export const employees: Employee[] = [
    {
        id: 1, name: 'Isabella Lopez', primerNombre: 'Isabella', primerApellido: 'Lopez',
        avatar: 'https://picsum.photos/seed/user/200', cargo: 'Especialista de RRHH', departamento: 'Recursos Humanos',
        correoCorporativo: 'isabella.lopez@cvefectiva.com', celular: '3101234567', fechaIngreso: '2022-01-15', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 3500000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1995-05-20', rangoEdad: 'De 18 a 29 años', tipoSangre: 'O+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Psicóloga', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '123456789', identificacionExpedidaEn: 'Bogotá', fechaExpedicion: '2015-06-01',
        departamentoResidencia: 'Cundinamarca', ciudadResidencia: 'Bogotá', localidadBarrio: 'Chapinero', estrato: '4', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Calle Falsa 123', especificacionesDomicilio: 'Apto 501', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Maria Lopez', celularAcudiente: '3119876543', parentescoAcudiente: 'Madre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Reclutamiento y selección de personal.', jornadaHorarios: 'Lunes - Viernes',
        tipoHorario: 'Fijo', tipoTrabajo: 'Híbrido', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Bancolombia', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '1234567890', arl: 'Sura', eps: 'Sura', afp: 'Protección', afc: 'Protección',
        ccf: 'Comfama', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Mujer S (Cintura 64-69 cm)', tallaPantalon: 'Mujer 6 (Cintura 69 cm)',
        tallaZapatos: '37', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí', comidaFavorita: 'Pasta',
        practicaDeporte: 'Sí', cualDeporte: 'Yoga', fuma: 'No', musicaFavorita: 'Pop', superheroeFavorito: 'Wonder Woman',
    },
    {
        id: 2, name: 'Carlos Rodriguez', primerNombre: 'Carlos', primerApellido: 'Rodriguez',
        avatar: 'https://picsum.photos/seed/boss/200', cargo: 'Director de RRHH', departamento: 'Recursos Humanos',
        correoCorporativo: 'carlos.rodriguez@cvefectiva.com', celular: '3209876543', fechaIngreso: '2018-03-20', status: 'Active',
        salarioBasicoPrestacional: 8000000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1985-11-10', rangoEdad: 'De 30 a 56 años', tipoSangre: 'A+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Posgrado', tituloAcademico: 'MBA', tipoDocumento: 'Cédula de ciudadanía', abreviaturaDocumento: 'CC', numeroIdentificacion: '987654321',
        identificacionExpedidaEn: 'Medellín', fechaExpedicion: '2005-12-01', departamentoResidencia: 'Antioquia', ciudadResidencia: 'Medellín',
        localidadBarrio: 'El Poblado', estrato: '6', tipoVivienda: 'Apartamento', direccionResidencia: 'Carrera 43A # 6Sur-15', especificacionesDomicilio: '',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        vehiculoPropio: 'Sí', tipoVehiculo: 'Carro', estadoCivil: 'Casado/a', tieneHijos: 'Sí', numeroHijos: 2, informacionHijos: [{nombre: 'Sofia', documento: '1', edad: '5'}, {nombre: 'Mateo', documento: '2', edad: '3'}],
        nombreAcudiente: 'Laura Gomez', celularAcudiente: '3151234567', parentescoAcudiente: 'Cónyuge', nivelJerarquico: 'Nivel Estratégico (Alta Dirección)',
        duracionContrato: 'Contrato a Término Indefinido', registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Dirigir el departamento de RRHH.', jornadaHorarios: 'Lunes - Viernes',
        tipoHorario: 'Fijo', tipoTrabajo: 'Híbrido', 
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'.
        perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 500000, recibeComisiones: 'No',
        banco: 'Davivienda', tipoCuenta: 'Corriente', numeroCuentaBancaria: '0987654321', arl: 'Sura', eps: 'Sura', afp: 'Porvenir', afc: 'Porvenir',
        ccf: 'Comfama', medicinaPrepagada: 'Sí', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica', poblacionEspecial: 'No aplica',
        discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No', cargosReubicacion: '', pensionado: 'No',
        aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '', tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
// FIX: Added missing 'cualDeporte' property.
        comidaFavorita: 'Asado', practicaDeporte: 'No', cualDeporte: '', fuma: 'No', musicaFavorita: 'Rock', superheroeFavorito: 'Iron Man',
    },
    {
        id: 3, name: 'Ana Martinez', primerNombre: 'Ana', primerApellido: 'Martinez',
        avatar: 'https://picsum.photos/seed/dev/200', cargo: 'Desarrolladora de Software', departamento: 'Tecnología',
        correoCorporativo: 'ana.martinez@cvefectiva.com', celular: '3005554433', fechaIngreso: '2023-06-01', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 4500000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1998-02-14', rangoEdad: 'De 18 a 29 años', tipoSangre: 'B+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Ingeniera de Sistemas', tipoDocumento: 'Cédula de ciudadanía', abreviaturaDocumento: 'CC',
        numeroIdentificacion: '1122334455', identificacionExpedidaEn: 'Cali', fechaExpedicion: '2018-03-01', departamentoResidencia: 'Valle del Cauca',
        ciudadResidencia: 'Cali', localidadBarrio: 'Pance', estrato: '5', tipoVivienda: 'Casa', direccionResidencia: 'Avenida Siempre Viva 742',
        especificacionesDomicilio: '', vehiculoPropio: 'Sí', tipoVehiculo: 'Moto', estadoCivil: 'Unión libre', tieneHijos: 'No', numeroHijos: 0,
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        nombreAcudiente: 'Pedro Martinez', celularAcudiente: '3012345678', parentescoAcudiente: 'Padre', nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)',
        duracionContrato: 'Contrato a Término Indefinido', registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Desarrollo de nuevas funcionalidades.',
        jornadaHorarios: 'Lunes - Viernes', tipoHorario: 'Fijo', tipoTrabajo: 'Teletrabajo', 
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'.
        perteneceSindicato: 'No', salarioNoPrestacional: 0,
        bonosExtralaborales: 0, recibeComisiones: 'No', banco: 'Nequi', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '3005554433',
        arl: 'Colpatria', eps: 'Sanitas', afp: 'Colpensiones', afc: 'Protección', ccf: 'Comfenalco', medicinaPrepagada: 'No',
        enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica', poblacionEspecial: 'No aplica', discapacidad: 'No',
        tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No', cargosReubicacion: '', pensionado: 'No',
        aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '', tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Propio',
        sillaEmpresa: 'No', comidaFavorita: 'Sushi', practicaDeporte: 'Sí', cualDeporte: 'Ciclismo', fuma: 'No', musicaFavorita: 'Indie',
        superheroeFavorito: 'Spider-Man',
    },
     {
        id: 4, name: 'Juan Perez', primerNombre: 'Juan', primerApellido: 'Perez',
        avatar: 'https://picsum.photos/seed/sales/200', cargo: 'Ejecutivo de Cuentas', departamento: 'Ventas',
        correoCorporativo: 'juan.perez@cvefectiva.com', celular: '3123456789', fechaIngreso: '2021-11-10', status: 'On Leave',
        jefeDirectoId: 2, salarioBasicoPrestacional: 2800000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1993-08-25', rangoEdad: 'De 30 a 56 años', tipoSangre: 'AB+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Técnico o Tecnológico', tituloAcademico: 'Técnico en Ventas', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '5566778899', identificacionExpedidaEn: 'Barranquilla', fechaExpedicion: '2013-09-01',
        departamentoResidencia: 'Atlántico', ciudadResidencia: 'Barranquilla', localidadBarrio: 'Riomar', estrato: '3', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Calle 84 # 45-20', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Juana Perez', celularAcudiente: '3139876543', parentescoAcudiente: 'Hermano/a',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Fijo Inferior a un Año',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Gestionar cartera de clientes.', jornadaHorarios: 'Lunes - Sábado',
        tipoHorario: 'Fijo', tipoTrabajo: 'Presencial', 
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'.
        perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'Sí',
        banco: 'Banco de Bogotá', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '1122334455', arl: 'Positiva', eps: 'Nueva EPS', afp: 'Protección',
        afc: 'Protección', ccf: 'Compensar', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: 'Maní', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Hombre M (Cintura 96-101 cm)', tallaPantalon: 'Hombre 32 (Cintura 81 cm)',
        tallaZapatos: '41', tipoComputador: 'No cuenta', propietarioEquipo: 'Ninguno', sillaEmpresa: 'No', comidaFavorita: 'Pizza',
        practicaDeporte: 'Sí', cualDeporte: 'Fútbol', fuma: 'Sí', musicaFavorita: 'Vallenato', superheroeFavorito: 'Superman',
    },
    {
        id: 5, name: 'Luisa Fernanda Rios', primerNombre: 'Luisa', primerApellido: 'Rios',
        avatar: 'https://picsum.photos/seed/marketing/200', cargo: 'Analista de Marketing Digital', departamento: 'Marketing',
        correoCorporativo: 'luisa.rios@cvefectiva.com', celular: '3145551212', fechaIngreso: '2024-02-20', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 3200000,
        segundoNombre: 'Fernanda', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'No aplica',
        fechaNacimiento: '1999-07-30', rangoEdad: 'De 18 a 29 años', tipoSangre: 'A-', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Comunicadora Social', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '1010101010', identificacionExpedidaEn: 'Bogotá', fechaExpedicion: '2019-08-01',
        departamentoResidencia: 'Cundinamarca', ciudadResidencia: 'Bogotá', localidadBarrio: 'Usaquén', estrato: '4', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Carrera 7 # 120-30', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Roberto Rios', celularAcudiente: '3158887766', parentescoAcudiente: 'Padre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Gestionar campañas en redes sociais y SEO.', jornadaHorarios: 'Lunes - Viernes',
        tipoHorario: 'Fijo', tipoTrabajo: 'Híbrido', 
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'.
        perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Bancolombia', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '2020202020', arl: 'Sura', eps: 'Compensar', afp: 'Protección', afc: 'Protección',
        ccf: 'Compensar', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Mujer M (Cintura 69-74 cm)', tallaPantalon: 'Mujer 8 (Cintura 71 cm)',
        tallaZapatos: '38', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
        comidaFavorita: 'Tacos', practicaDeporte: 'Sí', cualDeporte: 'Crossfit', fuma: 'No', musicaFavorita: 'Reggaeton', superheroeFavorito: 'Black Widow',
    },
    {
        id: 6, name: 'Santiago Mendoza', primerNombre: 'Santiago', primerApellido: 'Mendoza',
        avatar: 'https://picsum.photos/seed/salesmanager/200', cargo: 'Gerente de Ventas', departamento: 'Ventas',
        correoCorporativo: 'santiago.mendoza@cvefectiva.com', celular: '3187654321', fechaIngreso: '2020-09-01', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 6500000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1990-01-15', rangoEdad: 'De 30 a 56 años', tipoSangre: 'O-', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Administrador de Empresas', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '3030303030', identificacionExpedidaEn: 'Bucaramanga', fechaExpedicion: '2010-02-01',
        departamentoResidencia: 'Santander', ciudadResidencia: 'Bucaramanga', localidadBarrio: 'Cabecera del Llano', estrato: '5', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Calle 52 # 35-10', especificacionesDomicilio: '', vehiculoPropio: 'Sí', tipoVehiculo: 'Carro',
        estadoCivil: 'Casado/a', tieneHijos: 'Sí', numeroHijos: 1, informacionHijos: [{nombre: 'Luciana', documento: '3', edad: '2'}],
        nombreAcudiente: 'Andrea Meza', celularAcudiente: '3176543210', parentescoAcudiente: 'Cónyuge', nivelJerarquico: 'Nivel Táctico (Gerencial y Jefaturas)',
        duracionContrato: 'Contrato a Término Indefinido', registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Liderar el equipo de ventas y definir estrategias comerciais.', jornadaHorarios: 'Lunes - Viernes',
        tipoHorario: 'Fijo', tipoTrabajo: 'Presencial', 
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'.
        perteneceSindicato: 'No', salarioNoPrestacional: 1000000, bonosExtralaborales: 0, recibeComisiones: 'Sí',
        banco: 'Banco de Bogotá', tipoCuenta: 'Corriente', numeroCuentaBancaria: '4040404040', arl: 'Colpatria', eps: 'Sanitas', afp: 'Porvenir', afc: 'Porvenir',
        ccf: 'Cajasan', medicinaPrepagada: 'Sí', enfermedadesPadece: 'Asma', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '',
        tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
        comidaFavorita: 'Bandeja Paisa', practicaDeporte: 'Sí', cualDeporte: 'Tenis', fuma: 'No', musicaFavorita: 'Salsa', superheroeFavorito: 'Capitán América',
    },
    {
        id: 7, name: 'Valentina Rojas', primerNombre: 'Valentina', primerApellido: 'Rojas',
        avatar: 'https://picsum.photos/seed/account/200', cargo: 'Ejecutivo de Cuentas Senior', departamento: 'Ventas',
        correoCorporativo: 'valentina.rojas@cvefectiva.com', celular: '3011223344', fechaIngreso: '2022-05-10', status: 'Active',
        jefeDirectoId: 6, salarioBasicoPrestacional: 4000000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1994-04-04', rangoEdad: 'De 30 a 56 años', tipoSangre: 'B-', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Negocios Internacionales', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '5050505050', identificacionExpedidaEn: 'Medellín', fechaExpedicion: '2014-05-01',
        departamentoResidencia: 'Antioquia', ciudadResidencia: 'Medellín', localidadBarrio: 'Laureles', estrato: '5', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Avenida Nutibara # 70-20', especificacionesDomicilio: '', vehiculoPropio: 'Sí', tipoVehiculo: 'Moto',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Fernando Rojas', celularAcudiente: '3029998877', parentescoAcudiente: 'Padre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Manejar cuentas clave y buscar nuevas oportunidades de negocio.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Híbrido', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'Sí',
        banco: 'Davivienda', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '6060606060', arl: 'Sura', eps: 'Sura', afp: 'Protección', afc: 'Protección',
        ccf: 'Comfama', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Mujer S (Cintura 64-69 cm)', tallaPantalon: 'Mujer 6 (Cintura 69 cm)',
        tallaZapatos: '37', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
        comidaFavorita: 'Ceviche', practicaDeporte: 'Sí', cualDeporte: 'Natación', fuma: 'No', musicaFavorita: 'Electrónica', superheroeFavorito: 'Thor',
    },
    {
        id: 8, name: 'Mateo Garcia', primerNombre: 'Mateo', primerApellido: 'Garcia',
        avatar: 'https://picsum.photos/seed/backend/200', cargo: 'Desarrollador Backend Senior', departamento: 'Tecnología',
        correoCorporativo: 'mateo.garcia@cvefectiva.com', celular: '3161237890', fechaIngreso: '2021-03-15', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 8500000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1992-09-09', rangoEdad: 'De 30 a 56 años', tipoSangre: 'A+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Ingeniero de Software', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '7070707070', identificacionExpedidaEn: 'Cali', fechaExpedicion: '2012-10-01',
        departamentoResidencia: 'Valle del Cauca', ciudadResidencia: 'Cali', localidadBarrio: 'Ciudad Jardín', estrato: '6', tipoVivienda: 'Casa',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Calle 100 # 20-15', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Unión libre', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Isabel Garcia', celularAcudiente: '3151112233', parentescoAcudiente: 'Madre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Desarrollo de APIs y lógica de negocio del servidor.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Teletrabajo', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Nequi', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '3161237890', arl: 'Sura', eps: 'Sura', afp: 'Porvenir', afc: 'Porvenir',
        ccf: 'Comfenalco Valle', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '',
        tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Propio', sillaEmpresa: 'No',
// FIX: Added missing 'cualDeporte' property.
        comidaFavorita: 'Hamburguesa', practicaDeporte: 'No', cualDeporte: '', fuma: 'No', musicaFavorita: 'Metal', superheroeFavorito: 'Batman',
    },
    {
        id: 9, name: 'Camila Torres', primerNombre: 'Camila', primerApellido: 'Torres',
        avatar: 'https://picsum.photos/seed/designer/200', cargo: 'Diseñador Gráfico', departamento: 'Marketing',
        correoCorporativo: 'camila.torres@cvefectiva.com', celular: '3118765432', fechaIngreso: '2023-11-01', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 2800000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'No aplica',
        fechaNacimiento: '2000-12-12', rangoEdad: 'De 18 a 29 años', tipoSangre: 'O+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Técnico o Tecnológico', tituloAcademico: 'Diseñadora Gráfica', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '8080808080', identificacionExpedidaEn: 'Pereira', fechaExpedicion: '2020-01-01',
        departamentoResidencia: 'Risaralda', ciudadResidencia: 'Pereira', localidadBarrio: 'Circunvalar', estrato: '4', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Avenida 30 de Agosto # 40-10', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Beatriz Torres', celularAcudiente: '3109871234', parentescoAcudiente: 'Madre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Fijo Inferior a un Año',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Creación de piezas gráficas para redes sociais y web.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Híbrido', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Davivienda', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '9090909090', arl: 'Positiva', eps: 'Salud Total', afp: 'Colpensiones', afc: 'Protección',
        ccf: 'Comfamiliar Risaralda', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: 'Polen', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '',
        tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
        comidaFavorita: 'Lasaña', practicaDeporte: 'Sí', cualDeporte: 'Patinaje', fuma: 'No', musicaFavorita: 'Pop Rock', superheroeFavorito: 'Harley Quinn',
    },
    {
        id: 10, name: 'Andrés Jiménez', primerNombre: 'Andrés', primerApellido: 'Jiménez',
        avatar: 'https://picsum.photos/seed/data/200', cargo: 'Analista de Datos Jr.', departamento: 'Tecnología',
        correoCorporativo: 'andres.jimenez@cvefectiva.com', celular: '3214567890', fechaIngreso: '2024-06-01', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 2500000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '2001-01-20', rangoEdad: 'De 18 a 29 años', tipoSangre: 'AB-', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Estadístico', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '1212121212', identificacionExpedidaEn: 'Bogotá', fechaExpedicion: '2021-02-01',
        departamentoResidencia: 'Cundinamarca', ciudadResidencia: 'Chía', localidadBarrio: 'Centro', estrato: '3', tipoVivienda: 'Casa',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Calle 5 # 10-15', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Marta Jiménez', celularAcudiente: '3201234567', parentescoAcudiente: 'Madre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato de Aprendizaje Sena',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Análisis de datos de RRHH y generación de reportes.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Presencial', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Bancolombia', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '1313131313', arl: 'Sura', eps: 'Compensar', afp: 'Protección', afc: 'Protección',
        ccf: 'Compensar', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '',
        tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
        comidaFavorita: 'Ajiaco', practicaDeporte: 'Sí', cualDeporte: 'Baloncesto', fuma: 'No', musicaFavorita: 'Hip Hop', superheroeFavorito: 'Black Panther',
    },
    {
        id: 11, name: 'Sofia Castro', primerNombre: 'Sofia', primerApellido: 'Castro',
        avatar: 'https://picsum.photos/seed/ops/200', cargo: 'Coordinador de Operaciones', departamento: 'Operaciones',
        correoCorporativo: 'sofia.castro@cvefectiva.com', celular: '3135678901', fechaIngreso: '2022-08-10', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 3800000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'No aplica',
        fechaNacimiento: '1996-06-16', rangoEdad: 'De 18 a 29 años', tipoSangre: 'A+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Ingeniera Industrial', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '1414141414', identificacionExpedidaEn: 'Manizales', fechaExpedicion: '2016-07-01',
        departamentoResidencia: 'Caldas', ciudadResidencia: 'Manizales', localidadBarrio: 'Milán', estrato: '4', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Avenida Santander # 50-20', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Carlos Castro', celularAcudiente: '3148765432', parentescoAcudiente: 'Padre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Optimización de procesos internos y logística.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Presencial', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Banco de Occidente', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '1515151515', arl: 'Colpatria', eps: 'SOS', afp: 'Colpensiones', afc: 'Protección',
        ccf: 'Confa', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Mujer M (Cintura 69-74 cm)', tallaPantalon: 'Mujer 10 (Cintura 74 cm)',
        tallaZapatos: '39', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
// FIX: Added missing 'cualDeporte' property.
        comidaFavorita: 'Sancocho', practicaDeporte: 'No', cualDeporte: '', fuma: 'No', musicaFavorita: 'Crossover', superheroeFavorito: 'Aquaman',
    },
    {
        id: 12, name: 'Daniel Ramirez', primerNombre: 'Daniel', primerApellido: 'Ramirez',
        avatar: 'https://picsum.photos/seed/admin/200', cargo: 'Asistente Administrativo', departamento: 'Administração',
        correoCorporativo: 'daniel.ramirez@cvefectiva.com', celular: '3176543210', fechaIngreso: '2023-01-20', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 1800000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1997-03-25', rangoEdad: 'De 18 a 29 años', tipoSangre: 'B+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Técnico o Tecnológico', tituloAcademico: 'Asistente de Gerencia', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '1616161616', identificacionExpedidaEn: 'Ibagué', fechaExpedicion: '2017-04-01',
        departamentoResidencia: 'Tolima', ciudadResidencia: 'Ibagué', localidadBarrio: 'Centro', estrato: '3', tipoVivienda: 'Casa',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Calle 10 # 3-10', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Lucia Ramirez', celularAcudiente: '3181234567', parentescoAcudiente: 'Madre',
        nivelJerarquico: 'Nivel de Soporte (Administrativo y Auxiliar)', duracionContrato: 'Contrato a Término Fijo Inferior a un Año',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Apoyo en facturación y gestión de documentos.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Presencial', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Banco Caja Social', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '1717171717', arl: 'Positiva', eps: 'Nueva EPS', afp: 'Protección', afc: 'Protección',
        ccf: 'Comfenalco Tolima', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Hombre L (Cintura 101-106 cm)', tallaPantalon: 'Hombre 34 (Cintura 86 cm)',
        tallaZapatos: '42', tipoComputador: 'PC', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
// FIX: Added missing 'cualDeporte' property.
        comidaFavorita: 'Lechona', practicaDeporte: 'No', cualDeporte: '', fuma: 'No', musicaFavorita: 'Popular', superheroeFavorito: 'Hulk',
    },
    {
        id: 13, name: 'Gabriela Morales', primerNombre: 'Gabriela', primerApellido: 'Morales',
        avatar: 'https://picsum.photos/seed/payroll/200', cargo: 'Especialista en Nómina', departamento: 'Recursos Humanos',
        correoCorporativo: 'gabriela.morales@cvefectiva.com', celular: '3109876543', fechaIngreso: '2021-07-01', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 4200000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Femenino', orientacionSexual: 'No aplica',
        fechaNacimiento: '1993-10-10', rangoEdad: 'De 30 a 56 años', tipoSangre: 'O-', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Contadora Pública', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '1818181818', identificacionExpedidaEn: 'Cúcuta', fechaExpedicion: '2013-11-01',
        departamentoResidencia: 'Norte de Santander', ciudadResidencia: 'Cúcuta', localidadBarrio: 'Caobos', estrato: '4', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Avenida 0 # 15-20', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Casado/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Ricardo Morales', celularAcudiente: '3111239876', parentescoAcudiente: 'Esposo',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Liquidación de nómina y seguridad social.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato' on line 315
        tipoHorario: 'Fijo', tipoTrabajo: 'Híbrido', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'BBVA', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '1919191919', arl: 'Sura', eps: 'Sanitas', afp: 'Porvenir', afc: 'Porvenir',
        ccf: 'Comfaoriente', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'No', tallaCamisa: '', tallaPantalon: '',
        tallaZapatos: '', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
// FIX: Added missing 'cualDeporte' property.
        comidaFavorita: 'Mute Santandereano', practicaDeporte: 'No', cualDeporte: '', fuma: 'No', musicaFavorita: 'Baladas', superheroeFavorito: 'Jean Grey',
    },
    {
        id: 14, name: 'Javier Ortiz', primerNombre: 'Javier', primerApellido: 'Ortiz',
        avatar: 'https://picsum.photos/seed/hrgeneralist/200', cargo: 'Generalista de RRHH', departamento: 'Recursos Humanos',
        correoCorporativo: 'javier.ortiz@cvefectiva.com', celular: '3008765432', fechaIngreso: '2023-04-12', status: 'Active',
        jefeDirectoId: 2, salarioBasicoPrestacional: 2900000,
        segundoNombre: '', segundoApellido: '', correoPersonal: '', otroCelular: '', genero: 'Masculino', orientacionSexual: 'Heterosexual',
        fechaNacimiento: '1998-05-05', rangoEdad: 'De 18 a 29 años', tipoSangre: 'A+', nacionalidad: 'Colombiano', pais: 'Colombia',
        nivelEscolaridad: 'Profesional (Universitario)', tituloAcademico: 'Psicólogo', tipoDocumento: 'Cédula de ciudadanía',
        abreviaturaDocumento: 'CC', numeroIdentificacion: '2121212121', identificacionExpedidaEn: 'Cartagena', fechaExpedicion: '2018-06-01',
        departamentoResidencia: 'Bolívar', ciudadResidencia: 'Cartagena', localidadBarrio: 'Bocagrande', estrato: '5', tipoVivienda: 'Apartamento',
// FIX: Corrected typo from 'vehiculoProprio' to 'vehiculoPropio'.
        direccionResidencia: 'Carrera 1 # 5-100', especificacionesDomicilio: '', vehiculoPropio: 'No', tipoVehiculo: 'No aplica',
        estadoCivil: 'Soltero/a', tieneHijos: 'No', numeroHijos: 0, nombreAcudiente: 'Carmen Ortiz', celularAcudiente: '3017654321', parentescoAcudiente: 'Madre',
        nivelJerarquico: 'Nivel Operativo (Profesionales y Técnicos)', duracionContrato: 'Contrato a Término Indefinido',
        registradoRutec: 'No Aplica', funcionesResponsabilidades: 'Apoyo en procesos de bienestar y desempeño.', jornadaHorarios: 'Lunes - Viernes',
// FIX: Corrected typo from 'pertenceSindicato' to 'perteneceSindicato'
        tipoHorario: 'Fijo', tipoTrabajo: 'Presencial', perteneceSindicato: 'No', salarioNoPrestacional: 0, bonosExtralaborales: 0, recibeComisiones: 'No',
        banco: 'Itaú', tipoCuenta: 'Ahorro', numeroCuentaBancaria: '2323232323', arl: 'Colpatria', eps: 'Coosalud', afp: 'Protección', afc: 'Protección',
        ccf: 'Comfamiliar Cartagena', medicinaPrepagada: 'No', enfermedadesPadece: '', alergiasPadece: '', pertenenciaEtnica: 'No aplica',
        poblacionEspecial: 'No aplica', discapacidad: 'No', tipoDiscapacidad: '', restriccionesMedicas: 'No', comorbilidades: 'No', reubicado: 'No',
        cargosReubicacion: '', pensionado: 'No', aplicaDotacion: 'Sí', tallaCamisa: 'Hombre M (Cintura 96-101 cm)', tallaPantalon: 'Hombre 32 (Cintura 81 cm)',
        tallaZapatos: '40', tipoComputador: 'Portatil', propietarioEquipo: 'Empresa', sillaEmpresa: 'Sí',
        comidaFavorita: 'Pescado frito con patacón', practicaDeporte: 'Sí', cualDeporte: 'Surf', fuma: 'No', musicaFavorita: 'Champeta', superheroeFavorito: 'Flash',
    }
];

export const tasks: Task[] = [
    { id: 1, title: 'Preparar informe de KPIs de RRHH', description: 'Consolidar los indicadores clave de rendimiento del último trimestre para la presentación a gerencia.', assignedTo: 1, dueDate: '2025-10-15', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Revisar perfiles para vacante de Diseñador UX', description: 'Filtrar los currículums recibidos y preseleccionar a los 5 mejores candidatos.', assignedTo: 1, dueDate: '2025-10-10', priority: 'Medium', status: 'Pending' },
    { id: 3, title: 'Organizar evento de fin de año', description: 'Coordinar la logística, proveedores y comunicación para la fiesta de fin de año de la empresa.', assignedTo: 3, dueDate: '2025-11-30', priority: 'High', status: 'Pending' },
    { id: 4, title: 'Actualizar manual de bienvenida', description: 'Incluir las nuevas políticas de trabajo híbrido en el manual para nuevos empleados.', assignedTo: 1, dueDate: '2025-10-20', priority: 'Low', status: 'Completed' },
];

export const requests: Request[] = [
    { id: 1, employeeId: 3, type: 'Vacation', startDate: '2025-12-20', endDate: '2026-01-05', status: 'Pending' },
    { id: 2, employeeId: 4, type: 'Sick Leave', startDate: '2025-10-01', endDate: '2025-10-08', status: 'Approved' },
    { id: 3, employeeId: 1, type: 'Personal', startDate: '2025-11-01', endDate: '2025-11-01', status: 'Rejected' },
];

export const jobOpenings: JobOpening[] = [
    { id: 101, title: 'Diseñador UX/UI Senior', department: 'Tecnología', status: 'Open', dateOpened: '2025-09-15' },
    { id: 102, title: 'Analista Financiero Jr.', department: 'Finanzas', status: 'Open', dateOpened: '2025-09-28' },
    { id: 103, title: 'Asistente de Marketing', department: 'Marketing', status: 'Closed', dateOpened: '2025-08-01' },
];

export const candidates: Candidate[] = [
    { id: 201, name: 'Laura Gómez', avatar: 'https://picsum.photos/seed/candidate1/200', appliedFor: 101, source: 'LinkedIn', pipeline: [
        { id: 'attraction', name: 'Atracción', status: 'Approved', date: '2025-09-20' },
        { id: 'filter', name: 'Filtro Reclutamiento', status: 'Approved', date: '2025-09-22' },
        { id: 'hr_interview', name: 'Entrevista RRHH', status: 'Pending', date: '' },
        { id: 'tech_interview', name: 'Entrevista Jefe Inmediato', status: 'Pending', date: '' },
        { id: 'psych_test', name: 'Pruebas Psicotécnicas', status: 'Pending', date: '' },
        { id: 'hired', name: 'Contratado', status: 'Pending', date: '' },
    ]},
    { id: 202, name: 'Pedro Pascal', avatar: 'https://picsum.photos/seed/candidate2/200', appliedFor: 101, source: 'Computrabajo', pipeline: [
        { id: 'attraction', name: 'Atracción', status: 'Approved', date: '2025-09-18' },
        { id: 'filter', name: 'Filtro Reclutamiento', status: 'Rejected', date: '2025-09-21', notes: 'No cumple con los años de experiencia.' },
        { id: 'hr_interview', name: 'Entrevista RRHH', status: 'Pending', date: '' },
        { id: 'tech_interview', name: 'Entrevista Jefe Inmediato', status: 'Pending', date: '' },
        { id: 'psych_test', name: 'Pruebas Psicotécnicas', status: 'Pending', date: '' },
        { id: 'hired', name: 'Contratado', status: 'Pending', date: '' },
    ]},
    { id: 203, name: 'Mariana Duque', avatar: 'https://picsum.photos/seed/candidate3/200', appliedFor: 102, source: 'Referido', pipeline: [
         { id: 'attraction', name: 'Atracción', status: 'Approved', date: '2025-10-01' },
         { id: 'filter', name: 'Filtro Reclutamiento', status: 'Approved', date: '2025-10-02' },
         { id: 'hr_interview', name: 'Entrevista RRHH', status: 'Approved', date: '2025-10-05', score: 85, notes: 'Excelente actitud y potencial.' },
         { id: 'tech_interview', name: 'Entrevista Jefe Inmediato', status: 'Approved', date: '2025-10-10' },
         { id: 'psych_test', name: 'Pruebas Psicotécnicas', status: 'Approved', date: '2025-10-12', score: 92 },
         { id: 'hired', name: 'Contratado', status: 'Approved', date: '2025-10-15' },
    ]},
];

export const calendarEvents: CalendarEvent[] = [
    { id: 1, title: 'Día del Trabajo', date: '2025-05-01', type: 'holiday' },
    { id: 2, title: 'Reunión General Trimestral', date: '2025-10-10', type: 'company-event' },
    { id: 3, title: 'Entrega Informe Ventas', date: '2025-10-15', type: 'deadline' },
];

export const performanceReviews: PerformanceReview[] = [
    { id: 1, employeeId: 1, reviewDate: '2025-07-15', overallScore: 4.5, comments: 'Isabella demuestra un excelente compromiso y proactividad. Ha mejorado notablemente la eficiencia del proceso de selección.', metrics: { qualityOfWork: 4.8, communication: 4.5, teamwork: 4.6, proactivity: 4.2 } },
    { id: 2, employeeId: 3, reviewDate: '2025-09-01', overallScore: 4.0, comments: 'Ana es una desarrolladora muy competente técnicamente. Puede mejorar en la comunicación de avances al equipo.', metrics: { qualityOfWork: 4.5, communication: 3.5, teamwork: 4.0, proactivity: 4.0 } },
    { id: 3, employeeId: 4, reviewDate: '2025-08-20', overallScore: 3.2, comments: 'Juan cumple con sus metas de ventas, pero se ha detectado una baja en la satisfacción de los clientes. Se requiere plan de mejora.', metrics: { qualityOfWork: 3.0, communication: 3.5, teamwork: 4.0, proactivity: 2.5 } },
];

export const surveys: Survey[] = [
    { id: 1, title: 'Encuesta de Clima Laboral 2025', status: 'Cerrada', participants: 48, responseRate: 92, closingDate: '2025-09-20' },
    { id: 2, title: 'Sondeo sobre Preferencias de Trabajo Híbrido', status: 'Abierta', participants: 50, responseRate: 65, closingDate: '2025-10-15' },
];

export const documents: DocumentFile[] = [
    { id: 1, name: 'Política de Trabajo Remoto.pdf', category: 'Políticas Internas', lastModified: '2025-09-30', size: '256 KB' },
    { id: 2, name: 'Manual de Onboarding.pdf', category: 'Manuales de Procedimiento', lastModified: '2025-08-15', size: '1.2 MB' },
    { id: 3, name: 'Formato Solicitud de Vacaciones.docx', category: 'Formatos de RRHH', lastModified: '2024-01-10', size: '78 KB' },
];

export const assets: Asset[] = [
    { id: 1, type: 'Laptop', model: 'Dell Latitude 7420', serialNumber: 'SN12345DELL', assignedTo: 1, assignmentDate: '2022-01-15' },
    { id: 2, type: 'Laptop', model: 'MacBook Pro 16"', serialNumber: 'SN67890AAPL', assignedTo: 3, assignmentDate: '2023-06-01' },
    { id: 3, type: 'Celular', model: 'iPhone 15 Pro', serialNumber: 'SN54321IPHN', assignedTo: 2, assignmentDate: '2024-02-01' },
];

// MOCK DATA FOR NEW MODULES
export const jobProfiles: JobProfile[] = [
    {
        id: 1,
        jobTitle: 'Especialista de RRHH',
        department: 'Recursos Humanos',
        location: 'Bogotá (Híbrido)',
        reportsTo: 'Director de RRHH',
        directReports: 'No aplica',
        contractType: 'Indefinido',
        level: 'Profesional',
        workingHours: 'Lunes a Viernes, 8am - 5pm',
        workdayType: 'Diurna',
        salaryBase: 3500000,
        nonSalaryCompensation: 0,
        bonuses: 'Bono anual por desempeño, sujeito a resultados de la compañía y evaluación individual.',
        commissions: 'No aplica',
        travelRequired: 'Ocasional, para visitar otras sedes o asistir a ferias de empleo.',
        creationDate: '2025-01-01',
        purpose: 'Gestionar integralmente los procesos de atracción, selección, contratación y bienestar del personal, asegurando el cumplimiento de las políticas de la empresa y la normativa legal vigente.',
        mainFunctions: ['Publicar ofertas de empleo en diversas plataformas', 'Realizar entrevistas por competencias a candidatos', 'Gestionar el proceso de onboarding para nuevos empleados', 'Coordinar actividades de bienestar y clima laboral'],
        secondaryFunctions: ['Coordinar pruebas psicotécnicas y técnicas', 'Apoyar en la logística de eventos internos'],
        occasionalFunctions: ['Participar en ferias de empleo universitarias', 'Apoyar en procesos disciplinarios'],
        educationRequirements: 'Profesional en Psicología, Administración de Empresas o afines.',
        experienceYears: 3,
        requiredCertifications: 'No aplica',
        technicalKnowledge: ['Manejo de ATS (Applicant Tracking System)', 'Microsoft Office (Excel Avanzado)', 'LinkedIn Recruiter'],
        requiredSoftSkills: ['Comunicación efectiva', 'Trabajo en equipo', 'Orientación a resultados', 'Ética y responsabilidad laboral'],
        otherSoftSkills: ['Orientación al Detalle', 'Resolución de Problemas', 'Inteligencia Emocional'],
        occupationalRisks: ['Psicosociales'],
        otherRisk: 'Estrés laboral por manejo de múltiples procesos simultáneos.',
        physicalDemands: ['Toma de decisiones bajo presión'],
        epp: 'No aplica',
        preventiveTraining: ['Inducción inicial', 'Capacitaciones periódicas'],
        autonomyLevel: 'Media',
        authorizedDecisions: ['Pre-selección de candidatos para entrevista com jefe directo', 'Agendamiento de entrevistas y pruebas', 'Selección de plataformas de reclutamiento'],
        resourceResponsibility: ['Gestión de accesos a plataformas de empleo', 'Manejo de base de datos de candidatos'],
        evaluationCriteria: ['Tiempo promedio de cobertura de vacantes (Time-to-fill)', 'Calidad de la contratación (desempeño a 6 meses)', 'Satisfacción del nuevo empleado con el proceso de onboarding'],
        genderRequirement: 'Indiferente',
        genderJustification: '',
        vehicleRequired: 'No',
        hierarchicalLevel: 'Nivel Operativo (Profesionales y Técnicos)',
        registeredRutec: 'No Aplica',
        scheduleType: 'Fijo',
        workModality: 'Híbrido',
        endowmentRequired: 'Sí',
        computerType: 'Portatil',
        equipmentOwner: 'Empresa',
        ergonomicChairRequired: 'Sí',
    },
    {
        id: 2,
        jobTitle: 'Desarrolladora de Software',
        department: 'Tecnología',
        location: 'Remoto (Colombia)',
        reportsTo: 'Líder Técnico de Desarrollo',
        directReports: 'No aplica',
        contractType: 'Indefinido',
        level: 'Profesional',
        workingHours: 'Lunes a Viernes, Horario Flexible',
        workdayType: 'Diurna',
        salaryBase: 4500000,
        bonuses: 'No aplica',
        commissions: 'No aplica',
        relocationPolicy: 'No aplica por ser remoto',
        creationDate: '2025-02-15',
        purpose: 'Diseñar, desarrollar y mantener la interfaz de usuario de las aplicaciones web de la compañía, asegurando una experiencia de usuario óptima, un código de alta calidad y el cumplimiento de los requerimientos funcionales.',
        mainFunctions: ['Desarrollar nuevas funcionalidades con React y TypeScript', 'Optimizar el rendimiento de la aplicación del lado del cliente', 'Realizar revisiones de código (Code Reviews) a otros miembros del equipo', 'Colaborar con el equipo de backend para la integración de APIs'],
        secondaryFunctions: ['Colaborar con diseñadores UX/UI para implementar interfaces', 'Documentar componentes y funcionalidades desarrolladas'],
        occasionalFunctions: ['Participar en entrevistas técnicas para nuevos candidatos', 'Investigar nuevas tecnologías y proponer mejoras'],
        educationRequirements: 'Profesional en Ingeniería de Sistemas, Desarrollo de Software o carreras afines. Se puede homologar con experiencia demostrable.',
        experienceYears: 2,
        requiredCertifications: 'No aplica',
        technicalKnowledge: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Git', 'Consumo de APIs REST'],
        requiredSoftSkills: ['Trabajo en equipo', 'Comunicación efectiva', 'Resolución de Problemas'],
        otherSoftSkills: ['Autonomía', 'Pensamiento Crítico', 'Adaptabilidad'],
        occupationalRisks: ['Físicos'],
        otherRisk: 'Ergonómico por postura prolongada frente al computador.',
        physicalDemands: ['Manipulación de equipos'],
        epp: 'No aplica',
        preventiveTraining: ['Inducción inicial', 'Capacitación en pausas activas y ergonomía'],
        autonomyLevel: 'Media',
        authorizedDecisions: ['Selección de librerías menores para resolver problemas específicos', 'Definición de la estructura de componentes de una nueva funcionalidad'],
        resourceResponsibility: ['Mantenimiento de repositorios de código asignados'],
        evaluationCriteria: ['Calidad del código (limpieza, eficiencia)', 'Cumplimiento de los plazos de entrega de sprints', 'Performance y usabilidad de las funcionalidades desarrolladas', 'Colaboración y comunicación con el equipo'],
        genderRequirement: 'Indiferente',
        genderJustification: '',
        vehicleRequired: 'No',
        hierarchicalLevel: 'Nivel Operativo (Profesionales y Técnicos)',
        registeredRutec: 'No Aplica',
        scheduleType: 'Flexible',
        workModality: 'Teletrabajo',
        endowmentRequired: 'No',
        computerType: 'Portatil',
        equipmentOwner: 'Propio',
        ergonomicChairRequired: 'No',
    },
    {
        id: 3,
        jobTitle: 'Gerente de Ventas',
        department: 'Ventas',
        location: 'Bogotá (Presencial)',
        reportsTo: 'Director General',
        directReports: 'Ejecutivo de Cuentas, Ejecutivo de Cuentas Senior',
        contractType: 'Indefinido',
        level: 'Directivo',
        workingHours: 'Lunes a Viernes, con disponibilidad según necesidad',
        workdayType: 'Mixta',
        salaryBase: 6500000,
        nonSalaryCompensation: 1000000,
        bonuses: 'Bono trimestral por cumplimiento de metas del equipo.',
        commissions: 'Comisión sobre la venta neta total del equipo a su cargo.',
        travelRequired: 'Frecuente, a nivel nacional para visitar clientes y equipos.',
        transfersPolicy: 'Sujeto a necesidades de la compañía y acuerdo mutuo.',
        creationDate: '2025-03-01',
        purpose: 'Liderar, gestionar y desarrollar el equipo de ventas para alcanzar y superar los objetivos comerciais de la compañía, expandiendo la cartera de clientes y asegurando la rentabilidad del área.',
        mainFunctions: ['Definir la estrategia comercial y los KPIs del equipo de ventas', 'Liderar, capacitar y evaluar al equipo de ejecutivos de cuentas', 'Gestionar cuentas clave y participar en negociaciones de alto nivel', 'Realizar seguimiento al pipeline de ventas y generar reportes para la dirección'],
        secondaryFunctions: ['Analizar el mercado y la competencia para identificar oportunidades', 'Colaborar con el área de marketing para alinear estrategias'],
        occasionalFunctions: ['Representar a la empresa en ferias y eventos del sector'],
        educationRequirements: 'Profesional en Administración de Empresas, Mercadeo, Negocios Internacionales o carreras afines. Deseable posgrado en área comercial.',
        experienceYears: 8,
        requiredCertifications: 'No aplica',
        technicalKnowledge: ['Manejo de CRM (Salesforce, HubSpot, etc.)', 'Excel avanzado para análisis de datos', 'Técnicas de negociación y cierre de ventas', 'Análisis de métricas comerciais'],
        requiredSoftSkills: ['Liderazgo', 'Negociación', 'Orientación a resultados', 'Comunicación efectiva'],
        otherSoftSkills: ['Pensamiento estratégico', 'Inteligencia de negocios', 'Trabajo bajo presión'],
        occupationalRisks: ['Psicosociales', 'Físicos'],
        otherRisk: 'Estrés, riesgo en desplazamientos (tráfico).',
        physicalDemands: ['Toma de decisiones bajo presión', 'Carga física por viajes'],
        epp: 'Kit de seguridad vial para vehículo si aplica.',
        preventiveTraining: ['Inducción inicial', 'Manejo defensivo (si usa vehículo de la empresa)'],
        autonomyLevel: 'Alta',
        authorizedDecisions: ['Aprobación de descuentos hasta un límite establecido', 'Definición de territorios de venta', 'Contratación y desvinculación de miembros de su equipo (con aval de RRHH)'],
        resourceResponsibility: ['Presupuesto del área de ventas', 'Vehículos y equipos asignados al equipo comercial'],
        evaluationCriteria: ['Cumplimiento de la cuota de ventas del equipo', 'Rentabilidad del área', 'Crecimiento de la cartera de clientes', 'Nivel de satisfacción de los clientes clave'],
        genderRequirement: 'Indiferente',
        genderJustification: '',
        vehicleRequired: 'Deseable',
        hierarchicalLevel: 'Nivel Táctico (Gerencial y Jefaturas)',
        registeredRutec: 'No Aplica',
        scheduleType: 'Fijo',
        workModality: 'Presencial',
        endowmentRequired: 'No',
        computerType: 'Portatil',
        equipmentOwner: 'Empresa',
        ergonomicChairRequired: 'Sí',
    }
];

export const vacancyRequisitions: VacancyRequisition[] = [
    { id: 1, jobProfileId: 1, requestedBy: 'Carlos Rodriguez', requestDate: '2025-09-10', justification: 'Reemplazo por licencia de maternidad.', status: 'Aprobada' },
    { id: 2, jobProfileId: 2, requestedBy: 'Carlos Rodriguez', requestDate: '2025-10-01', justification: 'Nuevo proyecto de expansión requiere un desarrollador adicional.', status: 'Pendiente' }
];

export const onboardingProcesses: OnboardingProcess[] = [
    {
        id: 1, employeeId: 3, startDate: '2023-06-01',
        tasks: [
            { id: 1, title: 'Firma de Contrato y Afiliaciones', area: 'RRHH', completed: true },
            { id: 2, title: 'Entrega de equipo (Laptop)', area: 'TI', completed: true },
            { id: 3, title: 'Introducción al equipo', area: 'Jefe Directo', completed: true },
            { id: 4, title: 'Capacitación en políticas de la empresa', area: 'RRHH', completed: false }
        ]
    }
];

export const dotacionDeliveries: DotacionDelivery[] = [
    { id: 1, employeeId: 1, deliveryDate: '2025-08-15', items: ['2 Camisas tipo polo', '1 Jean'], nextDeliveryDate: '2025-12-15' },
    { id: 2, employeeId: 4, deliveryDate: '2025-07-20', items: ['3 Camisas formales', '2 Pantalones de dril'], nextDeliveryDate: '2025-11-20' }
];

export const sstActivities: SSTActivity[] = [
    { id: 1, type: 'Inspección', description: 'Revisión de puestos de trabajo - Ergonomía', date: '2025-10-15', status: 'Programada' },
    { id: 2, type: 'Capacitación', description: 'Uso de extintores y primeros auxilios', date: '2025-09-28', status: 'Completada' },
    { id: 3, type: 'Reunión COPASST', description: 'Revisión mensual de indicadores', date: '2025-10-05', status: 'Completada' }
];

export const trainingCourses: TrainingCourse[] = [
    { id: 1, title: 'Liderazgo para Nuevos Jefes', area: 'Habilidades Blandas', modality: 'Virtual', durationHours: 20, participants: [2] },
    { id: 2, title: 'Excel Avanzado para RRHH', area: 'Herramientas Ofimáticas', modality: 'Presencial', durationHours: 16, participants: [1] },
    { id: 3, title: 'Introducción a React para Desarrolladores', area: 'Tecnología', modality: 'Virtual', durationHours: 40, participants: [3] }
];

export const payrollNovelties: PayrollNovelty[] = [
    { id: 1, employeeId: 4, type: 'Comisión', date: '2025-09-30', amount: 500000, description: 'Comisión por cierre de venta cliente X', status: 'Procesada' },
    { id: 2, employeeId: 1, type: 'Licencia no Remunerada', date: '2025-10-20', amount: 0, description: 'Solicitud por asunto personal', status: 'Pendiente' }
];

export const loans: Loan[] = [
    { id: 1, employeeId: 3, requestDate: '2024-01-15', amount: 2000000, installments: 12, paidAmount: 1500000, status: 'Activo' }
];

export const disciplinaryCases: DisciplinaryCase[] = [
    { id: 1, employeeId: 4, date: '2025-09-05', faultType: 'Leve', description: 'Llegada tarde reiterada sin justificación. Se realiza llamado de atención verbal.', status: 'Cerrado sin Sanción' }
];

export const securityIncidents: SecurityIncident[] = [
    { id: 1, type: 'Informático', date: '2025-08-10', description: 'El empleado reportó un correo electrónico sospechoso (phishing).', reportedBy: 1, status: 'Cerrado' }
];

export const offboardingProcesses: OffboardingProcess[] = [
    {
        id: 1, employeeId: 4, lastDay: '2025-11-15',
        tasks: [
            { id: 1, title: 'Realizar entrevista de salida', responsible: 'RRHH', completed: false },
            { id: 2, title: 'Devolución de activos (laptop, celular)', responsible: 'TI', completed: false },
            { id: 3, title: 'Firma de Paz y Salvo', responsible: 'Finanzas', completed: false },
        ]
    }
];

export const libraryResources: LibraryResource[] = [
    { id: 1, title: 'Manual de Convivencia Laboral', type: 'Manual', category: 'Convivencia', url: '#' },
    { id: 2, title: 'Política de Uso de Activos de TI', type: 'Política', category: 'Tecnología', url: '#' },
    { id: 3, title: 'Guía para solicitar vacaciones', type: 'Guía', category: 'Procedimientos', url: '#' },
    { id: 4, title: 'Video de Inducción Corporativa', type: 'Video', category: 'Onboarding', url: '#' },
];