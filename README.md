# TapNOrder – Scan. Order. Relax.

TapNOrder is a modern **digital restaurant ordering platform** that allows customers to place orders, make payments, and request services — while enabling waiters to manage everything in real-time.

The idea is simple:  
You scan a QR at your table → browse → order → relax.  

No waiting, no confusion, no awkwardly trying to get the waiter’s attention.

At the same time, it helps restaurants manage orders better, reduce chaos, and improve overall service.

---

## What this project is about

This is not just a frontend or just documentation.

This repository includes:
- Proper system design and documentation  
- A working customer-side interface  

It represents the full thought process behind building a real product — from idea to design to implementation.

---

## Objective (and the pain points)

This project started with a simple observation:  
Dining out is fun, but the process is often inefficient.

### Key pain points
- Waiting too long to place an order  
- Difficulty getting the waiter’s attention  
- Confusion in group orders  
- Lack of transparency in billing  
- No personalization in recommendations  
- Restaurants struggling to manage orders during peak hours  

### Objective
To build a system that:
- reduces waiting time  
- simplifies group ordering  
- improves communication between customers and staff  
- adds a personalized and interactive dining layer  
- makes the overall experience seamless  

## 🚀 Features

### 👤 Customer Side

* 📱 Browse menu (live from menu-service)
* 🛒 Add items to cart
* 💳 Pay via Cash or Online (Razorpay)
* 🔔 Request services (Water, Waiter, Napkin, etc.)
* 📊 Track order status live

---

### 🧑‍🍳 Waiter Dashboard

* 📦 View live incoming orders
* 🔄 Update order status (Preparing → Ready → Served)
* 🔔 Receive real-time service requests
* ✅ Mark requests as completed

---

### ⚙️ Backend (Microservices)

* 🔐 Auth Service
* 🍔 Menu Service
* 📦 Order Service
* 💳 Payment Service (Razorpay)
* 🌐 Gateway

---

## 🏗️ Project Structure

```
TapNOrder/
│
├── src/
│   ├── customer/              # Customer frontend
│   ├── Waiter/               # Waiter dashboard
│   ├── Restaurant/
│   │   ├── frontend/         # Restaurant UI
│   │   ├── gateway/          # API gateway
│   │   └── Services/
│   │       ├── auth-service
│   │       ├── menu-service
│   │       ├── order-service
│   │       └── payment-service
│
├── docs/
├── test/
└── README.md
```

---

## ⚙️ Tech Stack

* **Frontend:** React + Tailwind CSS
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Real-time:** Socket.io
* **Payments:** Razorpay
* **Architecture:** Microservices

---

## 🧑‍💻 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/TapNOrder.git
cd TapNOrder
```

---

### 2️⃣ Install Dependencies

Install in each service:

```bash
cd src/Restaurant/Services/order-service
npm install
```

Repeat for:

* menu-service
* auth-service
* payment-service
* gateway
* frontend apps

---

### 3️⃣ Setup Environment Variables

Create `.env` in each service:

#### Example (order-service)

```env
PORT=4003
MONGO_URI=your_mongodb_url
GETMENU_API_URL=http://localhost:4001/api/v1/menu
PAYMENT_SERVICE_URL=http://localhost:4004
FRONTEND_URL=http://localhost:5173
```

#### Example (payment-service)

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

---

### 4️⃣ Start Services

Run each service separately:

```bash
npm run dev
```

Start order:

1. menu-service
2. order-service
3. payment-service
4. gateway
5. frontend apps

---

## 🔄 Application Flow

### 🛒 Order Flow

1. Customer selects items
2. Order sent to backend
3. Backend verifies menu items
4. If Cash → order created
5. If Online → Razorpay opens → confirmOrder
6. Order stored in DB

---

### 🔔 Service Request Flow

1. Customer clicks "Water / Waiter"
2. Request stored in DB
3. Socket emits event
4. Waiter dashboard updates instantly

---

### ⚡ Real-time System

* `orderCreated` → new order
* `orderUpdated` → status update
* `serviceRequest` → new request
* `serviceRequestUpdated` → completed

---

## 🌐 API Endpoints (Important)

### 📦 Orders

```
POST   /api/v1/order/create
POST   /api/v1/order/confirm
PATCH  /api/v1/order/:id
GET    /api/v1/order
```

---

### 🔔 Service Requests

```
POST   /api/v1/service
GET    /api/v1/service
PATCH  /api/v1/service/:id
```

---

## 💡 Usage Guide

### 👤 Customer

1. Open app
2. Scan table QR / enter table number
3. Browse menu
4. Add items → Checkout
5. Choose payment
6. Track order
7. Use quick buttons for service

---

### 🧑‍🍳 Waiter

1. Open `/waiter` dashboard
2. View incoming orders
3. Update status
4. Handle service requests
5. Mark requests completed

---

## Project Portfolio

This repository works as a complete project portfolio.

It includes:
- problem understanding  
- system design decisions  
- structured documentation (SRS, SDD, UML)  
- implementation  

Anyone going through this repository can understand:
- what was built  
- why it was built  
- how it was built  

---

## Project Documentation

The repository contains:

- Software Requirements Specification (SRS)  
- Software Design Description (SDD)  
- UML Diagrams (Class, Sequence, State Charts)  

These explain:
- system functionality  
- architecture and design  
- user interaction (customers and staff)  

---

## Core Features

### Ordering Experience
- QR-based table access (no login required)  
- Mood-based dish recommendations  
- Smart filters (diet, spice, price, time)  
- “Surprise Me” feature  

### Social Dining
- Shared table cart  
- Live table photo billboard  
- Inter-table interactions (safe preset messages)  
- Table-level trending insights  

### Fun Add-ons
- Song request system  
- AR dish preview  

### Service Features
- One-tap service buttons:
  - Call waiter  
  - Water / napkins / cutlery  
  - Table change request  

### Billing and Payments
- Live running bill  
- Split options (equal, item-wise, custom)  
- UPI, cards, wallets  
- Group tip system  

### Engagement and Rewards
- Loyalty points  
- Reward system  
- Quick feedback  

---

## Restaurant Panel (SaaS Dashboard)

A professional SaaS-style restaurant dashboard called **TapNOrder Restaurant Panel** is also part of the system design.

It follows a desktop-first responsive design and is inspired by modern POS systems.

### Main Screen
- Summary cards:
  - Active Orders  
  - Preparing Orders  
  - Ready Orders  
  - Total Revenue Today  
- Real-time activity feed  

### Navigation
Sidebar navigation with icons:
- Dashboard  
- Orders  
- Kitchen  
- Menu  
- Tables  
- Analytics  
- Settings  

### Design Direction
- Clean and minimal interface  
- Professional layout  
- Inspired by modern POS systems like Toast POS, Petpooja, and Square  


---

## Thought Behind It

This is not just a food ordering app.

It focuses on:
- reducing friction in dining  
- simplifying group interactions  
- adding a social and interactive layer  

The goal is to turn a normal dining experience into something more seamless and engaging.

---

## Status

Still evolving.  
More features and improvements are in progress.

---

## Closing Note

Built as part of an academic and product exploration project.  
The aim is to bridge design, technology, and real-world usability.
