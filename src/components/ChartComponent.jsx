import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const barChartInstance = useRef(null);
  const lineChartInstance = useRef(null);
  const pieChartInstance = useRef(null);

  useEffect(() => {
    // Destruir gráficos existentes si los hay
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (lineChartInstance.current) lineChartInstance.current.destroy();
    if (pieChartInstance.current) pieChartInstance.current.destroy();

    // Gráfico de Barras
    const barCtx = barChartRef.current.getContext('2d');
    barChartInstance.current = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Libros Prestados',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de Líneas
    const lineCtx = lineChartRef.current.getContext('2d');
    lineChartInstance.current = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Usuarios Registrados',
          data: [15, 10, 25, 30, 22, 18],
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de Pasteles
    const pieCtx = pieChartRef.current.getContext('2d');
    pieChartInstance.current = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Ficción', 'No Ficción', 'Ciencia', 'Historia', 'Biografías'],
        datasets: [{
          label: 'Categorías de Libros',
          data: [30, 20, 15, 25, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });

    // Limpiar gráficos al desmontar el componente
    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      if (pieChartInstance.current) pieChartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Libros Prestados</h2>
        <canvas ref={barChartRef} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Usuarios Registrados</h2>
        <canvas ref={lineChartRef} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Categorías de Libros</h2>
        <canvas ref={pieChartRef} />
      </div>
    </div>
  );
};

export default ChartComponent;
