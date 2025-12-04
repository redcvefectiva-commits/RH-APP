import React, { useRef, useEffect } from 'react';
import Card from '../ui/Card';
import { performanceReviews, employees } from '../../services/mockData';

declare const Chart: any;

const Performance: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const performanceCounts = performanceReviews.reduce((acc, review) => {
        const score = Math.round(review.overallScore);
        const key = score >= 4 ? 'Alto' : score >= 3 ? 'Medio' : 'Bajo';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
      
      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: Object.keys(performanceCounts),
          datasets: [{
            data: Object.values(performanceCounts),
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const getEmployeeName = (id: number) => employees.find(e => e.id === id)?.name || 'Desconocido';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <h3 className="text-xl font-semibold text-dark mb-4">Evaluaciones de Desempeño Recientes</h3>
          <div className="space-y-4">
            {performanceReviews.map(review => (
              <div key={review.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{getEmployeeName(review.employeeId)}</h4>
                  <span className="font-bold text-lg text-primary">{review.overallScore.toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{review.reviewDate}</p>
                <p className="text-sm text-gray-600">{review.comments}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <h3 className="text-xl font-semibold text-dark mb-4">Distribución del Desempeño</h3>
          <div className="h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Performance;
