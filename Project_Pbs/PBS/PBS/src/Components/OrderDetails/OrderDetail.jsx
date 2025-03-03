import React, { useContext, useEffect } from "react";
import axios from "axios";
import ProfileContext from "../Context/ProfileContext";

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
  
  
  
  
  
  useEffect(() => {
    console.log("Updated Order Data:", orderData);
  }, [orderData]);
  

  
  const orders = [
    {
      id: 54879,
      productName: "Nomad Tumbler",
      price: 35.00,
      description:
        "This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.",
      image: "/RingImgs/imgR2M1.jpg",
      customer: "Floyd Miles",
      address: "7363 Cynthia Pass, Toronto, ON N3Y 4H8",
      email: "f•••@example.com",
      phone: "1••••••••40",
      status: "Processing",
      progress: "25%",
      subtotal: 72,
      shipping: 5,
      tax: 6.16,
    },

  ];

  return (
    <div className="w-full mx-auto p-16 bg-white rounded-xl shadow-md">
      {orderData?.length > 0 ? (
      orderData.map((order) => (
        <div key={order._id} className="mb-10 border-b pb-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">
              Order id: <span className="text-[#8f6faab6]">#{order._id || "orderID"}</span>
            </h2>
            <a href="#" className="text-blue-500 hover:underline">
              View invoice →
            </a>
          </div>

          <div className="flex flex-col sm:flex-row mt-4 gap-6">
            <div className="w-24 h-24 flex-shrink-0">
            {order?.orderDetail?.map((orderImageInfo, index) => (
            <div key={index}>
              {orderImageInfo?.ProductImages?.map((productImage, imgIndex) => (
                <img
                  key={imgIndex}
                  src={productImage || "/default-image.jpg"} // Fallback image
                  alt={productImage[0] || "Product Image"}
                  className="w-full h-full object-cover rounded"
                />
              ))}
            </div>
          ))}
            </div>

            {order?.orderDetails?.map((orderInfo, index) => (
            <div key={index} className="flex-1">
              <h3 className="text-lg font-semibold">{orderInfo.ProductName || "Product Name"}</h3>
              <p className="text-gray-500">${orderInfo.ProductPrice?.toFixed(2) || "0.00"}</p>
              <p className="text-gray-600 mt-2">{orderInfo.ProductDescription || "No description available"}</p>
            </div>
          ))}
  

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Delivery address</h4>
              <p className="text-gray-600">{order.userId.fullName || "Order Customer" }</p>
              <p className="text-gray-600">{order.userId.addressLine1 || "Address"}</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6">Status: {order.orderStatus || "Status" }</p>

          <div className="relative mt-3">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: order.progress }}
              ></div>
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
            <p className="text-gray-600">Floyd Miles</p>
            <p className="text-gray-600">7363 Cynthia Pass</p>
            <p className="text-gray-600">Toronto, ON N3Y 4H8</p>
          </div>

          {/* Payment Information */}
          <div>
            <h4 className="text-lg font-semibold">Payment information</h4>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">VISA</span>
              <p className="text-gray-600">Ending with 4242</p>
            </div>
            <p className="text-gray-600">Expires 02 / 24</p>
          </div>

          {/* Order Summary */}
          <div>
          <h4 className="text-lg font-semibold">Order Summary</h4>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${orderData?.[0]?.subtotal?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${orderData?.[0]?.shipping?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${orderData?.[0]?.tax?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>Order Total</span>
            <span className="text-blue-600">
              ${((orderData?.[0]?.subtotal || 0) + (orderData?.[0]?.shipping || 0) + (orderData?.[0]?.tax || 0)).toFixed(2)}
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
