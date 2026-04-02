import OrderCard from "./OrderCard";

export default function OrderSection({ title, orders, showPayButton, refetch }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              showPayButton={showPayButton}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
