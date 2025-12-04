// constants/payrollConstants.ts
// Values for Colombian payroll calculations for the year 2025.
// These are illustrative and should be updated annually with official values.

// Salarios y Auxilios
export const SMLV_2025 = 1480000;
export const AUXILIO_TRANSPORTE_2025 = 175000;
export const SALARIO_INTEGRAL_MINIMO_LEGAL = SMLV_2025 * 10 + (SMLV_2025 * 10 * 0.3); // 10 SMLV + 30% factor prestacional

// Unidades y Horas
export const UVT_2025 = 47065; // Using 2024 value as placeholder for 2025
export const HORAS_MES_ESTANDAR = 240; // 30 days * 8 hours

// Porcentajes Aportes a Seguridad Social y Parafiscales
export const APORTES = {
    SALUD_EMPLEADO: 0.04,
    SALUD_EMPRESA: 0.085,
    PENSION_EMPLEADO: 0.04,
    PENSION_EMPRESA: 0.12,
    RIESGOS_LABORALES: { // ARL por clase de riesgo (porcentaje sobre IBC)
        1: 0.00522,
        2: 0.01044,
        3: 0.02436,
        4: 0.04350,
        5: 0.06960,
    },
    CAJA_COMPENSACION: 0.04,
    ICBF: 0.03,
    SENA: 0.02,
    FONDO_SOLIDARIDAD_PENSIONAL: 0.01, // Para salarios >= 4 SMLV
};

// Porcentajes Provisiones de Prestaciones Sociales
export const PROVISIONES = {
    CESANTIAS: 0.0833, // 1/12
    INTERESES_CESANTIAS: 0.12, // 12% anual sobre el saldo de cesantías
    PRIMA_SERVICIOS: 0.0833, // 1/12
    VACACIONES: 0.0417, // 15 días por año -> (15/360)
};

// Factores para Horas Extra y Recargos
export const FACTORES_HORAS_EXTRA = {
    EXTRA_DIURNA: 1.25,
    EXTRA_NOCTURNA: 1.75,
    RECARGO_NOCTURNO: 0.35,
    RECARGO_DOMINICAL_FESTIVO_DIURNO: 1.75, // 100% base + 75% recargo
    RECARGO_DOMINICAL_FESTIVO_NOCTURNO: 2.10, // 100% base + 75% recargo + 35% recargo
    EXTRA_DIURNA_DOMINICAL_FESTIVO: 2.00, // 100% base + 75% recargo + 25% extra
    EXTRA_NOCTURNA_DOMINICAL_FESTIVO: 2.50, // 100% base + 75% recargo + 75% extra
};

// Topes Legales
export const TOPES = {
    MAX_SMLV_AUXILIO_TRANSPORTE: 2,
    MIN_SMLV_FONDO_SOLIDARIDAD: 4,
    MAX_SMLV_COTIZACION_SS: 25,
    MIN_SMLV_EXONERACION_PARAFISCALES: 10,
};

// Mapeo de factores completos para cada tipo de hora extra/recargo
export const OVERTIME_FACTORS_MAP = {
    'ordinaria_diurna': 1.0,
    'ordinaria_nocturna': 1.0 + FACTORES_HORAS_EXTRA.RECARGO_NOCTURNO, // 1.35
    'extra_diurna': FACTORES_HORAS_EXTRA.EXTRA_DIURNA, // 1.25
    'extra_nocturna': FACTORES_HORAS_EXTRA.EXTRA_NOCTURNA, // 1.75
    'dominical_diurna': FACTORES_HORAS_EXTRA.RECARGO_DOMINICAL_FESTIVO_DIURNO, // 1.75
    'dominical_nocturna': FACTORES_HORAS_EXTRA.RECARGO_DOMINICAL_FESTIVO_NOCTURNO, // 2.10
    'extra_diurna_dominical': FACTORES_HORAS_EXTRA.EXTRA_DIURNA_DOMINICAL_FESTIVO, // 2.00
    'extra_nocturna_dominical': FACTORES_HORAS_EXTRA.EXTRA_NOCTURNA_DOMINICAL_FESTIVO, // 2.50
};
