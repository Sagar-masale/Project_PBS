import React from "react";
import Ringsdata from "../Ringpage/RingData";
import './CartBox.css';

import { useState,useEffect } from "react";

function CartBox({
  Img,
  Title='.......'  ,
  Price ='...' ,
  Dec='...',
  ImgM1,
  ImgM2,
  ImgM3
}){
  // console.log(Img);
  const [image, setImage]=useState(Img);
  useEffect(() => {
    setImage(Img);
  }, [Img]);
  const GetImg=(curImg)=>{
    setImage(Img=curImg);
    // console.log(curImg);
  }
  const ExitCartButton=()=>{
    document.querySelector('.CartBox').classList.toggle('CartBox-Show')
  }
  return(
    <>
  
    {
      Ringsdata.map((curImg, setIndex)=>{
        // console.log(curEle);

        return(
          <div className="CartBox ">
      
      
          <div className="relative z-10" role="dialog" aria-modal="true">
          
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" aria-hidden="true"></div>
          
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          
                <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center  bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button type="button" onClick={ExitCartButton} className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
          
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 Cover">
                      <div className=" Main-Img aspect-h-3 aspect-w-2 overflow-hidden rounded-lg  sm:col-span-4 lg:col-span-5">
                        <img src={image} alt="Two each of gray, white, and black shirts arranged on table." className="object-cover object-center rounded-lg"/>
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{Title}</h2>
          
                        <section aria-labelledby="information-heading" className="mt-2">
                          <h3 id="information-heading" className="sr-only">Product information</h3>
          
                          <p className="text-2xl text-gray-900">₹ {Price} </p>
          
                        
                          <div className="mt-6">
                            <h4 className="sr-only"></h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                             
                                <svg className="h-5 w-5 flex-shrink-0 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{color:"#FF5733"}}>
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                                <svg className="h-5 w-5 flex-shrink-0 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"style={{color:"#FF5733"}}>
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                                <svg className="h-5 w-5 flex-shrink-0 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"style={{color:"#FF5733"}}>
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                                <svg className="h-5 w-5 flex-shrink-0 " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"style={{color:"#FF5733"}}>
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                                <svg className="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                </svg>
                              </div>
                            
                              <a href="#" className="ml-3 text-sm font-medium" style={{color:"#832729"}}>0 reviews</a>
                            </div>
                          </div>
                        </section>
          
                        <section aria-labelledby="options-heading" className="mt-10">
                          <h3 id="options-heading" className="sr-only">Product options</h3>
          
                          <form>
                          
                            <fieldset aria-label="Choose a color">
                              <legend className="text-sm font-medium text-gray-900">Images</legend>
          
                              <div className="mt-4 flex items-center space-x-3">
                           
                                <label aria-label="White" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                                  <input type="radio" name="color-choice" value="White" className="sr-only"/>
                                  <span aria-hidden="true" className="h-20 w-20 rounded-full border border-black border-opacity-10 flex justify-center align-center  Mimg"key={setIndex}><img src={ImgM1} className="w-90 rounded-full " onClick={()=>GetImg(ImgM1)}/></span>
                                </label>
                              
                                <label aria-label="Gray" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                                  <input type="radio" name="color-choice" value="Gray" className="sr-only"/>
                                  <span aria-hidden="true" className="h-20 w-20 rounded-full border border-black border-opacity-10 flex justify-center align-center  Mimg"key={setIndex}><img src={ImgM2} className="w-90 rounded-full "onClick={()=>GetImg(ImgM2)}/></span>
                                </label>
                          
                                <label aria-label="Black" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none">
                                  <input type="radio" name="color-choice" value="Black" className="sr-only"/>
                                  <span aria-hidden="true" className="h-20 w-20 rounded-full border border-black border-opacity-10 flex justify-center align-center  Mimg"key={setIndex}><img src={ImgM3} className="w-90 rounded-full "onClick={()=>GetImg(ImgM3)}/></span>
                                </label>
                              </div>
                            </fieldset>
          
                         
                            <fieldset className="mt-10" aria-label="Choose a size">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-bold text-gray-900">Description</div>
                                <a href="#" className="text-sm font-medium" style={{color:"#832729"}}>Size guide</a>
                              </div>
          
                              <div className="w-full mt-4">
                                <p className="RingDes"> {Dec} </p>
                              </div>
                            </fieldset>
          
                            <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-white hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2" style={{backgroundColor:"#832729", border:"none"}}>Add to Cart</button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          
            
          
              </div>
        
        )
     
  
      })
    }
    </>
  )
}
export default CartBox