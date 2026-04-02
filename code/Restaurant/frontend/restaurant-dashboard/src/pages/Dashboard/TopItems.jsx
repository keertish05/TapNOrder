import { useGetTopItemsQuery } from '../../services/dashboardApi';

export default function TopItems() {
  const { data, isLoading, error } = useGetTopItemsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load top items</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Top Selling Items</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.name}
            className="flex justify-between border-b pb-1"
          >
            <span>{item.name}</span>
            <span className="font-medium">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
