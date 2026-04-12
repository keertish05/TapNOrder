import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4003");

const WaiterDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'requests'
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [notifications, setNotifications] = useState({ orders: 0, requests: 0 });

  // 🔥 SOCKET LISTENER
  useEffect(() => {
    // 🔥 FETCH OLD ORDERS
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4003/api/v1/order/all");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    // 🔥 FETCH OLD SERVICE REQUESTS
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:4003/api/v1/service-request");
        const data = await res.json();
        setRequests(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
    fetchRequests();

    // 🔥 SOCKET LISTENERS
    socket.on("orderCreated", (order) => {
      setOrders((prev) => [order, ...prev]);
      setNotifications((prev) => ({ ...prev, orders: prev.orders + 1 }));
      setTimeout(() => setNotifications((prev) => ({ ...prev, orders: 0 })), 3000);
    });

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on("serviceRequest", (req) => {
      setRequests((prev) => [req, ...prev]);
      setNotifications((prev) => ({ ...prev, requests: prev.requests + 1 }));
      setTimeout(() => setNotifications((prev) => ({ ...prev, requests: 0 })), 3000);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 COMPLETE REQUEST
  const completeRequest = async (id) => {
    try {
      await fetch(`http://localhost:4003/api/v1/service-request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Stats
  const pendingRequests = requests.filter((r) => r.status === "Pending").length;
  const activeOrders = orders.filter((o) => o.status !== "Served").length;
  const readyOrders = orders.filter((o) => o.status === "Ready").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing": return "#F57C00";
      case "Ready": return "#0288D1";
      case "Served": return "#4CAF50";
      default: return "#FF8F00";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Preparing": return "#FFF3E0";
      case "Ready": return "#E3F2FD";
      case "Served": return "#E8F5E9";
      default: return "#FFF8E1";
    }
  };

  return (
    <div style={{ background: "#FDFCF0", minHeight: "100vh" }}>
      {/* TOP BAR with stats */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EAE8DD",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#D32F2F",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                🍽️
              </div>
              <div>
                <h1 style={{ color: "#2D2D2D", fontSize: "24px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                  Waiter Dashboard
                </h1>
                <p style={{ color: "#6B6B6B", fontSize: "13px", marginTop: "2px" }}>Real-time orders & service requests</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ textAlign: "center", background: "#FDFCF0", padding: "8px 16px", borderRadius: "16px" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#D32F2F" }}>{activeOrders}</div>
                <div style={{ fontSize: "11px", color: "#6B6B6B" }}>Active Orders</div>
              </div>
              <div style={{ textAlign: "center", background: "#FDFCF0", padding: "8px 16px", borderRadius: "16px" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#FF8F00" }}>{readyOrders}</div>
                <div style={{ fontSize: "11px", color: "#6B6B6B" }}>Ready to Serve</div>
              </div>
              <div style={{ textAlign: "center", background: "#FDFCF0", padding: "8px 16px", borderRadius: "16px", position: "relative" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#D32F2F" }}>{pendingRequests}</div>
                <div style={{ fontSize: "11px", color: "#6B6B6B" }}>Requests 🔔</div>
                {notifications.requests > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "#D32F2F",
                      color: "white",
                      fontSize: "10px",
                      borderRadius: "10px",
                      padding: "2px 6px",
                      fontWeight: "bold",
                    }}
                  >
                    {notifications.requests}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: "flex", gap: "8px", marginTop: "20px", borderBottom: "2px solid #EAE8DD" }}>
            <button
              onClick={() => setActiveTab("orders")}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                color: activeTab === "orders" ? "#D32F2F" : "#6B6B6B",
                borderBottom: activeTab === "orders" ? "2px solid #D32F2F" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              📋 Orders
              {notifications.orders > 0 && activeTab !== "orders" && (
                <span style={{ marginLeft: "8px", background: "#D32F2F", color: "white", padding: "2px 6px", borderRadius: "10px", fontSize: "10px" }}>
                  {notifications.orders}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                color: activeTab === "requests" ? "#D32F2F" : "#6B6B6B",
                borderBottom: activeTab === "requests" ? "2px solid #D32F2F" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              🔔 Service Requests
              {pendingRequests > 0 && (
                <span style={{ marginLeft: "8px", background: "#D32F2F", color: "white", padding: "2px 6px", borderRadius: "10px", fontSize: "10px" }}>
                  {pendingRequests}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        {activeTab === "requests" ? (
          // ==================== SERVICE REQUESTS SECTION ====================
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ color: "#2D2D2D", fontSize: "20px", fontWeight: "700" }}>🔔 Active Service Requests</h2>
              <span style={{ background: "#FF8F00", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
                {pendingRequests} pending
              </span>
            </div>

            {requests.filter(r => r.status !== "Completed").length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", background: "#FFFFFF", borderRadius: "24px" }}>
                <span style={{ fontSize: "48px" }}>✅</span>
                <p style={{ color: "#6B6B6B", marginTop: "12px" }}>No active requests. Great service! 🎉</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {requests
                  .filter((req) => req.status !== "Completed")
                  .map((req) => (
                    <div
                      key={req._id}
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "20px",
                        padding: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                        border: "1px solid #F0EFE5",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            background: "#FFF3E0",
                            borderRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                          }}
                        >
                          {req.type === "Bill request" ? "💰" : "🔔"}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: "800", fontSize: "18px", color: "#2D2D2D" }}>Table {req.tableNumber}</span>
                            <span
                              style={{
                                background: req.status === "Pending" ? "#FF8F00" : "#4CAF50",
                                color: "white",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "600",
                              }}
                            >
                              {req.status}
                            </span>
                          </div>
                          <p style={{ color: "#6B6B6B", fontSize: "14px", marginTop: "6px", textTransform: "capitalize" }}>{req.type}</p>
                        </div>
                      </div>
                      {req.status === "Pending" && (
                        <button
                          onClick={() => completeRequest(req._id)}
                          style={{
                            background: "#D32F2F",
                            color: "white",
                            border: "none",
                            padding: "10px 24px",
                            borderRadius: "40px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "transform 0.1s, background 0.2s",
                          }}
                          onMouseEnter={(e) => (e.target.style.background = "#B71C1C")}
                          onMouseLeave={(e) => (e.target.style.background = "#D32F2F")}
                        >
                          ✓ Mark Done
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* Completed requests (collapsed) */}
            {requests.filter(r => r.status === "Completed").length > 0 && (
              <div style={{ marginTop: "32px" }}>
                <details style={{ cursor: "pointer" }}>
                  <summary style={{ color: "#6B6B6B", fontSize: "13px", fontWeight: "500", padding: "8px 0" }}>
                    📦 Completed requests ({requests.filter(r => r.status === "Completed").length})
                  </summary>
                  <div style={{ marginTop: "12px", display: "grid", gap: "12px" }}>
                    {requests
                      .filter((r) => r.status === "Completed")
                      .slice(0, 5)
                      .map((req) => (
                        <div key={req._id} style={{ background: "#F9F9F2", borderRadius: "16px", padding: "12px 16px", opacity: 0.7 }}>
                          <span style={{ fontWeight: "600" }}>Table {req.tableNumber}</span> - {req.type} ✅
                        </div>
                      ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        ) : (
          // ==================== ORDERS SECTION ====================
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ color: "#2D2D2D", fontSize: "20px", fontWeight: "700" }}>📋 Active Orders</h2>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ background: "#FFF3E0", color: "#F57C00", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                  Preparing: {orders.filter(o => o.status === "Preparing").length}
                </span>
                <span style={{ background: "#E3F2FD", color: "#0288D1", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                  Ready: {orders.filter(o => o.status === "Ready").length}
                </span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", background: "#FFFFFF", borderRadius: "24px" }}>
                <span style={{ fontSize: "48px" }}>🍽️</span>
                <p style={{ color: "#6B6B6B", marginTop: "12px" }}>No orders yet. New orders will appear here.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "24px" }}>
                {orders.map((order) => (
                  <div
                    key={order._id}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                      border: "1px solid #F0EFE5",
                      transition: "all 0.2s",
                    }}
                  >
                    {/* Order Header */}
                    <div
                      style={{
                        padding: "16px 20px",
                        background: getStatusBg(order.status),
                        borderBottom: "1px solid #EAE8DD",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "800", fontSize: "18px", color: "#2D2D2D" }}>Order #{order.orderNumber}</span>
                          <span
                            style={{
                              background: getStatusColor(order.status),
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: "700",
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p style={{ color: "#6B6B6B", fontSize: "13px", marginTop: "6px" }}>Table {order.tableNumber}</p>
                      </div>
                      <div
                        style={{
                          background: "#FDFCF0",
                          padding: "8px 12px",
                          borderRadius: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      >
                        {expandedOrder === order._id ? "▲" : "▼"}
                      </div>
                    </div>

                    {/* Order Items (always visible but expandable details) */}
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ maxHeight: expandedOrder === order._id ? "none" : "240px", overflow: "hidden" }}>
                        <div style={{ spaceY: "12px" }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: idx !== order.items.length - 1 ? "1px solid #F0EFE5" : "none" }}>
                              <img
                                src={
                                  item.Image
                                    ? item.Image.replace("http://", "https://")
                                    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop"
                                }
                                alt={item.name}
                                style={{
                                  width: "56px",
                                  height: "56px",
                                  borderRadius: "14px",
                                  objectFit: "cover",
                                  background: "#F5F5F0",
                                }}
                                onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop")}
                              />
                              <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: "600", fontSize: "14px", color: "#2D2D2D" }}>{item.name}</p>
                                <p style={{ fontSize: "12px", color: "#8B8B8B" }}>
                                  ₹{item.price} × {item.quantity}
                                </p>
                              </div>
                              <p style={{ fontWeight: "700", color: "#D32F2F", fontSize: "15px" }}>₹{item.itemTotal}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div
                        style={{
                          marginTop: "16px",
                          paddingTop: "12px",
                          borderTop: "2px solid #EAE8DD",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: "500", color: "#2D2D2D" }}>Total Amount</span>
                        <span style={{ fontWeight: "800", fontSize: "20px", color: "#D32F2F" }}>₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Status Buttons */}
                    <div style={{ padding: "16px 20px 20px", borderTop: "1px solid #F0EFE5", background: "#FDFCF0" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        {["Preparing", "Ready", "Served"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(order._id, status)}
                            style={{
                              flex: 1,
                              background: order.status === status ? "#D32F2F" : "#FFFFFF",
                              color: order.status === status ? "white" : "#2D2D2D",
                              border: order.status === status ? "none" : "1px solid #E0DED3",
                              padding: "10px 0",
                              borderRadius: "40px",
                              fontSize: "13px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              if (order.status !== status) {
                                e.target.style.background = "#F5F5EE";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (order.status !== status) {
                                e.target.style.background = "#FFFFFF";
                              }
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaiterDashboard;