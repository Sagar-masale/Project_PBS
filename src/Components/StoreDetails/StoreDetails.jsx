import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";

const StoreDetails = () => {
  return (
    <div className="text-[#4f3267] bg-[rgb(246,239,246)] py-14 px-4 sm:px-6 md:px-12 mb-10">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
        Visit Our Store
      </h1>

      {/* Store Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
        <div className="px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-3">
            <MapPin className="text-purple-800 w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Store Address</h3>
          <p className="text-sm sm:text-base leading-relaxed">
            PBS Jewellers, Main Bazaar Road,<br />
            Salegaon, Maharashtra - 431518
          </p>
        </div>

        <div className="px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-pink-200 rounded-full flex items-center justify-center mb-3">
            <Clock className="text-pink-800 w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Opening Hours</h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Mon – Sat: 10:00 AM – 8:00 PM<br />
            Sunday: Closed
          </p>
        </div>

        <div className="px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-yellow-200 rounded-full flex items-center justify-center mb-3">
            <Phone className="text-yellow-800 w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Phone: +91 9146455820<br />
            Email: contactpbs@gmail.com
          </p>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto">
{/* Google Map iframe */}

<div className="max-w-4xl mx-auto mt-8">
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Find Us On Map</h2>
  <div className="rounded-xl overflow-hidden shadow-lg border border-purple-200">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d361.59301664203775!2d75.91071312526216!3d17.678403135562405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5da6275becae5%3A0x20f85ce7258a4a12!2sKanna%20Chowk%2C%20Solapur%2C%20Maharashtra%20413002!5e1!3m2!1sen!2sin!4v1751267238754!5m2!1sen!2sin" 
      width="100%"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

        <p className="text-center text-sm text-gray-600 mt-2">
         Click on the top-left 'View larger map' to see directions on Google Map.
        </p>
      </div>
    </div>
  );
};

export default StoreDetails;
