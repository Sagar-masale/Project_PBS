import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfileContext from "../Context/ProfileContext";
import { Link } from "react-router-dom";
import OrderBill from "./OrderBill";

const OrderDetail = () => {
  const { userData, orderData, setOrderData } = useContext(ProfileContext);

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
  
  
  
  
  
 
  console.log("Order Bill Data:", orderBillGenerate);

  return (
    <>
    <div className="Order-Bill-Generate">
    <OrderBill/>


    </div>
    {userData ? (
      <div className="w-full mx-auto p-16 bg-white rounded-xl shadow-md">
      {orderData?.length > 0 ? (
      orderData.map((order) => (
        <div key={order._id} className="mb-10 border-b pb-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">
              Order id: <span className="text-[#8f6faab6]">#{order._id || "orderID"}</span>
            </h2>
           <Link to={"../Bill-Details"}>
           <a href="#" className="text-blue-500 hover:underline"
            
            >
              View invoice →
            </a>
           </Link>
          </div>

          <div className="flex flex-col sm:flex-row mt-4 gap-6">
            <div className="w-fit h-24 flex justify-center gap-2">
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

            <div className="mt-4 flex gap-4">
          {order?.orderDetails?.map((orderInfo, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{orderInfo.ProductName || "Product Name"}</h3>
              <p className="text-gray-700">{orderInfo.ProductPrice?.toFixed(2) || "0.00"}</p>
              <p className="text-gray-700">Qty: {order.products[index]?.orderQuantity || "0.00"}</p>
              <p className="text-gray-700">Total: {order.totalAmount || "0.00"}</p>
              <p className="text-gray-600">{orderInfo.ProductDescription || "No description available"}</p>
            </div>
          ))}
        </div>

  

            <div className="space-y-2 ml-auto">
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
                : order.orderStatus === "Cancelled"
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
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Billing Address */}
          <div>
            <h4 className="text-lg font-semibold">Billing address</h4>
            <p className="text-gray-600">{orderData?.[0]?.userId?.addressLine1 || "Address not available"},</p>
            <p className="text-gray-600"> {orderData?.[0]?.userId?.addressLine2} </p>
            <p className="text-gray-600"> {orderData?.[0]?.userId?.state} </p>
            <p className="text-gray-600"> {orderData?.[0]?.userId?.zipCode} </p>
          </div>


          {/* Payment Information */}
          <div>
            <h4 className="text-lg font-semibold">Payment information</h4>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">VISA</span>
              <p className="text-gray-600">not available</p>
            </div>
            <p className="text-gray-600">not available</p>
          </div>

          {/* Order Summary */}
          <div>
          <h4 className="text-lg font-semibold">Order Summary</h4>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{subTotalProductAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{orderData?.[0]?.tax?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Save</span>
            <span>{(subTotalProductAmount - totalProductAmount).toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>Order Total</span>
            <span className="text-blue-600">
              {totalProductAmount.toFixed(2)}
            </span>
          </div>
        </div>
        </div>
      </div>
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
