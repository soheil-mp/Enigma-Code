import { Line } from 'react-chartjs-2';

export default function ProgressChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Activity',
      data: [12, 19, 3, 5, 2, 3, 7],
      fill: false,
      borderColor: '#6366F1',
      tension: 0.4
    }]
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
} 