import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import ProfileContext from "../Context/ProfileContext";
import "./OrderDetail.css"
import OrderBill from "./OrderBill";
import toast from "react-hot-toast";
const OrderDetail = () => {
  const { userData, orderData, setOrderData } = useContext(ProfileContext);
  const invoiceContainerRef = useRef(null);

  useEffect(() => {
    if (userData?.userOrders?.length > 0) {
      fetchOrdersByIds(userData.userOrders);
    }
  }, [userData?.userOrders]);

  const fetchOrdersByIds = async (orderIds) => {
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      console.error("Invalid orderIds:", orderIds);
      return;
    }
  
    try {
      console.log("Fetching orders for IDs:", orderIds);
      const response = await axios.post("https://backend-pbs-coo6.onrender.com/api/v1/orders/getUser-order", { orderIds });
      setOrderData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response ? error.response.data : error.message);
    }
  };
  
  const [progressWidths, setProgressWidths] = useState({});

  const [totalProductAmount, setTotalProductAmount] = useState(0);

  useEffect(() => {
    if (!Array.isArray(orderData)) return; 
  
    

  
    
    const totalAmount = orderData.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    setTotalProductAmount(totalAmount);
  
    setProgressWidths((prevWidths) => {
      const newWidths = { ...prevWidths }; 
  
      orderData.forEach((order) => {
        if (order.orderStatus === "Pending" && !newWidths[order._id]) {
          newWidths[order._id] = `${Math.floor(Math.random() * (70 - 20 + 1)) + 20}%`; // Random 20%-70%
        } else if (order.orderStatus !== "Pending") {
          newWidths[order._id] = "100%";
        }
      });
  
      return newWidths; // Update state with new widths
    });
  }, [orderData]);
  
  
  const [showInvoice , setShowInvoice] = useState(false);
  
  
  const handleShowInvoice = (order) => {
  setShowInvoice(order);
  window.scrollTo({ top: 0, behavior: 'smooth' }); // ⬆️ Scroll to top only on open
};


const handleCancleOrder = async (order) => {
  const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete("https://backend-pbs-coo6.onrender.com/api/v1/orders/deleteOrder", {
      data: { orderId: order._id },
      withCredentials: true,
    });

    toast.success("Order cancelled successfully");

    // ✅ Remove the cancelled order from state
    setOrderData(prev => prev.filter(o => o._id !== order._id));
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};


 

  return (
    <>
    {showInvoice ? (
<div className="relative  max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8">
  <OrderBill
    selectedOrder={showInvoice}
    handleClose={() => setShowInvoice(null)}
    invoiceRef={invoiceContainerRef} // 🔁 pass ref here
  />
</div>

    ):(null)}
{userData ? (
<div className="w-full mx-auto px-0 sm:px-4 py-4 bg-white shadow-md ">


    {orderData?.length > 0 ? (
      orderData.map((order) => (
        <div key={order._id} className="w-full bg-white p-4  shadow-sm  mb-6">
          {/* 🔷 Header: Order ID & Payment Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Order Id:{" "}
                <span className="text-purple-600">
                  #{order._id?.slice(0, 6) || "orderID"}...
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Order Payment :{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex sm:mt-0 ml-auto gap-2">
              <button
                onClick={() => handleCancleOrder(order)}
                disabled={order.orderStatus === "Canceled"}
                className={`text-sm sm:text-base font-medium transition ${
                  order.orderStatus === "Canceled"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#4f3267] hover:text-[#3e2554] cursor-pointer"
                }`}
              >
                Cancel Order
              </button>

                <button
                  onClick={() => handleShowInvoice(order)}
                  className="text-sm sm:text-base text-[#4f3267]  font-medium hover:text-[#3e2554] transition"
                >
                  View Invoice
                </button>
              </div>
          </div>

          {/* 🔷 Product Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t pt-4">
            {/* 📷 Image */}
            <img
              src={order.orderDetails?.[0]?.ProductImages?.[0] || "/default-image.jpg"}
              alt="Product"
              className="w-24 h-24 object-cover rounded"
            />

            {/* 📄 Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                {order.orderDetails?.[0]?.ProductName || "Product Name"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                By: {order.orderDetails?.[0]?.ProductBrand || "PBS Jewellers"}
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Size:</span>{" "}
                  {order.products?.[0]?.orderProductSize || "-"}
                </p>
                <p>
                  <span className="font-semibold">Qty:</span>{" "}
                  {order.products?.[0]?.orderQuantity || "-"}
                </p>
              </div>
            </div>

            {/* 💰 Price / Status / Delivery */}
            <div className="flex flex-col items-start sm:items-end text-sm gap-2 sm:min-w-[160px]">
              <p className="text-purple-600 font-semibold">
                ₹{order.totalAmount || "0.00"}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.orderStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : order.orderStatus === "Success"
                    ? "bg-green-100 text-green-600"
                    : order.orderStatus === "Canceled"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.orderStatus || "Status"}
              </span>
              <p className="text-teal-600 font-medium">
                {/* Dummy delivery time – use order.expectedDelivery if you have it */}
                {new Date(
                  new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No orders found.</p>
    )}
  </div>
) : (
  <div className="w-full h-96 flex justify-center items-center text-gray-500">
    Please login as user to see your orders
  </div>
)}


    </>
  );
};

export default OrderDetail;
