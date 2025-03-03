import React from "react";
import ringIg1 from "../../../public/RingImgs/imgR19M1.jpg";
import ringIg2 from "../../../public/RingImgs/imgR20M1.jpg";

function OrderBill() {
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

  if (!orderBillDetails) {
    return <p className="text-center text-red-500">Order data is missing!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <img src="/logo.png" alt="Company Logo" className="h-10" />
        <p className="text-gray-600 text-sm">
          Order No : <span className="font-semibold">{orderBillDetails.orderId || "0000000000"}</span>
        </p>
      </div>

      {/* Order Confirmation */}
      <div className="mt-6">
        <h1 className="text-xl font-bold text-gray-900">Yay! Your Order Is Confirmed</h1>
        <p className="text-gray-700 mt-2">
          Hi {orderBillDetails.customerName || "Customer"},<br />
          Thank you for your order. We will send you a confirmation when your order ships.
          Please find below the receipt of your purchase.
        </p>
      </div>

      {/* Order Details */}
      {orderBillDetails.items?.length > 0 ? (
        <div className="mt-6 border rounded-lg p-4">
          <div className="flex justify-between text-gray-700 font-semibold border-b pb-2">
            <p>Order Details</p>
            <p>Date</p>
            <p>Price</p>
          </div>

          {orderBillDetails.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/default-image.jpg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                </div>
              </div>
              <p className="text-gray-600">{item.deliveryDate}</p>
              <p className="text-gray-900 font-semibold">₹ {item.price.toFixed(2)}</p>
            </div>
          ))}

          {/* Price Summary */}
          <div className="mt-4 space-y-2 text-right">
            <p className="text-gray-700">
              Total : <span className="font-semibold">₹ {orderBillDetails.totalAmount?.toFixed(2) || 0}</span>
            </p>
            <p className="text-gray-700">
              Shipping Charges : <span className="font-semibold">₹ {orderBillDetails.shippingCharges?.toFixed(2) || 0}</span>
            </p>
            <p className="text-lg font-bold text-gray-900">
              Grand Total : ₹ {(orderBillDetails.totalAmount + orderBillDetails.shippingCharges).toFixed(2) || 0}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No items in the order.</p>
      )}

      {/* Shipping & Billing Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900">Shipping Address:</h4>
          <p className="text-gray-600">{orderBillDetails.shippingAddress || "Not available"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900">Billing Address:</h4>
          <p className="text-gray-600">{orderBillDetails.billingAddress || "Not available"}</p>
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