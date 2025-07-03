import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import ProfileContext from "../Context/ProfileContext";
import "./OrderDetail.css"
import OrderBill from "./OrderBill";
import MetalContext from "../Context/MetalRateContext";

const OrderDetail = () => {
  const { userData, orderData, setOrderData } = useContext(ProfileContext);
  const invoiceContainerRef = useRef(null);
  const { metalRates, calculateFinalPrice } = useContext(MetalContext);

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
      const response = await axios.post("http://localhost:8000/api/v1/orders/getUser-order", { orderIds });
      setOrderData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response ? error.response.data : error.message);
    }
  };
  
  const [progressWidths, setProgressWidths] = useState({});

  const [subTotalProductAmount, setSubTotalProductAmount] = useState(0);
  const [totalProductAmount, setTotalProductAmount] = useState(0);

  useEffect(() => {
    if (!Array.isArray(orderData)) return; 
  
    
    const subTotalAmount = orderData.reduce((total, order) => {
      return total + (order.orderDetails?.reduce((acc, item, index) => {
        const quantity = order.products?.[index]?.orderQuantity || 0; // Get quantity from order.products
        return acc + ((item.ProductPrice || 0) * quantity); // Multiply price with quantity
      }, 0) || 0);
    }, 0);
    
   
    
  
    
    // const productQty = orderData.reduce((totalQty, order) => {
    //   return totalQty + (order.products?.reduce((acc, item) => acc + (item.orderQuantity || 0), 0) || 0);
    // }, 0);
  
    setSubTotalProductAmount(subTotalAmount);
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
      <div className="w-full mx-auto p-2 bg-white rounded-xl shadow-md">
      {orderData?.length > 0 ? (
      orderData.map((order) => (
        <div key={order._id} className="mb-10 border-b pb-6 Order-Details-Container">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">
            Order id: <span className="text-[#8f6faab6]">#{order._id ? order._id.slice(0, 6) + "..." : "orderID"}</span>

            </h2>
           
        <button onClick={() => handleShowInvoice(order)}>View Invoice</button>

          
          </div>

          <div className="flex flex-col sm:flex-row mt-4 gap-6 order-Details-Sub-Box">
            <div className="w-fit h-24 flex order-Details-Images-Box gap-2 ">
            {order?.orderDetails?.map((orderImageInfo, index) => (
            <div className="relative" key={index}>
                {orderImageInfo?.ProductImages?.length > 0 && (
                  <img
                    src={orderImageInfo.ProductImages[0] || "/default-image.jpg"} // First image
                    alt="Product Image"
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
            ))}

            </div>

            <div className="mt-4 flex gap-4 Order-Details-Info">
          {order?.orderDetails?.map((orderInfo, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {orderInfo.ProductName
                  ? orderInfo.ProductName.split(" ").length > 2
                    ? orderInfo.ProductName.split(" ").slice(0, 2).join(" ") + "..."
                    : orderInfo.ProductName
                  : "Product Name"}
              </h3>

              <p className="text-gray-700">Price: {order.products[index]?.price  || "0.00"}</p>
              <p className="text-gray-700">Qty: {order.products[index]?.orderQuantity  || "0.00"}</p>
              <p className="text-gray-700">Total: {order.totalAmount || "0.00"}</p>
              <p className="text-gray-600">
                {orderInfo.ProductDescription
                  ? orderInfo.ProductDescription.length > 20
                    ? orderInfo.ProductDescription.slice(0, 20) + "..."
                    : orderInfo.ProductDescription
                  : "No description available"}
              </p>

            </div>
          ))}
        </div>

  

            <div className="space-y-2 Order-Detail-Delivery-Address">
              <h4 className="text-sm font-semibold">Delivery address</h4>
              <p className="text-gray-600">{order.userId.fullName || "Order Customer" }</p>
              <p className="text-gray-600">{order.userId.addressLine1 || "Address"}</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6">Status: {order.orderStatus || "Status" }</p>
          <p className="ProductStatus-Progress"> {progressWidths[order._id]} </p>
          <div className="relative mt-3">
            <div className="h-2 bg-gray-300 rounded-full">
            <div className="h-2 bg-gray-300 rounded-full w-full relative">
            <div className="h-2 bg-gray-300 rounded-full w-full relative">
              
            <div
            className={`h-2 rounded-full transition-all duration-300 ${
              order.orderStatus === "Pending"
                ? "bg-[#835aa4d8]"
                : order.orderStatus === "Success"
                ? "bg-[#4f3267]"
                : order.orderStatus === "Canceled"
                ? "bg-red-600"
                : "bg-gray-300"
            }`}
            style={{ width: progressWidths[order._id] || "0%" }}
          ></div>
     
    </div>
</div>

            </div>
          </div>
        </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}

      {/* Billing & Payment Section */}
   
    </div>
          ) : (
            <div className="ErrDiv w-full h-96 flex justify-center align-items-center">
              Please login as user to see your orders
            </div>
          )}
    </>
  );
};

export default OrderDetail;
