import React, { useEffect, useState } from 'react';
import  LiveOrderStatus , { OrderStep } from '../components/LiveOrderStatus';
import {
  Receipt,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  itemTotal: number;
  _id: string;
}

interface OrderData {
  _id: string;
  restaurantId: string;
  clientOrderId: string;
  tableNumber: string;
  orderNumber: number;
  orderDate: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  placedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  data: OrderData;
  success: boolean;
  message: string;
}

const MyOrders: React.FC = () => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const [orderStatus, setOrderStatus] = useState<OrderStep>('preparing');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        // In a real app, you might get clientOrderId from URL params or user input
        // For demo, using the sample ID from your data
        const clientOrderId = '1775972563295';
        const response = await fetch(
          `http://localhost:4003/api/v1/order/by-client-order-id?clientOrderId=${clientOrderId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data) {
          setOrder(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch order');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  console.log("Order State:", order);

  const Info = ({ label, value }: any) => (
  <div>
    <p className="text-xs opacity-50">{label}</p>
    <p className="font-semibold" style={{ color: "#2D2D2D" }}>{value}</p>
  </div>
);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Order</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No order found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 px-6" style={{ background: "#FDFCF0" }}>
    <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tight" style={{ color: "#2D2D2D" }}>
            My Order
        </h1>
        <p className="text-sm mt-2 opacity-60">Track your delicious order</p>
        </div>
        
        <LiveOrderStatus status={orderStatus} estimatedTime={12} />

        <h1 className="text-4xl font-black tracking-tight pb-6" style={{ color: "#2D2D2D" }}>
            Order Details
        </h1>
        {/* Order Card */}
        <div className="rounded-3xl shadow-xl overflow-hidden" style={{ background: "#FFFFFF" }}>

        {/* Top Banner */}
        <div
            className="px-6 py-5 flex justify-between items-center"
            style={{ background: "#D32F2F", color: "white" }}
        >
            <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>

            <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs bg-yellow-200 text-yellow-800">
                {order.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-green-200 text-green-800">
                {order.paymentStatus}
            </span>
            </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 text-sm">
            <Info label="Order ID" value={order.clientOrderId} />
            <Info label="Table" value={order.tableNumber} />
            <Info label="Payment" value={order.paymentMethod} />
            <Info label="Date" value={new Date(order.orderDate).toLocaleDateString()} />
        </div>

        {/* Items */}
        <div className="px-6 pb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: "#2D2D2D" }}>
            Order Items
            </h3>

            <div className="space-y-4">
            {order.items.map((item) => (
                <div
                key={item._id}
                className="flex items-center gap-4 p-4 rounded-2xl border"
                style={{ borderColor: "#eee" }}
                >
                {/* IMAGE */}
                <img
                    src={item.Image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1">
                    <h4 className="font-bold" style={{ color: "#2D2D2D" }}>
                    {item.name}
                    </h4>
                    <p className="text-xs opacity-60">
                    ₹{item.price} × {item.quantity}
                    </p>
                </div>

                {/* TOTAL */}
                <div className="text-right">
                    <p className="font-bold" style={{ color: "#D32F2F" }}>
                    ₹{item.itemTotal}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* TOTAL */}
        <div className="px-6 py-5 border-t flex justify-between items-center">
            <span className="font-semibold text-gray-600">Total Amount</span>
            <span className="text-2xl font-black" style={{ color: "#D32F2F" }}>
            ₹{order.totalAmount}
            </span>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 text-xs flex justify-between opacity-60">
            <span>Placed: {new Date(order.placedAt).toLocaleString()}</span>
            <span>ID: {order._id.slice(-10)}</span>
        </div>
        </div>

        {/* Support */}
        <div className="text-center mt-6 text-sm opacity-70">
        Need help?{" "}
        <span style={{ color: "#D32F2F" }} className="font-semibold cursor-pointer">
            Contact Support
        </span>
        </div>
    </div>
    </div>
  );
};

export default MyOrders;