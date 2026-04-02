import OrderSection from "./OrderSection";
import { useOrders } from "./hooks/useOrders";

export default function Order() {
  const { orders, loading, refetch } = useOrders();

  if (loading) return <p>Loading orders...</p>;

  const orderComing = orders.filter((o) =>
    (o.paymentMethod === "Cash" && o.paymentStatus === "Pending") ||
    (o.paymentMethod === "Online" && o.paymentStatus === "Paid")
  );

  const pendingOrders = orders.filter(
    (o) => o.paymentMethod === "Online" && o.paymentStatus === "Pending"
  );

  return (
    <div className="p-6 space-y-10">
      <OrderSection
        title="Order Coming"
        orders={orderComing}
        showPayButton
        refetch={refetch}
      />

      <OrderSection
        title="Pending Payments"
        orders={pendingOrders}
      />
    </div>
  );
}
