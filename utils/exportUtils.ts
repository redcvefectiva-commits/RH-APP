export const exportDataToXLS = (data: any[], headers: {label: string, key: string}[], filename: string) => {
    let tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset='UTF-8'><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Reporte</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
            table, th, td { border: 1px solid black; border-collapse: collapse; }
            th { background-color: #f2f2f2; font-weight: bold; }
        </style>
        </head><body><table>
        <thead>
            <tr>
               ${headers.map(h => `<th>${h.label}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(row => {
        tableHtml += '<tr>';
        headers.forEach(header => {
            const value = row[header.key] ?? '';
            tableHtml += `<td>${value}</td>`;
        });
        tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table></body></html>';
    
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
