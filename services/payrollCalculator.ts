import { Employee, Payslip, PayrollNovelty, PayrollConcept, PayrollConfig } from '../types';
import * as PC from '../constants/payrollConstants';
import { calculateOvertime } from './overtimeCalculator';
import { numberToWords } from '../utils/numberToWords';

interface GeneratePayslipInput {
  employee: Employee;
  period: 'monthly' | 'bi-weekly';
  novelties: PayrollNovelty[];
  payrollConfig: PayrollConfig;
}

const DAYS_IN_MONTH = 30;

export const generatePayslip = ({ employee, period, novelties, payrollConfig }: GeneratePayslipInput): Payslip => {
  const { smlv, auxTransporte, arlRisk } = payrollConfig;
  const concepts: PayrollConcept[] = [];
  
  const daysInPeriod = period === 'monthly' ? DAYS_IN_MONTH : 15;

  const unpaidLeaveDays = novelties
    .filter(n => n.type === 'Licencia no Remunerada' || n.type === 'Descuento Sanción')
    .reduce((sum, n) => sum + (n.days || 0), 0);
  
  const workedDays = Math.max(0, daysInPeriod - unpaidLeaveDays);

  // --- 1. DEVENGOS (EARNINGS) ---
  const salarioBasicoMensual = employee.salarioBasicoPrestacional;
  const sueldoTrabajado = (salarioBasicoMensual / DAYS_IN_MONTH) * workedDays;
  concepts.push({ type: 'devengo', name: `Salario Días Trabajados (${workedDays} días)`, value: sueldoTrabajado, isPrestacional: true });

  // Handle integral salary
  const isIntegral = salarioBasicoMensual >= (smlv * 10); // Simplified check
  if (isIntegral) {
      concepts.push({ type: 'devengo', name: 'Factor Prestacional (Sal. Integral)', value: salarioBasicoMensual * 0.3, isPrestacional: true });
  }

  // Handle novelties
  novelties.forEach(n => {
    switch (n.type) {
      case 'Hora Extra':
        if (n.hours && n.overtimeType) {
            const overtimeCalc = calculateOvertime(n.date, salarioBasicoMensual, n.overtimeType, n.hours);
            concepts.push({ type: 'devengo', name: `Horas Extras (${n.description})`, value: overtimeCalc.total, isPrestacional: true });
        }
        break;
      case 'Vacaciones Disfrutadas':
        if (n.days) {
            // Using user's exact formula: (salario_basico * 0.0417 * dias_vacaciones) / 30
            const vacationPay = (salarioBasicoMensual * PC.PROVISIONES.VACACIONES * n.days) / DAYS_IN_MONTH;
            concepts.push({ type: 'devengo', name: `Vacaciones Disfrutadas (${n.days} días)`, value: vacationPay, isPrestacional: true });
        }
        break;
       case 'Vacaciones Compensadas':
        if (n.days) {
            const vacationPay = (salarioBasicoMensual * PC.PROVISIONES.VACACIONES * n.days) / DAYS_IN_MONTH;
            concepts.push({ type: 'devengo', name: `Vacaciones Compensadas (${n.days} días)`, value: vacationPay, isPrestacional: true });
        }
        break;
      case 'Licencia Remunerada':
        if (n.days) {
            const pay = (salarioBasicoMensual / DAYS_IN_MONTH) * n.days;
            concepts.push({ type: 'devengo', name: `Licencia Remunerada (${n.days} días)`, value: pay, isPrestacional: true });
        }
        break;
      case 'Incapacidad':
        if (n.amount) {
            // Incapacity pay is considered an earning, and the days reduce worked days base salary.
            concepts.push({ type: 'devengo', name: `Incapacidad (${n.days || 0} días)`, value: n.amount, isPrestacional: false });
        }
        break;
      case 'Comisión':
      case 'Bonificación':
      case 'Viáticos':
      case 'Otro Ingreso Prestacional':
        concepts.push({ type: 'devengo', name: n.description || n.type, value: n.amount || 0, isPrestacional: true });
        break;
      case 'Otro Ingreso No Prestacional':
         concepts.push({ type: 'devengo', name: n.description || n.type, value: n.amount || 0, isPrestacional: false });
        break;
    }
  });

  const recibeAuxTransporte = salarioBasicoMensual <= (smlv * PC.TOPES.MAX_SMLV_AUXILIO_TRANSPORTE);
  const auxilioTransporteValue = recibeAuxTransporte ? (auxTransporte / DAYS_IN_MONTH) * workedDays : 0;
  if (auxilioTransporteValue > 0) {
    concepts.push({ type: 'devengo', name: 'Auxilio de Transporte', value: auxilioTransporteValue, isPrestacional: false });
  }

  // --- IBC & TOTALS ---
  const totalDevengos = concepts.filter(c => c.type === 'devengo').reduce((sum, c) => sum + c.value, 0);
  
  // IBC is calculated based on salary-based earnings (isPrestacional = true)
  // IBC does not include transport aid for SS calculation.
  let ibc = concepts
    .filter(c => c.type === 'devengo' && c.isPrestacional)
    .reduce((sum, c) => sum + c.value, 0);

  const proportionalSMLV = smlv * (workedDays / DAYS_IN_MONTH);
  ibc = Math.max(ibc, proportionalSMLV);
  ibc = Math.min(ibc, smlv * PC.TOPES.MAX_SMLV_COTIZACION_SS);

  // For integral salary, IBC is 70% of the total
  const ibcBase = isIntegral ? salarioBasicoMensual * 0.7 : ibc;

  // --- 2. DEDUCCIONES (DEDUCTIONS) ---
  const aporteSalud = ibcBase * PC.APORTES.SALUD_EMPLEADO;
  const aportePension = ibcBase * PC.APORTES.PENSION_EMPLEADO;
  concepts.push({ type: 'deduccion', name: 'Salud (4%)', value: aporteSalud });
  concepts.push({ type: 'deduccion', name: 'Pensión (4%)', value: aportePension });

  if (ibcBase >= smlv * PC.TOPES.MIN_SMLV_FONDO_SOLIDARIDAD) {
      concepts.push({ type: 'deduccion', name: 'Fondo Solidaridad Pensional (1%)', value: ibcBase * PC.APORTES.FONDO_SOLIDARIDAD_PENSIONAL });
  }

  novelties.forEach(n => {
    if (n.type.startsWith('Descuento') || n.type === 'Retención en la Fuente' || n.type === 'Otro Descuento') {
      concepts.push({ type: 'deduccion', name: n.description || n.type, value: n.amount || 0 });
    }
  });

  const totalDeducciones = concepts.filter(c => c.type === 'deduccion').reduce((sum, c) => sum + c.value, 0);
  const netoAPagar = totalDevengos - totalDeducciones;

  // --- 3. PROVISIONES Y PARAFISCALES (EMPLOYER COSTS) ---
  const baseProvisiones = ibc + (recibeAuxTransporte ? auxilioTransporteValue : 0); 
  
  concepts.push({ type: 'provision', name: 'Cesantías (8.33%)', value: baseProvisiones * PC.PROVISIONES.CESANTIAS });
  concepts.push({ type: 'provision', name: 'Intereses s/ Cesantías (1% mensual)', value: (baseProvisiones * PC.PROVISIONES.CESANTIAS) * 0.01 });
  concepts.push({ type: 'provision', name: 'Prima de Servicios (8.33%)', value: baseProvisiones * PC.PROVISIONES.PRIMA_SERVICIOS });
  concepts.push({ type: 'provision', name: 'Vacaciones (4.17%)', value: (sueldoTrabajado) * PC.PROVISIONES.VACACIONES });
  
  const exoneradoParafiscales = salarioBasicoMensual >= (smlv * PC.TOPES.MIN_SMLV_EXONERACION_PARAFISCALES);

  if (!exoneradoParafiscales) {
      concepts.push({ type: 'provision', name: 'SENA (2%)', value: ibcBase * PC.APORTES.SENA });
      concepts.push({ type: 'provision', name: 'ICBF (3%)', value: ibcBase * PC.APORTES.ICBF });
  }
  concepts.push({ type: 'provision', name: 'Caja de Compensación (4%)', value: ibcBase * PC.APORTES.CAJA_COMPENSACION });

  concepts.push({ type: 'provision', name: 'Salud Empresa (8.5%)', value: exoneradoParafiscales ? 0 : ibcBase * PC.APORTES.SALUD_EMPRESA });
  concepts.push({ type: 'provision', name: 'Pensión Empresa (12%)', value: ibcBase * PC.APORTES.PENSION_EMPRESA });
  const arlPercentage = PC.APORTES.RIESGOS_LABORALES[arlRisk];
  concepts.push({ type: 'provision', name: `ARL (Riesgo ${arlRisk})`, value: ibcBase * arlPercentage });

  return {
    employee,
    period,
    workedDays,
    totalDevengos,
    totalDeducciones,
    netoAPagar,
    netoAPagarEnLetras: numberToWords(netoAPagar),
    concepts,
  };
};