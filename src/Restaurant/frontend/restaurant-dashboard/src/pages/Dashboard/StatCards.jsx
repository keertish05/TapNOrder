import { useGetDashboardStatsQuery } from '../../services/dashboardApi';

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default function StatCards() {
  const { data, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) return <p>Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Total Orders" value={data.totalOrders} />
      <Card title="Orders Today" value={data.ordersToday} />
      <Card title="This Month" value={data.thisMonth} />
      <Card title="Revenue" value={`₹${data.revenue}`} />
    </div>
  );
}
