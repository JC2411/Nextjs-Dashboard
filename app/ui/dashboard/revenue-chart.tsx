// app/ui/dashboard/revenue-chart.tsx
'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Revenue } from '@/app/lib/definitions';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function RevenueChart() {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch through API route to avoid direct DB access from client
        const response = await fetch('/api/revenue');
        const data = await response.json();
        setRevenue(data);
      } catch (error) {
        console.error('Failed to fetch revenue:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="h-[350px] bg-gray-100 rounded-lg animate-pulse" />;
  }

  if (!revenue.length) {
    return <div className="h-[350px] flex items-center justify-center">No revenue data available</div>;
  }

  const chartData = {
    labels: revenue.map((r: Revenue) => r.month),
    datasets: [{
      label: 'Revenue',
      data: revenue.map((r: Revenue) => r.revenue),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.3
    }]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow h-[350px]">
      <Line 
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Revenue Over Time' }
          }
        }}
      />
    </div>
  );
}