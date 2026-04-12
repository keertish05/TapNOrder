import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4003");

const WaiterDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]); 

  // 🔥 SOCKET LISTENER
  useEffect(() => {
    socket.on("orderCreated", (order) => {
      console.log("New Order:", order);
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on("serviceRequest", (req) => {
      setRequests((prev) => [req, ...prev]);
    });

    socket.on("serviceRequestUpdated", (updated) => {
      setRequests((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    });

    return () => {
      socket.off("orderCreated");
      socket.off("orderUpdated");
      socket.off("serviceRequest");
      socket.off("serviceRequestUpdated");
    };
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:4003/api/v1/order/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const completeRequest = async (id) => {
    try {
      await fetch(`http://localhost:4003/api/v1/service-request/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "#FDFCF0" }}>
      {/* HEADER */}
      <h1
        className="text-3xl font-black mb-6"
        style={{ color: "#2D2D2D" }}
      >
        Waiter Dashboard 🍽️
      </h1>

      {/* 🔔 SERVICE REQUESTS */}
        <div className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "#2D2D2D" }}
          >
            Service Requests 🔔
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="p-4 rounded-2xl shadow"
                style={{ background: "#FFFFFF" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold">
                    Table {req.tableNumber}
                  </p>

                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background:
                        req.status === "Pending"
                          ? "#FF8F00"
                          : "#4CAF50",
                      color: "white",
                    }}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-sm mb-3 capitalize">
                  {req.type}
                </p>

                {/* COMPLETE BUTTON */}
                {req.status === "Pending" && (
                  <button
                    onClick={() => completeRequest(req._id)}
                    className="w-full py-2 text-xs rounded-xl font-semibold"
                    style={{
                      background: "#D32F2F",
                      color: "white",
                    }}
                  >
                    Mark Done
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>


      {/* ORDERS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-3xl shadow-lg p-5"
            style={{ background: "#FFFFFF" }}
          >
            {/* TOP */}
            <div className="flex justify-between mb-3">
              <h2 className="font-bold" style={{ color: "#2D2D2D" }}>
                Order #{order.orderNumber}
              </h2>

              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "#FF8F00",
                  color: "white",
                }}
              >
                {order.status}
              </span>
            </div>

            <p className="text-sm opacity-60 mb-4">
              Table: {order.tableNumber}
            </p>

            {/* ITEMS */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-3 items-center">
                  
                  {/* IMAGE */}
                  <img
                    src={
                      item.Image
                        ? item.Image.replace("http://", "https://")
                        : "/fallback-food.png"
                    }
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs opacity-60">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  {/* PRICE */}
                  <p
                    className="font-bold"
                    style={{ color: "#D32F2F" }}
                  >
                    ₹{item.itemTotal}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between mt-4 border-t pt-3">
              <span className="text-sm">Total</span>
              <span
                className="font-bold"
                style={{ color: "#D32F2F" }}
              >
                ₹{order.totalAmount}
              </span>
            </div>

            {/* STATUS BUTTONS */}
            <div className="flex gap-2 mt-4">
              {["Preparing", "Ready", "Served"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(order._id, status)}
                  className="flex-1 text-xs py-2 rounded-xl font-semibold"
                  style={{
                    background:
                      order.status === status ? "#D32F2F" : "#eee",
                    color:
                      order.status === status ? "white" : "#2D2D2D",
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaiterDashboard;