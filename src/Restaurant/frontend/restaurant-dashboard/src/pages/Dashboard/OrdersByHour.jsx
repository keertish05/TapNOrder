import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetOrdersByHourQuery } from '../../services/dashboardApi';

export default function OrdersByHour() {
  const { data, isLoading, error } = useGetOrdersByHourQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load peak hours</p>;

  const chartData = data || [];

  return (
    <div className="bg-white p-4 rounded-xl shadow h-64">
      <h2 className="font-semibold mb-4">Peak Hours</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
