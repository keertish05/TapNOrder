export default function MenuCard({ item }) {
  return (
    <div className="border rounded-2xl p-4 space-y-3 hover:shadow-md transition">
      <div className="bg-gray-100 rounded-xl h-36 flex items-center justify-center">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-28 object-contain"
        />
      </div>

      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-orange-600 font-medium">₹{item.price}</p>
      </div>

      <div className="text-sm text-gray-500">
        <div>{item.orderCount} Orders</div>
        <div>Added on {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-lg border hover:bg-gray-100">
          Edit
        </button>
        <button className="flex-1 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
          Disable
        </button>
      </div>
    </div>
  );
}
