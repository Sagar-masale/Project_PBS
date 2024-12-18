import React from "react";
import './AdminAcc.css'



function AdminAcc() {


  const cards = [
    { title: "Save Products", value: "50.8K", change: "28.4%", color: "text-green-400" },
    { title: "Stock Products", value: "23.6K", change: "-12.6%", color: "text-red-400" },
    { title: "Sale Products", value: "756", change: "3.1%", color: "text-green-400" },
    { title: "Average Revenue", value: "2.3K", change: "11.3%", color: "text-green-400" },
  ];

  // const countryStateMap = {
  //   "United States": ["California", "Texas", "New York", "Florida"],
  //   "India": ["Maharashtra", "Karnataka", "Goa", "Uttar Pradesh"],
  //   "Australia": ["New South Wales", "Victoria", "Queensland", "Tasmania"],
  //   // ...
  // };

  const orders = [
    {
      orderId: 101,
      name: "Sagar Masale",
      email: "sagar.masale@gmail.com",
      date: "Jan 17, 2024",
      status: "Delivered",
      country: "India",
      state: "Maharashtra",
      total: "₹89,456.00",
    },
    {
      orderId: 102,
      name: "Mayuresh Parabat",
      email: "mayuresh.parabat@gmail.com",
      date: "Feb 27, 2024",
      status: "Canceled",
      country: "India",
      state: "Karnataka",
      total: "₹4,56,789.00",
    },
    {
      orderId: 103,
      name: "Prajwal Konade",
      email: "prajwal.konade@gmail.com",
      date: "Apr 14, 2024",
      status: "Delivered",
      country: "Australia",
      state: "Telangana",
      total: "₹10,23,899.00",
    },
    {
      orderId: 104,
      name: "Veeraj Mashal",
      email: "veeraj.mashal@gmail.com",
      date: "Jun 17, 2024",
      status: "Pending",
      country: "India",
      state: "Goa",
      total: "₹1,23,456.00",
    },
    {
      orderId: 105,
      name: "Abhi Mane",
      email: "abhi.mane@gmail.com",
      date: "Sep 14, 2024",
      status: "Delivered",
      country: "India",
      state: "Madhya Pradesh",
      total: "₹67,123.00",
    },
    {
      orderId: 106,
      name: "Rahul Patil",
      email: "rahul.patil@gmail.com",
      date: "Dec 27, 2024",
      status: "Pending",
      country: "India",
      state: "Rajasthan",
      total: "₹2,34,567.00",
    }
  ];
  
  
    
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600";
      case "Pending":
        return "bg-yellow-500";
      case "Canceled":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };
  const getOrderDetails = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#09132e]";
      case "Pending":
        return "bg-[#0B1739]";
      case "Canceled":
        return "bg-[#0B1739]";
      default:
        return "bg-[#0B1739]";
    }
  }
  const handleEdit = (orderId) => {
    // handle edit logic
    alert("coming soon edit logic")
  };
  
  const handleDelete = (orderId) => {
    // handle delete logic
    alert("coming soon delete logic")
  };
  


  return (
    <>
  <div className="flex MainContainerAdmin min-h-screen text-white">
  {/* Sidebar */}
  <div className="w-64 slideBar-AdminPanel p-6 flex flex-col justify-between sticky top-0 h-screen overflow-auto">
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">ControlHub</h1>
      <input
        type="text"
        placeholder="Search for..."
        className="w-full p-2 rounded adminSearch placeholder-gray-400"
      />
      <nav className="mt-8 space-y-4">
        <a href="#" className="block text-purple-400">Dashboard</a>
        <a href="#" className="block text-gray-300">Features</a>
        <a href="#" className="block text-gray-300">Users</a>
        <a href="#" className="block text-gray-300">Pricing</a>
        <a href="#" className="block text-gray-300">Integrations</a>
        <a href="#" className="block text-gray-300">Authentication</a>
        <a href="#" className="block text-gray-300">Settings</a>
      </nav>
    </div>
    <div className="flex items-center space-x-3">
      <img
        src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
        alt="admin"
        className="w-10 h-10 rounded-full"
      />
      <span>Sagar Masale</span>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 p-8">
    {/* Header */}
    <header className="flex justify-end items-center mb-8">
      <img
        src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
        alt="Admin"
        className="w-10 h-10 rounded-full"
      />
      <span className="ml-2 text-sm">Sagar Masale</span>
    </header>

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="p-4 Admin-Dashboard-Cards rounded-lg">
          <h2 className="text-sm text-gray-400">{card.title}</h2>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
          <span className={`text-sm ${card.color}`}>{card.change}</span>
        </div>
      ))}
    </div>

   
       {/* Orders Table */}
       <div className="p-6">
        <div className="overflow-auto rounded-lg">
          <table className="w-full table-auto text-sm">
            <thead className="orderCol">
              <tr>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Client</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Country</th>
                <th className="p-4 text-left">State</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
  {orders.reverse().map((order) => (
    <tr key={order.orderId} className={`orderDetails ${getOrderDetails(order.status)}`}>
      <td className="p-4">{order.orderId}</td>
      <td className="p-4">
        <div>
          <p className="font-bold">{order.name}</p> {/* Corrected to use name */}
          <p className="text-gray-400">{order.email}</p>
        </div>
      </td>
      <td className="p-4">{order.date}</td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td className="p-4">{order.country}</td>
      <td className="p-4">{order.state}</td>
      
      <td className="p-4 font-bold">{order.total}</td>
      <td className="p-4 flex space-x-3">
        <button onClick={() => handleEdit(order.orderId)} className="text-gray-400 hover:text-white">✏️</button>
        <button onClick={() => handleDelete(order.orderId)} className="text-gray-400 hover:text-white">🗑️</button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
    </div>
  </div>
</div>


    
    </>
  )
}

export default AdminAcc;
