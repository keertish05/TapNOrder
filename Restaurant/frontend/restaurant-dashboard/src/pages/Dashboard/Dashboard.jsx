import StatCards from './StatCards';
import OrdersTrend from './OrdersTrend';
import OrdersByHour from './OrdersByHour';
import TopItems from './TopItems';

export default function Dashboard() {
  return (
    <div className="w-full p-6 space-y-6 bg-gray-50">
        <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <span>Date Range</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <span>Generate Report</span>
          </button>
        </div>
      </div>
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersTrend />
        <OrdersByHour />
      </div>

      <TopItems />
    </div>
  );
}
