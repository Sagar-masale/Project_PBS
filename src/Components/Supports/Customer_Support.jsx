import React from "react";
import { Phone, Mail, MapPin, MessageSquareText } from "lucide-react";

function Customer_Support() {
  const handleWhatsAppChat = () => {
    const message = encodeURIComponent("Hello! I need help.");
    window.open(`https://wa.me/917775912356?text=${message}`, "_blank");
  };

  return (
    <div className="bg-[#f6eff6] min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* WhatsApp Chat */}
        <div
          onClick={handleWhatsAppChat}
          className="bg-white hover:shadow-lg cursor-pointer transition rounded-2xl p-6 border text-center"
        >
          <div className="flex justify-center mb-3">
            <MessageSquareText className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Chat with us</h3>
          <p className="text-sm text-gray-500">Chat on WhatsApp anytime</p>
          <p className="text-sm text-purple-700 mt-2 font-medium">Click to open</p>
        </div>

        {/* Email */}
        <div className="bg-white hover:shadow-lg rounded-2xl p-6 border text-center">
          <div className="flex justify-center mb-3">
            <Mail className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Email us</h3>
          <p className="text-sm text-gray-500">We're happy to help</p>
          <p className="text-sm text-purple-700 mt-2 font-medium">supportpbs@gmail.com</p>
        </div>

        {/* Visit us */}
        <div className="bg-white hover:shadow-lg rounded-2xl p-6 border text-center">
          <div className="flex justify-center mb-3">
            <MapPin className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Visit us</h3>
          <p className="text-sm text-gray-500">Our store location</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d361.59301664203775!2d75.91071312526216!3d17.678403135562405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5da6275becae5%3A0x20f85ce7258a4a12!2sKanna%20Chowk%2C%20Solapur%2C%20Maharashtra%20413002!5e1!3m2!1sen!2sin!4v1751267238754!5m2!1sen!2sin"
            target="_blank"
            width={100}
            rel="noopener noreferrer"
            className="text-sm w-full text-purple-700 mt-2 font-medium underline inline-block"
          >
            View on Google Maps
          </iframe>
        </div>

        {/* Call us */}
        <div className="bg-white hover:shadow-lg rounded-2xl p-6 border text-center">
          <div className="flex justify-center mb-3">
            <Phone className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Call us</h3>
          <p className="text-sm text-gray-500">Mon–Sat, 10am–6pm</p>
          <p className="text-sm text-purple-700 mt-2 font-medium">+91 77759 12356</p>
        </div>
      </div>
    </div>
  );
}

export default Customer_Support;
