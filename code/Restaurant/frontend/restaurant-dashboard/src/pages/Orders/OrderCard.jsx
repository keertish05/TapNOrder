import axios from "axios";

export default function OrderCard({ order, showPayButton, refetch }) {

  const markAsPaid = async () => {
    try {
      await axios.patch(`/api/v1/order/${order._id}/payment`, {
        paymentStatus: "Paid",
      });
      refetch(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">
      <div className="flex justify-between">
        <p className="font-semibold">Table: {order.tableNumber}</p>
        <p className="text-sm">{order.paymentMethod}</p>
      </div>

      <p>Status: 
        <span className="ml-1 font-medium">{order.paymentStatus}</span>
      </p>

      <p className="text-sm text-gray-600">
        Items: {order.items.length}
      </p>

      {showPayButton &&
        order.paymentMethod === "Cash" &&
        order.paymentStatus === "Pending" && (
          <button
            onClick={markAsPaid}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Mark as Paid
          </button>
        )}
    </div>
  );
}
