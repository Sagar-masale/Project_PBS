import React, { useState, useEffect } from "react";
import ringIg1 from "../../../public/RingImgs/imgR19M1.jpg";
import ringIg2 from "../../../public/RingImgs/imgR20M1.jpg";
import "./OrderBill.css"
import billLogo1 from "../../../public/billLogo2.png"

const OrderBill = ({selectedOrder}) => {
  const orderBillDetails = {
    orderId: "0123123123",
    customerName: "Sagar",
    totalAmount: 2400,
    shippingCharges: 100,
    shippingAddress: "No - 10 A, Street Name, Area Name, City Name, State Name, Country.",
    billingAddress: "No - 10 A, Street Name, Area Name, City Name, State Name, Country.",
    items: [
      {
        name: "Women’s Running Shoe",
        quantity: 1,
        color: "Blue",
        size: "M",
        deliveryDate: "13/07/2020",
        price: 1200,
        image: ringIg1,
      },
      {
        name: "Men’s Running Shoe",
        quantity: 1,
        color: "Black",
        size: "M",
        deliveryDate: "18/07/2020",
        price: 1200,
        image: ringIg2,
      },
    ],
  };

  const [orderStatusInfo, setOrderStatusInfo] = useState("...");
  const [orderStatusTitle, setOrderStatusTitle] = useState("...");

  useEffect(() => {
    if (!selectedOrder?.orderStatus) return;

    switch (selectedOrder.orderStatus) {
      case "Pending":
        setOrderStatusInfo(
          "Thank you for your order! Your order is currently pending and is being processed. We will notify you once it is confirmed."
        );
        setOrderStatusTitle(
          "Your Order is Being Processed"
        );
        break;
      case "Canceled":
        setOrderStatusInfo(
          "We regret to inform you that your order has been canceled. If this was unintentional or you need further assistance, please contact our support team."
        );
        setOrderStatusTitle(
          "Your Order Has Been Canceled"
        );
        break;
      case "Success":
        setOrderStatusInfo(
          "Thank you for your order. Your purchase has been successfully processed. Please find below the receipt for your records."
        );
        setOrderStatusTitle(
          "Your Order Has Been Confirmed!"
        );
        break;
      default:
        setOrderStatusInfo("Loading...");
        break;
    }
  }, [selectedOrder?.orderStatus]);

  if (!orderBillDetails) {
    return <p className="text-center text-red-500">Order data is missing!</p>;
  }


  const totalOrderPrice = selectedOrder?.orderDetails?.reduce((acc, order, orderIndex) => {
    const quantity = selectedOrder.products?.[orderIndex]?.orderQuantity || 1;
    const totalPrice = order.ProductPrice * quantity;
    return acc + totalPrice;
  }, 0); 
  
  return (
    <div className="max-w-2xl mx-auto bg-white  shadow-lg rounded-xl p-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <img src={billLogo1} alt="PBS" className="w-[110px]" />
        <p className="text-gray-600 text-sm">
          Order No : <span className="font-semibold">{selectedOrder._id || "0000000000"}</span>
        </p>
      </div>

      {/* Order Confirmation */}
      <div className="mt-6">
        <h1 className="text-xl font-bold text-gray-900">#! {orderStatusTitle} </h1>
        <p className="text-black  mt-2">
          Hi <h2 className="BillerName font-semibold text-[#432a58]">{selectedOrder.userId.fullName || "Customer"},</h2>
          {orderStatusInfo}
        </p>
      </div>

      {/* Order Details */}
      {selectedOrder?.orderDetails?.length > 0 ? (
        <div className="mt-6 border rounded-lg p-4">
          <div className="flex justify-between text-gray-700 font-semibold border-b pb-2">
            <p>Order Details</p>
            <p>Date</p>
            <p>Price</p>
          </div>

          {selectedOrder?.orderDetails?.map((order, orderIndex) => {
      const quantity = selectedOrder.products?.[orderIndex]?.orderQuantity || 1;
      const totalPrice = order.ProductPrice * quantity;

  return (
    <div key={orderIndex} className="flex justify-between items-center border-b py-4">
      <div className="flex items-center gap-4">
        <img
          src={order.ProductImages?.[0] || "/default-image.jpg"} // Show only the first image
          alt={`Product Image ${orderIndex}`}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="w-[150px]">
          <p className="font-semibold text-[14px]">{order.ProductName}</p>
          <p className="text-sm text-gray-600">Qty: {quantity}</p>
          <p className="text-sm text-gray-600">Gram: {order.size || "10g"}</p>
        </div>
      </div>
      <p className="text-gray-600 relative right-10">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-900 font-semibold">₹{totalPrice}</p>
    </div>
  );
})}




          {/* Price Summary */}
          <div className="mt-4 space-y-2 text-right">
            <p className="text-gray-700">
              Total : <span className="font-semibold">₹ { totalOrderPrice.toFixed(2) || 0}</span>
            </p>
            <p className="text-gray-700">
              Save : <span className="font-semibold">₹ { (totalOrderPrice - selectedOrder.totalAmount ).toFixed(2) || 0}</span>
            </p>
            <p className="text-lg font-bold text-gray-900">
              Grand Total : ₹ {selectedOrder.totalAmount?.toFixed(2) || 0}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No items in the order.</p>
      )}

      {/* Billing Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900">Billing Address:</h4>
          <p className="text-gray-600">
            {selectedOrder.userId.addressLine1 || "Not available"},
            <br /> { selectedOrder.userId.addressLine2 }, {selectedOrder.userId.city} <br /> 
            {selectedOrder.userId.zipCode}
            </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-gray-700 text-sm text-center">
        Hope to see you soon, <br /> <span className="font-semibold">PBS Gold Team</span>
      </p>
      <p className="mt-2 text-center text-sm text-blue-600 cursor-pointer">
        Need help? Contact our Support Team
      </p>
    </div>
  );
}

export default OrderBill;


