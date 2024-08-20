import React, { useEffect } from 'react';
import './Footer.css';

function Footer() {
  useEffect(() => {
    const toggleAddRemove = (addBtnId, removeBtnId, boxId) => {
      const addBtn = document.getElementById(addBtnId);
      const removeBtn = document.getElementById(removeBtnId);
      const infoBox = document.getElementById(boxId);

      const handleAddClick = () => {
        addBtn.classList.toggle('First-Add-Remove');
        removeBtn.classList.toggle('First-Remove-Add');
        infoBox.classList.toggle('Show-Third-Box-Clicked');
      };

      const handleRemoveClick = () => {
        addBtn.classList.toggle('First-Add-Remove');
        removeBtn.classList.toggle('First-Remove-Add');
        infoBox.classList.toggle('Show-Third-Box-Clicked');
      };

      addBtn.addEventListener('click', handleAddClick);
      removeBtn.addEventListener('click', handleRemoveClick);

      // Cleanup function to remove event listeners
      return () => {
        addBtn.removeEventListener('click', handleAddClick);
        removeBtn.removeEventListener('click', handleRemoveClick);
      };
    };

    // Apply the function to each set of buttons and boxes
    const cleanupFirst = toggleAddRemove('Scroll-first-Add', 'Scroll-First-remove', 'Clicked-One');
    const cleanupSecond = toggleAddRemove('Scroll-Second-Add', 'Scroll-Second-remove', 'Clicked-Two');
    const cleanupThird = toggleAddRemove('Scroll-Third-Add', 'Scroll-Third-remove', 'Clicked-Three');

    // Cleanup event listeners on unmount
    return () => {
      cleanupFirst();
      cleanupSecond();
      cleanupThird();
    };
  }, []);
  

  return (
    <>
      <div className="Occasion-category End-category">
        <div className="End-info">
          <div className="fit-info-box">
            <div className="info-box info-box1">
              <h6 className="information-link-head link-Head-Width">Quick links</h6>
              <span className="Scroll-Links-Add" id="Scroll-first-Add">+</span>
              <span className="Scroll-Links-Remove" id="Scroll-First-remove">-</span>
              <div className="Show-First-Box info-box info-box1 " id="Clicked-One">
                <a href="#Track Your Order" className="Track-Your-Order Go-info-link Go-info-link-On-Click-One ">Customer Reviews</a>
                <a href="#Return" className="Track-Your-Order Go-info-link Go-info-link-On-Click-One ">Store Locator</a>
                <a href="#Shipments" className="Go-info-link Go-info-link-On-Click-One ">Jewellery Care</a>
                {/* <a href="#Encircle Program" className="Go-info-link Go-info-link-On-Click-One ">Encircle Program</a> */}
                <a href="#Find a Store" className="Go-info-link Go-info-link-On-Click-One SetPadding">Find a Store</a>
              </div>
            </div>
            <div className="info-box info-box2">
              <h6 className="information-link-head link-Head-Width">Info</h6>
              <span className="Scroll-Links-Add" id="Scroll-Second-Add">+</span>
              <span className="Scroll-Links-Remove" id="Scroll-Second-remove">-</span>
              <div className="Show-Second-Box info-box info-box1" id="Clicked-Two">
                <a href="#Diamond Guide" className="Track-Your-Order Go-info-link Go-info-link-On-Click-Two">Shipping & Returns</a>
                <a href="#Blog" className="Go-info-link Go-info-link-On-Click-Two">Privacy Policy</a>
                <a href="#Gemstone Guide" className="Go-info-link Go-info-link-On-Click-Two">International Shipping</a>
                <a href="#Metal Guide" className="Go-info-link Go-info-link-On-Click-Two">FAQs & Support</a>
                <a href="#About PBS" className="Go-info-link Go-info-link-On-Click-Two SetPadding">About PBS</a>
              </div>
            </div>
            <div className="info-box info-box3">
              <h6 className="information-link-head link-Head-Width">Contact us</h6>
              <span className="Scroll-Links-Add" id="Scroll-Third-Add">+</span>
              <span className="Scroll-Links-Remove" id="Scroll-Third-remove">-</span>
              <div className="Show-Third-Box info-box info-box1" id="Clicked-Three">
                <a href="#Track Your Order" className="Track-Your-Order Go-info-link Go-info-link-On-Click-Third">PBSsupport@Goldcompany.com</a>
                <span className="contact-info Track-Your-Order Go-info-link Go-info-link-On-Click-Third SetPadding">For any suggestions, queries or complaints please contact us :<a href="#Track Your Order" className="Track-Your-Order Go-info-link Go-info-link-On-Click-Third">9999999999</a></span>
              </div>
            </div>
            <div className="info-box info-box4">
              <h6 className="information-link-head Follow-Us">Follow Us On
                <a href="#face" className="Go-FaceBook"><i className='bx bxl-facebook'></i></a>
                <a href="https://instagram.com/p.b.salegaon_jewellers_?igshid=NzZlODBkYWE4Ng==" className="Go-InstaGram"><i className='bx bxl-instagram'></i></a>
              </h6>
              <p className="store-timing">Store Timing 11.30 AM to 07:30 PMTuesday to Sunday</p>
            </div>
            <div className="row-Pbs-page-bottom">
              <div className="End-Intro">
                <a href="#terms" className="important-instructions">Terms & Conditions</a>|
                <a href="#Privacy Policy" className="important-instructions">Privacy Policy</a>|
                <a href="#Cookie Policy" className="important-instructions">Cookie Policy</a>|
                <a href="#Exercise Your Rights" className="important-instructions">Exercise Your Rights</a>|
                <a href="#Do not sell or share my personal data" className="important-instructions">Do not sell or share my personal data</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
