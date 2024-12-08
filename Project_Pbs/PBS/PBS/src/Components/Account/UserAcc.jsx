import React, { useContext } from 'react';
import axios from 'axios';
import './UserAcc.css'; // Custom styles for better design
import ProfileContext from '../Context/ProfileContext';

function UserAcc() {
  const {userData} = useContext(ProfileContext)
  // console.log('profileeee dataa', userData);
  





  return (
    <>
        <div className='profile-container'>
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold text-gray-900">Welcome {userData.fullName?.split(' ')[0] || 'Guest'}</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500"></p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Full name</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {userData.fullName || ''} </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Email</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {userData.email || ''} </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Phone No</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {userData.phoneNumber || ''} </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Salary expectation</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">About</h3>
            <span className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </span>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <h3 className="text-sm/6 font-medium text-gray-900">Order data</h3>
            <span className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon aria-hispanen="true" className="size-5 shrink-0 text-gray-400" /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Download your complete order history for your records.</span>
                      <span className="shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon aria-hispanen="true" className="size-5 shrink-0 text-gray-400" /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Save your order details with one click.</span>
                      <span className="shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </span>
          </div>
        </dl>
      </div>
    </div>
    
    </>
  )
}

export default UserAcc
