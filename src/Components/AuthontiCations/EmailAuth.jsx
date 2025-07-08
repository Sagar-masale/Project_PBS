import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../PageLoader/Loading";
import ProfileContext from "../Context/ProfileContext";
import SuccessAnimation from "../Animation/SuccessAnimation";
import toast from "react-hot-toast";
import './EmailAuth.css';
const EmailAuth = ({ enteredEmail, closeEmailAuth, onOtpVerified, decriptionOfEmailVerify, decriptionOfEmailVerifyImp }) => {
    const { userData } = useContext(ProfileContext);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("send");
    const [isVerified, setIsVerified] = useState(false);
    const [animationCompleted, setAnimationCompleted] = useState(false);
    

    let email = "";

    if (userData) {
      email = userData?.email || "";
    } else if (enteredEmail) {
      email = enteredEmail;
    }

    const sendOTP = async () => {
        if (loading) return;
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("https://backend-pbs-coo6.onrender.com/api/v1/auth/send-otp", { email });
            setMessage(response.data.message || `OTP sent to ${email}`);
            toast.success("OTP sent successfully");
            setStep("verify"); 
        } catch (error) {
            toast.error("Error sending OTP");
            setMessage(error.response?.data?.message || "Error sending OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        if (loading) return;
        setLoading(true);
        setMessage("");  // Clear previous messages
    
        try {
            const response = await axios.post("https://backend-pbs-coo6.onrender.com/api/v1/auth/verify-otp", { email, otp });
    
            setIsVerified(true);
    
            setTimeout(() => {
                toast.success("OTP verified successfully!");
                setMessage(response.data.message || "OTP verified successfully!");
            }, 2500);
    
            setTimeout(() => {
                setAnimationCompleted(true);
            }, 4500);
    
        } catch (error) {
            setTimeout(() => {  // Delay error message for 2 seconds
                toast.error("OTP verification failed!");
                setMessage(error.response?.data?.message || "OTP verification failed");
                setLoading(false);  // Stop loading after showing error
            }, 2000);
        }
    };
    

    // Wait for animation to complete before proceeding
    useEffect(() => {
        if (isVerified && animationCompleted) {
            onOtpVerified();
        }
    }, [animationCompleted, isVerified, onOtpVerified]);

    const maskEmail = (email) => {
        const [name, domain] = email.split("@");
        if (name.length > 6) {
            return `${name.slice(0, 3)}...${name.slice(-3)}@${domain}`;
        }
        return `${name[0]}${name[1]}...${name.slice(-2)}@${domain}`;
    };

    return (
        <>
<div className="w-full h-[85vh] flex justify-center items-center  px-4">
  <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl flex flex-col justify-center align-items-center shadow-xl p-6 sm:p-8 relative">
    {/* Close Icon */}
    <button
      onClick={closeEmailAuth}
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
    >
      <span className="material-symbols-outlined text-lg">close</span>
    </button>

    {/* Title */}
    <h2 className="text-xl sm:text-2xl font-bold text-center text-[#4f3267] mb-4">
      OTP Verification
    </h2>

    {/* Success or OTP Steps */}
    {isVerified ? (
      <SuccessAnimation />
    ) : step === "send" ? (
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {decriptionOfEmailVerify}{" "}
          <span className="text-[#ef3333] font-semibold">
            {decriptionOfEmailVerifyImp}
          </span>
        </p>
        <p className="text-base sm:text-lg font-semibold text-[#4f3267] mt-2">
          {maskEmail(email)}
        </p>

        <button
          onClick={sendOTP}
          disabled={loading}
          className="mt-5 bg-[#4f3267] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#432a58] transition w-full"
        >
          {loading ? <Loading /> : "Send OTP"}
        </button>
      </div>
    ) : (
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">Enter the OTP sent to your email:</p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              inputMode="numeric"
              value={otp[index] || ""}
              onChange={(e) => {
                let newOtp = otp.split("");
                newOtp[index] = e.target.value.replace(/[^0-9]/g, "");
                setOtp(newOtp.join(""));
                if (e.target.value && index < 5) {
                  document.getElementById(`otp-input-${index + 1}`).focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  let newOtp = otp.split("");
                  newOtp[index] = "";
                  setOtp(newOtp.join(""));
                  if (index > 0) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                  }
                }
              }}
              id={`otp-input-${index}`}
              className="w-10 h-10 sm:w-12 sm:h-12 border text-center text-lg font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f3267]"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={verifyOTP}
          disabled={loading}
          className="bg-[#4f3267] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#432a58] transition w-full"
        >
          {loading ? <Loading /> : "Verify OTP"}
        </button>
      </div>
    )}

    {/* Message Feedback */}
    {message && (
      <motion.p
        className="mt-4 text-sm text-gray-700 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {message}
      </motion.p>
    )}
  </div>
</div>

        </>
    );
};

export default EmailAuth;