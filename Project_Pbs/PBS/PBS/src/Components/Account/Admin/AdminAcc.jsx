import React, { useContext } from "react";
import './AdminAcc.css'
import AdminContext from "../../Context/AdminContext";
import AdminSlideBar from "./AdminSlideBar";

function AdminAcc() {
  const {adminData} = useContext(AdminContext);

  // console.log("admin",adminData.data.adminFullName);
  
  const adminName = adminData?.data?.adminFullName || "Admin";
  


  const cards = [
    { title: "Save Products", value: "50.8K", change: "28.4%", color: "text-green-400" },
    { title: "Stock Products", value: "23.6K", change: "-12.6%", color: "text-red-400" },
    { title: "Sale Products", value: "756", change: "3.1%", color: "text-green-400" },
    { title: "Average Revenue", value: "215.20k", change: "11.3%", color: "text-green-400" },
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
      status: "Delivered",
      country: "India",
      state: "Rajasthan",
      total: "₹2,34,567.00",
    }
  ];
  
  // const SlideBarItems = [
  //   {
  //     id: 1,
  //     name: "Dashboard",
  //     logo: "rounded_corner"
  //   },
  //   {
  //     id: 2,
  //     name: "Users",
  //     logo: "group"
  //   },
  //   {
  //     id: 3,
  //     name: "Pricing",
  //     logo: "credit_card_gear"
  //   },
  //   {
  //     id: 4,
  //     name: "Authentication",
  //     logo: "verified_user"
  //   },
  //   {
  //     id: 5,
  //     name: "Settings",
  //     logo: "tune"
  //   },

  // ]
    
  
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
    alert("coming soon edit logic orderId " + orderId)
  };
  
  const handleDelete = (orderId) => {
    // handle delete logic
    alert("coming soon delete logic orderId " + orderId)
  };
  


  return (
    <>
    {adminData ? (
        <div className="flex  MainContainerAdmin min-h-screen text-white">
      
        <AdminSlideBar/>
      
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <header className="flex justify-end items-center mb-8">
          <h2 className="TopSectionName font-bold text-lg mr-auto">Analytics</h2>
            <img
              src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2 text-sm"> {adminName} </span>
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
             <div className="pt-6">
              <div className="overflow-auto rounded-lg">
              <tr className="flex justify-between align-items-center">
                    <h2 className="Status-Name p-4 text-left">Orders Status</h2>
                    <th className="p-4">
                    <div className="searchAdminBox SlideBar-Logos-Active flex w-full pl-2 adminSearch-Box">
                    <span className="material-symbols-outlined ">search</span>
                      <input
                        type="text"
                        placeholder="Search for..."
                        className="w-full adminSearch placeholder-[#AEB9C6] focus:ring-0"
                      />
                      </div>
                    </th>
              </tr>
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
                <p className="">{order.name}</p> {/* Corrected to use name */}
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
              <button onClick={() => handleEdit(order.orderId)} className="text-[#8f85fe] hover:text-[#9389ff57]">
              <span class="material-symbols-outlined">
                edit
              </span>
              </button>
              <button onClick={() => handleDelete(order.orderId)} className="text-[#8f85fe] hover:text-[#9389ff57]  ">
              <span class="material-symbols-outlined">
                delete
              </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      
                </table>
              </div>
          </div>
        </div>
      </div>
    ) : (
    <h1>login admin..</h1>
    )}
    </>
  )
}

export default AdminAcc;
