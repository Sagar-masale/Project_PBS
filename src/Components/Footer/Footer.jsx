import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";
import { Instagram, MessageCircle, Facebook  } from "lucide-react";
const Footer = () => {
  return (
    <>
      <footer className="w-full FooterContainer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
            <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <div className="Fotter-Title-Box flex align-items-center gap-2">
              <div className="flex items-center justify-center">
                <img 
                  src="./WebLogo/PBS_LOGO.png" 
                  alt="PBS Logo" 
                  className="w-12 sm:w-20 md:w-22 h-auto object-contain"
                />
              </div>

        <Link to={'/'} className='cursor-pointer'>
          <div>
          <p
            className="text-xl Web_Logo sm:text-3xl md:text-4xl text-[#4F3267] tracking-wide"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            PBSalegaon
          </p>
        </div>
        </Link>
              </div>
              <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-left lg:text-left">
                Have any query? Please contact us. Our team is here to assist
                you with any questions or concerns. Feel free to reach out for
                personalized support and guidance.
              </p>
              <Link
                to="/contact"
                className="py-2.5 px-5 h-9 block bg-[#4f3267] rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-[#432a58] lg:mx-0"
              >
                Contact us
              </Link>
            </div>

            <div className="lg:mx-auto text-left ">
              <h4 className="text-lg text-gray-900 font-medium mb-7">
                Quick links
              </h4>
              <ul className="text-sm transition-all duration-500">
                <Link to="/"><li className="mb-6"><span className="text-gray-600 hover:text-gray-900">Home</span></li></Link>
                <Link to="/About"><li className="mb-6"><span className="text-gray-600 hover:text-gray-900">About</span></li></Link>
                <Link to="/pricing"><li><span className="text-gray-600 hover:text-gray-900">Pricing</span></li></Link>
              </ul>
            </div>

            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-900 font-medium mb-7">
                Products
              </h4>
              <ul className="text-sm transition-all duration-500 grid grid-cols-2 md:grid-cols-2 gap-y-4">
                <li>
                  <Link to="/Ring-Page" className="text-gray-600 hover:text-gray-900 transition">Rings</Link>
                </li>
                <li>
                  <Link to="/Earrings-Page" className="text-gray-600 hover:text-gray-900 transition">Earrings</Link>
                </li>
                <li>
                  <Link to="/Bangles-Page" className="text-gray-600 hover:text-gray-900 transition">Bangles</Link>
                </li>
                <li>
                  <Link to="/Pendants-Page" className="text-gray-600 hover:text-gray-900 transition">Pendants</Link>
                </li>
                <li>
                  <Link to="/Chains-Page" className="text-gray-600 hover:text-gray-900 transition">Chains</Link>
                </li>
                <li>
                  <Link to="/Mangalsutra-Page" className="text-gray-600 hover:text-gray-900 transition">Mangalsutra</Link>
                </li>
              </ul>

            </div>

            <div className="lg:mx-auto text-left ">
              <h4 className="text-lg text-gray-900 font-medium mb-7">
                Support
              </h4>
              <ul className="text-sm transition-all duration-500">
                <Link to="/support"><li className="mb-6"><span className="text-gray-600 hover:text-gray-900">Customer Support</span></li></Link>
                <Link to="/terms_conditions"><li className="mb-6"><span className="text-gray-600 hover:text-gray-900">Terms & Conditions</span></li></Link>
                <Link to="/privacy"><li><span className="text-gray-600 hover:text-gray-900">Privacy Policy</span></li></Link>
              </ul>
            </div>

<div className="w-full">
  <h4 className="text-lg text-gray-900 font-medium mb-7 w-fit">
  Connect with us
</h4>

  <div className="flex justify-between w-[75%] md:justify-between ">
    {/* Facebook */}
    <a
      href="https://www.facebook.com/pbsjewellers"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-gray-600 font-medium text-sm md:text-base hover:text-[#6a2598] transition"
    >
      <Facebook className="w-6 h-6 text-[#581C87]" />
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/917775912356"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-gray-600 font-medium text-sm md:text-base hover:text-[#6a2598] transition"
    >
      <MessageCircle className="w-6 h-6 text-[#581C87]" />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/p.b.salegaon_jewellers_/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-gray-600 font-medium text-sm md:text-base hover:text-[#6a2598] transition"
    >
      <Instagram className="w-6 h-6 text-[#581C87]" />
    </a>
  </div>
</div>



          </div>

          <div className="py-7 border-t border-gray-200">
            <div>
              <span className="text-sm text-gray-500">
                ©<Link to="/">PBS</Link> 2025, All rights reserved.
              </span>

            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
