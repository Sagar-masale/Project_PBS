import React, { useContext } from "react";
import '../AdminAcc.css'
import AdminContext from "../../../Context/AdminContext";
import AdminSlideBar from "../AdminSlideBar";

function AllUsers() {
  const {adminData} = useContext(AdminContext);

  // console.log("admin",adminData.data.adminFullName);
  
  const adminName = adminData?.data?.adminFullName || "Admin";
  


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

  const Users = [
    {
      userId: 101,
      name: "Sagar Masale",
      email: "sagar.masale@gmail.com",
      date: "Jan 17, 2024",
      country: "India",
      state: "Maharashtra",
      moreInfo: "...",
    },
    {
      userId: 102,
      name: "Mayuresh Parabat",
      email: "mayuresh.parabat@gmail.com",
      date: "Feb 27, 2024",      country: "India",
      state: "Karnataka",
      moreInfo: "...",
    },
    {
      userId: 103,
      name: "Prajwal Konade",
      email: "prajwal.konade@gmail.com",
      date: "Apr 14, 2024",
      country: "Australia",
      state: "Telangana",
      moreInfo: "...",
    },
    {
      userId: 104,
      name: "Veeraj Mashal",
      email: "veeraj.mashal@gmail.com",
      date: "Jun 17, 2024",     country: "India",
      state: "Goa",
      moreInfo: "...",
    },
    {
      userId: 105,
      name: "Abhi Mane",
      email: "abhi.mane@gmail.com",
      date: "Sep 14, 2024",
      country: "India",
      state: "Madhya Pradesh",
      moreInfo: "...",
    },
    {
      userId: 106,
      name: "Rahul Patil",
      email: "rahul.patil@gmail.com",
      date: "Dec 27, 2024",     
      country: "India",
      state: "Rajasthan",
      moreInfo: "...",
    }
  ];
    
  

  const handleEditAllUser = (userId) => {
    // handle edit logic
    alert("coming soon edit logic userId " + userId)
  };
  
  const handleDeleteAllUser = (userId) => {
    // handle delete logic
    alert("coming soon delete logic userId " + userId)
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
      
         
             {/* Users Table */}
             <div className="pt-6">
              <div className="overflow-auto rounded-lg">
                <table className="w-full table-auto text-sm">
                  <thead className="orderCol">
                    <tr>
                      <th className="p-4 text-left">User Id</th>
                      <th className="p-4 text-left">User</th>
                      <th className="p-4 text-left">Register Date</th>
                     
                      <th className="p-4 text-left">Country</th>
                      <th className="p-4 text-left">State</th>
                      <th className="p-4 text-left">More Information</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
        {Users.reverse().map((order) => (
          <tr key={order.userId} className={`orderDetails`}>
            <td className="p-4">{order.userId}</td>
            <td className="p-4">
              <div>
                <p className="font-bold">{order.name}</p> {/* Corrected to use name */}
                <p className="text-gray-400">{order.email}</p>
              </div>
            </td>
            <td className="p-4">{order.date}</td>
            <td className="p-4">{order.country}</td>
            <td className="p-4">{order.state}</td>
            
            <td className="p-4 font-bold">{order.moreInfo}</td>
            <td className="p-4 flex space-x-3">
              <button onClick={() => handleEditAllUser(order.userId)} className="text-gray-400 hover:text-white">✏️</button>
              <button onClick={() => handleDeleteAllUser(order.userId)} className="text-gray-400 hover:text-white">🗑️</button>
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
    <h1>login adminData..</h1>
    )}



    
    </>
  )
}

export default AllUsers;
