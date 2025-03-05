import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import './AdminAcc.css'
import AdminContext from "../../Context/AdminContext";
import AdminSlideBar from "./AdminSlideBar";

function AdminAcc() {
  const { adminData } = useContext(AdminContext);
  const adminName = adminData?.data?.adminFullName || "Admin";
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const cards = [
    { title: "Save Products", value: "50.8K", change: "28.4%", color: "text-green-400" },
    { title: "Stock Products", value: "23.6K", change: "-12.6%", color: "text-red-400" },
    { title: "Sale Products", value: "756", change: "3.1%", color: "text-green-400" },
    { title: "Average Revenue", value: "215.20k", change: "11.3%", color: "text-green-400" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/orders/getAll-orders");
        console.log("API Response Order:", response.data.data);
  
        // Ensure sorting by date (latest first)
        const sortedOrders = (response.data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Prevent undefined state
      }
    };
  
    fetchOrders();
  }, []);
  const filteredOrders = orders.filter(order => 
    order._id.includes(searchQuery) || 
    order.userId.phoneNumber.includes(searchQuery) || 
    order.userId.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  
  

  
  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-600";
      case "Pending":
        return "bg-gray-600";
      case "Canceled":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };
  const getOrderDetails = (status) => {
    switch (status) {
      case "Success":
        return "bg-[#09132e]";
      case "Pending":
        return "bg-[#0B1739]";
      case "Canceled":
        return "bg-[#0B1739]";
      default:
        return "bg-[#0B1739]";
    }
  }



  const openEditPopup = (order) => {
    if (!order) return;
    setSelectedOrder(order);
  
    setUpdatedStatus(order?.orderStatus || "Pending");
    console.log("Edit::",order)
  };

  const closeEditPopup = () => setSelectedOrder(null);

  const confirmUpdate = async () => {
    if (!selectedOrder || !selectedOrder._id) {
      console.error("Error: No order selected for update.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:8000/api/v1/orders/updateOrder", {
        orderId: selectedOrder._id,
        orderStatus: updatedStatus,
      });

      console.log("Update Response:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, orderStatus: response.data?.updatedOrder?.orderStatus || updatedStatus }
            : order
        )
      );

      closeEditPopup();
    } catch (error) {
      console.error("Error updating order:", error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/orders/deleteOrder`, {
        data: { orderId },
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error.response ? error.response.data : error.message);
    }
  };
  


  return (
    <>
    {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[80%] h-[70%] overflow-auto">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Order Details</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="border-r pr-6">
              <h3 className="text-lg font-semibold mb-3">Products: {selectedOrder.products.length} </h3>
              {selectedOrder.productDetails.map((product, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4 bg-gray-100 p-3 rounded-lg">
                  <img src={product.ProductImages[0]} alt={product.ProductName} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{product.ProductName}</p>
                    
                    <p className="text-sm text-gray-600">Qty: {selectedOrder.products[index]?.orderQuantity || 'N/A'}</p>

                    <p className="text-green-600 font-bold">{product.ProductPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 w-full p-6 rounded-lg shadow-md">
  <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Details</h3>
  
  <div className="grid grid-cols-1 gap-5">
    <div>
      <p className="text-gray-700"><strong className="font-semibold text-gray-900">Name:</strong> {selectedOrder.userId.fullName}</p>
      <p className="text-gray-700"><strong className="font-semibold text-gray-900">Phone:</strong> {selectedOrder.userId.phoneNumber}</p>
      <p className="text-gray-700"><strong className="font-semibold text-gray-900">Email:</strong> {selectedOrder.userId.email}</p>
    </div>
    
    <div>
      <p className="text-gray-700  w-[70%]"><strong className="font-semibold text-gray-900">Address:</strong> {selectedOrder.userId.addressLine1}</p>
      <p className="text-gray-700"><strong className="font-semibold text-gray-900">State:</strong> {selectedOrder.userId.state}</p>
      <p className="text-gray-700"><strong className="font-semibold text-gray-900">City:</strong> {selectedOrder.userId.city}</p>
      <p className="text-gray-700"><strong className="font-semibold text-gray-900">Zip Code:</strong> {selectedOrder.userId.zipCode}</p>
    </div>
  </div>
</div>

          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-left">
              Total Amount: <span className="text-green-600">{(selectedOrder.totalAmount).toFixed(2)}</span>
            </p>

            <div className="mt-4">
              <label className="block mb-2 font-semibold text-gray-700">Update Status:</label>
              <select
                className="w-[20%] p-2 border rounded focus:ring-2 focus:ring-purple-500"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Success">Success</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button onClick={closeEditPopup} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button onClick={confirmUpdate} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
              Confirm Update
            </button>
          </div>
        </div>
      </div>  
)}

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
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                      <th className="p-4 text-left">Order Id</th>
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
                   
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                  <tr key={order?._id} className={`orderDetails ${getOrderDetails(order?.orderStatus || "Pending")}`}>

            <td className="p-4">{order._id}</td>
            <td className="p-4">
              <div>
                <p className="">{order.userId.fullName}</p> {/* Corrected to use name */}
                <p className="text-gray-400">{order.userId.email}</p>
              </div>
            </td>
            <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>

            <td className="p-4">
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.orderStatus) || ""}`}>
                {order.orderStatus}
              </span>
            </td>
            <td className="p-4">{order.userId.country}</td>
            <td className="p-4">{order.userId.state}</td>
            
            <td className="p-4 font-bold">{order.totalAmount}</td>
            <td className="p-4 flex space-x-3">
            <button onClick={() => openEditPopup(order)} className="text-[#8f85fe] hover:text-[#9389ff57]">
  <span class="material-symbols-outlined">edit</span>
</button>

              <button onClick={() => handleDelete(order._id)} className="text-[#8f85fe] hover:text-[#9389ff57]  ">
              <span class="material-symbols-outlined">
                delete
              </span>
              </button>
            </td>
            </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="p-4 text-center text-gray-500">Order not found</td>
    </tr>
  )}
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
