import React from "react";
import demoImage from "../../../public/RingImgs/imgR2M1.jpg"
const OrderDetail = () => {
    const orders = [
        {
          id: 1,
          image: demoImage,
          name: "Gold Twisted Ring",
          brand: "Goldsmiths",
          size: "10",
          qty: 1,
          price: 150.0,
          status: "Delivered",
          deliveryDate: "25th Feb 2025",
        },
        {
          id: 2,
          image: demoImage,
          name: "Gold Twisted Ring",
          brand: "Goldsmiths",
          size: "M",
          qty: 1,
          price: 150.0,
          status: "Pending",
          deliveryDate: "28th Feb 2025",
        },
        {
          id: 3,
          image: demoImage,
          name: "Gold Twisted Ring",
          brand: "Goldsmiths",
          size: "L",
          qty: 1,
          price: 150.0,
          status: "Cancelled",
          deliveryDate: "N/A",
        },
      ];

      const getStatusColor = (status) => {
        switch (status) {
          case "Delivered":
            return "text-green-600";
          case "Pending":
            return "text-yellow-500";
          case "Cancelled":
            return "text-red-500";
          default:
            return "text-gray-500";
        }
      };

  return (
    <div className="p-10 pr-12 rounded-lg shadow-md bg-white w-full mx-auto">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold">Order History</h2>
          <p className="text-sm text-gray-500">Order Date: 20th Feb 2025</p>
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-300 px-4 py-2 rounded-lg text-gray-600">
            Show Invoice
          </button>
        </div>
      </div>

      {/* Order Details */}
      {orders.map((order) => (
        <div key={order.id} className="flex items-center border-b p-4">
          {/* Product Image */}
          <img src={order.image} alt={order.name} className="w-[12%] h-full" />

          {/* Product Details */}
          <div className="ml-8  flex-1 col">
            <h3 className="text-2xl font-semibold">{order.name}</h3>
            <p className="text-lg text-gray-500 mt-3">By: {order.brand}</p>
            <p className="text-lg text-gray-500 flex mt-5 gap-3">Wtg: {order.size} | Qty: {order.qty} <p className="text-md font-semibold text-black">Price: {order.price.toFixed(2)}</p></p>
           
          </div>

          {/* Centered Status Block */}
          <div className="flex row col gap-2 items-center">
            <p className="text-gray-400 text-sm">Status</p>
            <p className={`font-semibold ${getStatusColor(order.status)}`}>
              {order.status}
            </p>
          </div>

          {/* Delivery Date */}
          <div className="ml-6 text-right flex col row gap-2">
            <p className="text-gray-500 text-sm">Delivery Expected by</p>
            <p className="text-sm font-semibold">{order.deliveryDate}</p>
          </div>
        </div>
      ))}

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6 border-t pt-4">
        {/* Cancel Order Button */}
        <div className="flex items-center text-red-500 cursor-pointer">
          <span className="text-xl font-bold mr-2">×</span>
          <p className="text-sm">Cancel Order</p>
        </div>



        {/* Total Price */}
        <p className="text-lg font-semibold">
          Total Price: <span className="text-black">{orders.reduce((total, order) => total + order.price, 0).toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
