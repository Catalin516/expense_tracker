import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function PlotPage({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const totalCount = Array.isArray(data) ? data.length : (data && Array.isArray(data.items) ? data.items.length : 0);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');

      // Distruggi il grafico precedente se esiste
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Prepara i dati per il grafico
      // Assumo che data sia un array di oggetti con proprietà x e y
      // Esempio: [{x: 1, y: 10}, {x: 2, y: 20}, ...]
      let labels = [];
      let values = [];

      labels = data.map((item, index) => item.x);
      values = data.map(item => item.y);

      // Crea il nuovo grafico
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Dati',
              data: values,
              borderColor: 'rgba(255, 111, 0, 1)',
              backgroundColor: 'rgba(219, 151, 34, 0.2)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: 'rgba(223, 162, 29, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#fff',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(219, 151, 34, 0.2)',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#aaa'
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#aaa'
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          }
        }
      });
    }

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  console.log(data);

  return (
    <div style={{
      padding: '3rem',
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '120px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        background: 'linear-gradient(180deg, #1f1f1f, #292929)',
        borderRadius: '16px',
        padding: '1.5rem',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <h2 style={{ marginTop: 0, marginBottom: 0 }}>Grafici e analisi</h2>
          <div
            style={{
              background: '#ff7f50',
              color: 'white',
              padding: '0.5rem 0.9rem',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
            }}
            title="Numero totale di spese"
          >
            Spese: {data.length}
          </div>
        </div>
        <div style={{
          marginTop: '1rem',
          height: '360px',
          borderRadius: '12px',
          background: 'linear-gradient(180deg, #242424, #1a1a1a)',
          padding: '1rem',
          position: 'relative'
        }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}