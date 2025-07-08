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

  const productData = [
    { title: "Save Products", value: 500 },
    { title: "Stock Products", value: 153 },
    { title: "Sale Products", value: 347, price: 620 }, // Example price per unit
  ];
  
  // Ensure values exist, otherwise default to 0
  const totalStock = productData.find((item) => item.title === "Stock Products")?.value || 0;
  const totalSales = productData.find((item) => item.title === "Sale Products")?.value || 0;
  const pricePerUnit = productData.find((item) => item.title === "Sale Products")?.price || 0;
  
  const totalRevenue = totalSales * pricePerUnit;
  
  // Update the cards array dynamically
  const cards = [
    { title: "Save Products", value: productData.find((item) => item.title === "Save Products")?.value || 0, change: "2.4%", color: "text-green-400" },
    { title: "Stock Products", value: totalStock, change: "-12.6%", color: "text-red-400" },
    { title: "Sale Products", value: totalSales, change: "3.1%", color: "text-green-400" },
    { title: "Total Revenue", value: totalRevenue > 0 ? totalRevenue.toLocaleString() : "0", change: "11.3%", color: "text-green-400" },
  ];
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://backend-pbs-coo6.onrender.com/api/v1/orders/getAll-orders");

        const sortedOrders = (response.data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        setOrders(sortedOrders);
      } catch (error) {
        setOrders([]);
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
      const response = await axios.put("https://backend-pbs-coo6.onrender.com/api/v1/orders/updateOrder", {
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

<<<<<<< HEAD
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`https://backend-pbs-coo6.onrender.com/api/v1/orders/deleteOrder`, {
        data: { orderId },
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error.response ? error.response.data : error.message);
    }
  };
=======
const handleDelete = async (orderId) => {
  const confirmed = window.confirm("Are you sure you want to delete this order?");
  if (!confirmed) return;

  try {
    await axios.delete(`https://backend-pbs-coo6.onrender.com/api/v1/orders/deleteOrder`, {
      data: { orderId },
    });
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  } catch (error) {
    console.error("Error deleting order:", error.response ? error.response.data : error.message);
  }
};

>>>>>>> master
  


  return (
    <>
{selectedOrder && (
  <div className="absolute inset-0 z-50  bg-opacity-10 flex justify-center align-items-center ">
    <div className="bg-white w-full mt-40 flex flex-col max-w-5xl max-h-[70vh] overflow-y-auto rounded-2xl shadow-purple-2xl border p-8">
      <h2 className="text-3xl font-bold text-purple-800 border-b pb-4 mb-6">Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Products ({selectedOrder.products.length})
          </h3>
          <div className="space-y-4">
            {selectedOrder.productDetails.map((product, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 border hover:shadow-sm"
              >
                <img
                  src={product.ProductImages[0]}
                  alt={product.ProductName}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-gray-900">{product.ProductName}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {selectedOrder.products[index]?.orderQuantity || 'N/A'}
                  </p>
                  <p className="text-sm text-purple-700 font-medium">
                    ₹{selectedOrder.totalAmountWithDiscount}
                  </p>
                  <p className="text-sm text-gray-600">
                    Coupon: {selectedOrder.products[index]?.ProductCouponCode || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-purple-900">Customer Details</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-900">Name:</span> {selectedOrder.userId.fullName}</p>
            <p><span className="font-semibold text-gray-900">Phone:</span> {selectedOrder.userId.phoneNumber}</p>
            <p><span className="font-semibold text-gray-900">Email:</span> {selectedOrder.userId.email}</p>
            <hr className="my-2" />
            <p><span className="font-semibold text-gray-900">Address:</span> {selectedOrder.userId.addressLine1}</p>
            <p><span className="font-semibold text-gray-900">State:</span> {selectedOrder.userId.state}</p>
            <p><span className="font-semibold text-gray-900">City:</span> {selectedOrder.userId.city}</p>
            <p><span className="font-semibold text-gray-900">Zip Code:</span> {selectedOrder.userId.zipCode}</p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-gray-100 border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800">Total Amount</h4>
          <p className="text-xl font-bold text-green-700">
            ₹{selectedOrder.totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-semibold text-gray-700">Update Status:</label>
          <select
            className="w-48 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600"
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={closeEditPopup}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={confirmUpdate}
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-md"
        >
          Confirm Update
        </button>
      </div>
    </div>
  </div>
)}


    {adminData ? (
        <div className="flex   MainContainerAdmin min-h-screen text-white">
      
        <AdminSlideBar/>
      
        {/* Main Content */}
<div className="w-full p-4 sm:p-6">
  {/* Header */}
  <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <h2 className="TopSectionName font-bold text-lg sm:text-xl text-gray-400">Analytics</h2>
    <div className="flex items-center gap-2">
      <img
        src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-418179856.jpg"
        alt="Admin"
        className="w-10 h-10 rounded-full"
      />
      <span className="text-sm">{adminName}</span>
    </div>
  </header>

  {/* Dashboard Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {cards.map((card, index) => (
      <div key={index} className="p-4 bg-[#0B1739] shadow rounded-lg">
        <h2 className="text-sm text-gray-500">{card.title}</h2>
        <p className="text-2xl font-bold mt-1">{card.value}</p>
        <span className={`text-sm ${card.color}`}>{card.change}</span>
      </div>
    ))}
  </div>

  {/* Orders Table */}
  <div className="pt-4">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <h2 className="text-lg font-semibold text-gray-400">Orders Status</h2>
      <div className="w-full sm:w-64">
        <div className="flex items-center border rounded px-2 py-1 bg-[#0B1739] shadow-sm">
          <span className="material-symbols-outlined text-gray-400">search</span>
<input
  onChange={(e) => setSearchQuery(e.target.value)}
  type="text"
  placeholder="Search for..."
  className="w-full pl-2 text-sm text-white bg-transparent border-none outline-none focus:outline-none focus:ring-0"
/>

        </div>
      </div>
    </div>

    <div className="overflow-x-auto bg-[#08112a] rounded-lg shadow">
      <table className="min-w-[720px] w-full text-sm text-left whitespace-nowrap">
        <thead className="bg-[#0B1739] text-white font-medium">
          <tr>
            <th className="p-4">Order ID</th>
            <th className="p-4">Client</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Country</th>
            <th className="p-4">State</th>
            <th className="p-4">Total</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr
                key={order?._id}
                className={`border-t ${getOrderDetails(order?.orderStatus || "Pending")}`}
              >
                <td className="p-4 text-xs sm:text-sm">{order._id}</td>
                <td className="p-4">
                  <p className="font-medium">{order.userId.fullName}</p>
                  <p className="text-gray-400 text-xs">{order.userId.email}</p>
                </td>
                <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.orderStatus)}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-4 text-sm">{order.userId.country}</td>
                <td className="p-4 text-sm">{order.userId.state}</td>
                <td className="p-4 font-bold text-sm">₹{order.totalAmount}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => openEditPopup(order)} className="text-indigo-500 hover:opacity-70">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => handleDelete(order._id)} className="text-red-500 hover:opacity-70">
                    <span className="material-symbols-outlined">delete</span>
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
