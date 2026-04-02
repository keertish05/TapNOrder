import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetOrdersTrendQuery } from '../../services/dashboardApi';

export default function OrdersTrend() {
  const { data, isLoading, error } = useGetOrdersTrendQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load orders trend</p>;

  const chartData = data || [];

  return (
    <div className="bg-white p-4 rounded-xl shadow h-64">
      <h2 className="font-semibold mb-4">Orders Trend</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
