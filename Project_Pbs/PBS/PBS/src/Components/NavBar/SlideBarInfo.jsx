import React from 'react'

function SlideBarInfo({
    Title,
    InfoOne,
    InfoTwo,
    InfoThree,
    InfoFour,
    InfoFive,
    InfoSix
}) {
    const ShowGoldOPT = (e) => {
        // Logic for ShowGoldOPT
        console.log(e.target.className);
        
        
        document.getElementById("Login-Gold-Info").classList.toggle("Show-Gold-Opt");
        document.getElementById("rotate-arrow-List-Gold").classList.toggle("Rotate-Arrow");
      };
   
  return (
    <>
           <div className="In-Login-Box-Info">
            <h6 className="information-link-head link-Head-Width Login-Names-In-Box" id="Gold-Name" style={{ lineHeight: 'normal', fontSize: '0.9rem', color: '#af5254' }}>
              {Title}
            </h6>
            <span className="material-symbols-outlined Show-InBox-Info" id="rotate-arrow-List-Gold" onClick={ShowGoldOPT}>
              arrow_forward_ios
            </span>
          </div>
          <div className="Show-Login-Box Show-Gold-Opt Show-Login-Box2 " id="Login-Gold-Info">
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">{InfoOne}</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">{InfoTwo}</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">{InfoThree}</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">{InfoFour}</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">{InfoFive}</a>
            <a href="#Track Your Order" className="Go-info-link menu-items-Name-Color">{InfoSix}</a>
           
          </div>
    </>
  )
}

export default SlideBarInfo
