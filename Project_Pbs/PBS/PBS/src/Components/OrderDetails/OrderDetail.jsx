import React from "react";

const OrderDetail = () => {
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
    {
      id: 1253366,
      productName: "Nomad Tumbler",
      price: 3255.00,
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
      {orders.map((order) => (
        <div key={order.id} className="mb-10 border-b pb-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">
              Order <span className="text-[#4f3267]">#{order.id}</span>
            </h2>
            <a href="#" className="text-blue-500 hover:underline">
              View invoice →
            </a>
          </div>

          <div className="flex flex-col sm:flex-row mt-4 gap-6">
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={order.image}
                alt={order.productName}
                className="w-full h-full object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{order.productName}</h3>
              <p className="text-gray-500">${order.price.toFixed(2)}</p>
              <p className="text-gray-600 mt-2">{order.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Delivery address</h4>
              <p className="text-gray-600">{order.customer}</p>
              <p className="text-gray-600">{order.address}</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6">Status: {order.status}</p>

          <div className="relative mt-3">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: order.progress }}
              ></div>
            </div>
          </div>
        </div>
      ))}

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
              <span>${orders[0].subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${orders[0].shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${orders[0].tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Order total</span>
              <span className="text-blue-600">{(orders[0].subtotal + orders[0].shipping + orders[0].tax).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
