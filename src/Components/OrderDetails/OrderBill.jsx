import React, { useState, useEffect } from "react";
import "./OrderBill.css";
import {X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OrderBill = ({ selectedOrder, handleClose, invoiceRef  }) => {
  const [orderStatusInfo, setOrderStatusInfo] = useState("...");
  const [orderStatusTitle, setOrderStatusTitle] = useState("...");

  useEffect(() => {
    if (!selectedOrder?.orderStatus) return;

    switch (selectedOrder.orderStatus) {
      case "Pending":
        setOrderStatusInfo("Thank you for your order! Your order is currently pending and being processed. We will notify you once it is confirmed.");
        setOrderStatusTitle("Your Order is Being Processed");
        break;
      case "Canceled":
        setOrderStatusInfo("We regret to inform you that your order has been canceled. If this was unintentional, please contact our support team.");
        setOrderStatusTitle("Your Order Has Been Canceled");
        break;
      case "Success":
        setOrderStatusInfo("Thank you! Your purchase has been successfully processed. Please find the receipt below.");
        setOrderStatusTitle("Your Order Has Been Confirmed!");
        break;
      default:
        setOrderStatusInfo("Loading...");
        break;
    }
  }, [selectedOrder?.orderStatus]);

  const totalOrderPrice = selectedOrder?.orderDetails?.reduce((acc, order, index) => {
    const quantity = selectedOrder.products?.[index]?.orderQuantity || 1;
    return acc + order.ProductPrice * quantity;
  }, 0);
  

const handleDownload = async () => {
  if (!invoiceRef?.current) return;

  const buttonsToHide = invoiceRef.current.querySelectorAll('.download-hide');
  buttonsToHide.forEach(btn => btn.style.display = 'none');

  const canvas = await html2canvas(invoiceRef.current, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    windowWidth: 1024, // simulate full screen
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "JPEG", 0, 0, width, height);
  pdf.save("PBS_Invoice.pdf");

  buttonsToHide.forEach(btn => btn.style.display = '');
};


  return (
<div
  ref={invoiceRef}
  className="bg-white mx-auto invoice-container w-full  p-6 rounded-lg shadow-md print:max-w-none print:shadow-none print:p-0"
>
     <button
  onClick={handleClose}
  className="absolute top-10 right-10  text-gray-500 hover:text-purple-800 text-2xl font-bold download-hide"
>
  <X />
</button>

<button
  onClick={handleDownload}
  className="absolute top-10 right-20 text-gray-500 hover:text-purple-800 text-2xl font-bold download-hide"
  title="Download Invoice"
>
  <Download />
</button>

  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6">
<img 
  src="/WebLogo/PBS_LOGO.png" 
  alt="PBS Logo" 
  className="w-16 sm:w-20 md:w-24 max-w-[120px] h-auto mb-4 sm:mb-0"
/>


    <div className="text-left sm:text-right">
      <p className="text-xs text-gray-500">Order No:</p>
      <p className="text-sm font-bold text-gray-800">{selectedOrder._id || "0000000000"}</p>
      <p className="text-xs text-gray-500">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
    </div>
  </div>

  {/* Status */}
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-[#432a58]">#{orderStatusTitle}</h2>
    <p className="text-sm text-gray-700 mt-1">
      Hi <span className="font-semibold">{selectedOrder.userId.fullName || "Customer"}</span>, {orderStatusInfo}
    </p>
  </div>

  {/* Order Details */}
  {selectedOrder?.orderDetails?.length > 0 ? (
    <div className="mt-8">
      <h3 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Order Items</h3>
      <div className="flex flex-col gap-6">
        {selectedOrder.orderDetails.map((order, index) => {
          const quantity = selectedOrder.products?.[index]?.orderQuantity || 1;
          const price = selectedOrder.products?.[index]?.price;
          const totalPrice = selectedOrder.products?.[index]?.price * quantity;
          const productWeight = selectedOrder.products?.[index]?.orderProductWeight || 0;
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-4">
              <div className="flex gap-4">
                <img
                  src={order.ProductImages?.[0] || "/default-image.jpg"}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded border"
                />
                <div>
                  <p className="text-sm font-medium">{order.ProductName}</p>
                  <p className="text-xs text-gray-500">Qty: {quantity} | Gram: {productWeight}</p>
                  <p className="text-xs text-gray-500">Dec: {order.ProductDescription} </p>
                  <p className="text-xs font-medium">Price: {price} </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-800 text-right sm:text-left">
                ₹{totalPrice}
              </p>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="mt-6 text-right space-y-1 border-t pt-4">
        <p className="text-sm text-gray-700">
          Total: <span className="font-semibold">₹{selectedOrder.totalAmount?.toFixed(2) || 0}</span>
        </p>
        <p className="text-sm text-gray-700">
          Discount: <span className="font-semibold text-green-600">₹{(selectedOrder.discount)?.toFixed(2) || 0}</span>
        </p>
        <p className="text-lg font-bold text-gray-900">
          Grand Total: ₹{selectedOrder.totalAmountWithDiscount?.toFixed(2) || 0}
        </p>
      </div>
    </div>
  ) : (
    <p className="text-sm text-gray-500 mt-6 text-center">No items in this order.</p>
  )}

  {/* Billing Info */}
  <div className="mt-8 p-4 border rounded-md bg-gray-50">
    <h4 className="text-sm font-semibold text-gray-900 mb-2">Billing Address</h4>
    <p className="text-sm text-gray-600 leading-relaxed">
      {selectedOrder.userId.addressLine1 || "Not available"},
      <br />
      {selectedOrder.userId.addressLine2}, {selectedOrder.userId.city}
      <br />
      {selectedOrder.userId.zipCode}
    </p>
  </div>

  {/* Footer */}
  <div className="text-center mt-8 border-t pt-4">
    <p className="text-sm text-gray-700">
      Thank you for shopping with us! <br />
      <span className="font-semibold text-[#432a58]">– PBS Gold Team</span>
    </p>
    <p className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer">
      Need help? Contact our Support Team
    </p>
  </div>
</div>


  );
};

export default OrderBill;
