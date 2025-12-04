import { OvertimeType } from '../types';
import * as PC from '../constants/payrollConstants';

export interface CalculationResult {
    fecha: string;
    tipoHora: OvertimeType;
    valorHoraBase: number;
    horas: number;
    porcentaje: string;
    total: number;
    norma: string;
}

const getFactor = (tipo: OvertimeType): number => {
    return PC.OVERTIME_FACTORS_MAP[tipo] || 1.0;
}

const getPorcentaje = (tipo: OvertimeType): string => {
    const factor = getFactor(tipo);
    // The factor is the final multiplier (e.g., 1.25 for +25%).
    // The percentage is the extra amount, so (factor - 1).
    if (factor > 1.0) {
        return `${((factor - 1) * 100).toFixed(0)}%`;
    }
    return `0%`; // No extra percentage for ordinary daytime hours
}

export function calculateOvertime(
    fechaServicio: string, 
    salarioMensual: number, 
    tipoHora: OvertimeType, 
    numHoras: number
): CalculationResult {
    const valorHoraBase = salarioMensual / PC.HORAS_MES_ESTANDAR;
    const factor = getFactor(tipoHora);
    const total = valorHoraBase * factor * numHoras;

    return {
        fecha: fechaServicio,
        tipoHora: tipoHora,
        valorHoraBase: valorHoraBase,
        horas: numHoras,
        porcentaje: getPorcentaje(tipoHora),
        total: total,
        norma: `Cálculo con base en ${PC.HORAS_MES_ESTANDAR} horas/mes.`
    };
}

export const overtimeTypes: { value: OvertimeType; label: string }[] = [
    { value: 'extra_diurna', label: 'Extra Diurna (1.25x)' },
    { value: 'extra_nocturna', label: 'Extra Nocturna (1.75x)' },
    { value: 'ordinaria_nocturna', label: 'Recargo Nocturno (0.35x)' },
    { value: 'extra_diurna_dominical', label: 'Extra Diurna Dominical (2.00x)' },
    { value: 'extra_nocturna_dominical', label: 'Extra Nocturna Dominical (2.50x)' },
    { value: 'dominical_diurna', label: 'Recargo Dominical Diurno (0.75x)'},
    { value: 'dominical_nocturna', label: 'Recargo Dominical Nocturno (1.10x)'}
];
