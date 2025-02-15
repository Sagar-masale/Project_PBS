import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../PageLoader/Loading';

const ForgotPassword = ({ onResetSuccess, closeForgotEmailBox }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter Email/Phone, Step 2: Enter OTP, Step 3: Set New Password
  const [isLoading, setIsLoading] = useState(false);

  const requestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToastId = toast.loading('Sending OTP...');


    try {
      await axios.post('http://localhost:8000/api/v1/auth/request-otp', {
        emailOrPhone,
      });
      toast.dismiss(loadingToastId);
      toast.success('OTP sent successfully!', {
        duration: 3000,
      });
      setStep(2);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      toast.dismiss(loadingToastId);
      toast.error(error.response?.data?.message || 'Failed to send OTP.',{
        duration:3000,
      } )
    } finally {
      setIsLoading(false);
    }
  };


  const verifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const VerifyingToastId = toast.loading('Verifying OTP...');
    try {
      await axios.post('http://localhost:8000/api/v1/auth/verify-otp-reset-password', {
        emailOrPhone,
        otp,
        newPassword,
      });
      toast.dismiss(VerifyingToastId);
      onResetSuccess();
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.dismiss(VerifyingToastId);
      toast.error(error.response?.data?.message || 'Failed to reset password.',{
        duration:3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <Toaster
       position="top-right" 
       reverseOrder={false} 
       />
      {isLoading && <Loading />}
      <div className="ForgotPassBox bg-white w-[25%] p-4 rounded-md flex flex-col gap-4">
        <span 
        className="close-Forgot-Box material-symbols-outlined relative ml-auto cursor-pointer"
        onClick={closeForgotEmailBox} 
        >
          close
        </span>
        <h2 className="Forgot-Title text-xl mt-[-5%]"
        
        >
          Forgot Password
        </h2>
        {step === 1 && (
          <form onSubmit={requestOtp}>
          
            <input
              type="text"
              placeholder="Enter Your Email or Phone"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="Input-User focus:ring-0 outline-none "
            />
            <button type="submit" className="w-full Login-Button mt-4 text-white rounded-md cursor-pointer duration-200 Button-Submit">
              Request OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtpAndResetPassword}>
            <h2 className="text-2xl mb-4">Verify OTP & Reset Password</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              name='otp'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="Input-User focus:ring-0"
            />
            <input
              type="password"
              placeholder="Enter New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="Input-User focus:ring-0 mt-4"
            />
            <button type="submit" className="Login-Button mt-4 text-white rounded-md cursor-pointer duration-200 Button-Submit">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
