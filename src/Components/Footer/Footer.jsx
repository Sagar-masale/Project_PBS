import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <footer className="w-full FooterContainer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
            <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <div className="Fotter-Title-Box flex align-items-center">
                <span className="material-symbols-outlined font-bold text-4xl">
                  progress_activity
                </span>
                <span className="Footer-Pbs-Name ml-5 text-2xl">
                  PBS
                </span>
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

            <div className="lg:mx-auto text-left ">
              <h4 className="text-lg text-gray-900 font-medium mb-7">
                Products
              </h4>
              <ul className="text-sm transition-all duration-500">
                <Link to="/Ring-Page"><li className="mb-6"><span className="text-gray-600 hover:text-gray-900">Rings</span></li></Link>
                <Link to="/Earrings-Page"><li className="mb-6"><span className="text-gray-600 hover:text-gray-900">Earrings</span></li></Link>
                <Link to="/Bangles-Page"><li><span className="text-gray-600 hover:text-gray-900">Bangles</span></li></Link>
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

            <div className="lg:mx-auto text-left ">
              <h4 className="text-lg text-gray-900 font-medium mb-7">
                Subscribe
              </h4>
              <p className="text-sm text-gray-500 leading-6 mb-7">
                Subscribe to get the latest news from us
              </p>
              <Link
                to="/subscribe"
                className="subscribe-button flex items-center justify-center gap-2 border border-[#4f3267] rounded-full py-3 px-6 lg:mx-0 text-sm text-[#4f3267] font-semibold transition-all duration-500 hover:bg-[#9d6dc5]"
              >
                Subscribe
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
          </div>

          <div className="py-7 border-t border-gray-200">
            <div>
              <span className="text-sm text-gray-500">
                ©<Link to="/">PBS</Link> 2024, All rights reserved.
              </span>
<div className=" mt-4 space-x-4 s lg:mt-0">
  <a
    href="https://www.instagram.com/p.b.salegaon_jewellers_/"
    className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center  hover:bg-gradient-to-b from-gray-200 to-gray-400"
    target="_blank"
    rel="noopener noreferrer"
  >
<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
  alt="instagram logo"
  className="w-8 h-8 rounded-full  mix-blend-multiply"
/>

  </a>
</div>

            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
