// utils/numberToWords.ts

function Unidades(num: number): string {
    switch(num) {
        case 1: return 'UN';
        case 2: return 'DOS';
        case 3: return 'TRES';
        case 4: return 'CUATRO';
        case 5: return 'CINCO';
        case 6: return 'SEIS';
        case 7: return 'SIETE';
        case 8: return 'OCHO';
        case 9: return 'NUEVE';
    }
    return '';
}

function Decenas(num: number): string {
    const decena = Math.floor(num/10);
    const unidad = num - (decena * 10);
    switch(decena) {
        case 1:
            switch(unidad) {
                case 0: return 'DIEZ';
                case 1: return 'ONCE';
                case 2: return 'DOCE';
                case 3: return 'TRECE';
                case 4: return 'CATORCE';
                case 5: return 'QUINCE';
                default: return 'DIECI' + Unidades(unidad);
            }
        case 2:
            return unidad === 0 ? 'VEINTE' : 'VEINTI' + Unidades(unidad);
        case 3: return 'TREINTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 4: return 'CUARENTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 5: return 'CINCUENTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 6: return 'SESENTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 7: return 'SETENTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 8: return 'OCHENTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 9: return 'NOVENTA' + (unidad > 0 ? ' Y ' + Unidades(unidad) : '');
        case 0: return Unidades(unidad);
    }
    return '';
}

function Centenas(num: number): string {
    const centenas = Math.floor(num / 100);
    const decenas = num - (centenas * 100);
    switch(centenas) {
        case 1:
            if (decenas > 0) return 'CIENTO ' + Decenas(decenas);
            return 'CIEN';
        case 2: return 'DOSCIENTOS ' + Decenas(decenas);
        case 3: return 'TRESCIENTOS ' + Decenas(decenas);
        case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
        case 5: return 'QUINIENTOS ' + Decenas(decenas);
        case 6: return 'SEISCIENTOS ' + Decenas(decenas);
        case 7: return 'SETECIENTOS ' + Decenas(decenas);
        case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
        case 9: return 'NOVECIENTOS ' + Decenas(decenas);
    }
    return Decenas(decenas);
}

function Seccion(num: number, divisor: number, strSingular: string, strPlural: string): string {
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);
    let letras = '';
    if (cientos > 0) {
        if (cientos > 1) letras = Centenas(cientos) + ' ' + strPlural;
        else letras = strSingular;
    }
    if (resto > 0) {
        letras += ' ' + Millares(resto);
    }
    return letras;
}

function Millares(num: number): string {
    const divisor = 1000;
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);
    let strMillares = Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = Centenas(resto);
    if(strMillares === '') return strCentenas;
    return (strMillares + ' ' + strCentenas).trim();
}

function Millones(num: number): string {
    const divisor = 1000000;
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);
    let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMillares = Millares(resto);
    if(strMillones === '') return strMillares;
    return (strMillones + ' ' + strMillares).trim();
}

export function numberToWords(num: number): string {
    const data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: 'PESOS',
        letrasMonedaSingular: 'PESO',
    };

    if (data.centavos > 0) {
        data.letrasCentavos = 'CON ' + data.centavos + '/100';
    }

    if(data.enteros === 0) return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros === 1) return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
}