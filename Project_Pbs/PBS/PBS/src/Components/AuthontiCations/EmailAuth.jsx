import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../PageLoader/Loading";
import ProfileContext from "../Context/ProfileContext";
import SuccessAnimation from "../Animation/SuccessAnimation";

const EmailAuth = ({ closeEmailAuth, onOtpVerified, decriptionOfEmailVerify }) => {
    const { userData } = useContext(ProfileContext);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("send");
    const [isVerified, setIsVerified] = useState(false);
    const [animationCompleted, setAnimationCompleted] = useState(false);
    

    const email = userData?.email || "";

    const sendOTP = async () => {
        if (loading) return;
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/send-otp", { email });
            setMessage(response.data.message || `OTP sent to ${email}`);
            setStep("verify"); 
        } catch (error) {
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
            const response = await axios.post("http://localhost:8000/api/v1/auth/verify-otp", { email, otp });
    
            setIsVerified(true);
    
            setTimeout(() => {
                setMessage(response.data.message || "OTP verified successfully!");
            }, 2500);
    
            setTimeout(() => {
                setAnimationCompleted(true);
            }, 4500);
    
        } catch (error) {
            setTimeout(() => {  // Delay error message for 2 seconds
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
            <div className="Auth-Container flex justify-content-center align-items-center bg-[#d7a8fe3d] w-full h-[85vh]">
                <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl mb-30 w-[50%] h-[fit-content]">
                    <span className="material-symbols-outlined relative ml-auto cursor-pointer" onClick={closeEmailAuth}>
                        close
                    </span>
                    <h2 className="text-xl font-semibold text-gray-800">OTP Verification</h2>

                    {isVerified ? (
                        <SuccessAnimation /> // Show success animation
                    ) : step === "send" ? (
                        <div className="w-full text-center">
                            <p className="text-sm text-gray-600 mt-2">{decriptionOfEmailVerify}</p>
                            <p className="text-lg font-semibold text-[#4f3267]">{maskEmail(email)}</p>
                            
                            <button 
                                onClick={sendOTP} 
                                disabled={loading}
                                className="mt-4 mb-3 bg-[#4f3267] text-white py-2 px-6 rounded-lg hover:bg-[#432a58] transition duration-200 flex items-center justify-center w-full"
                            >
                                {loading ? <Loading /> : "Send OTP"}
                            </button>
                        </div>
                    ) : (
                        <div className="w-full text-center">
                            <p className="text-sm text-gray-600 mt-2">Enter the OTP sent to your email:</p>
                            <div className="flex justify-center space-x-2 my-4">
                                {[...Array(6)].map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
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
                                        className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                ))}
                            </div>
                            
                            <button 
                                onClick={verifyOTP} 
                                disabled={loading}
                                className="bg-[#4f3267] text-white py-2 px-6 rounded-lg hover:bg-[#432a58] transition duration-200 flex items-center justify-center w-full"
                            >
                                {loading ? <Loading /> : "Verify OTP"}
                            </button>
                        </div>
                    )}

                        {message && (
                        <motion.p 
                        className="mt-3 text-sm text-gray-700"
                        initial={{ scale: 0, opacity: 0 }}  // Start small
                        animate={{ scale: 1, opacity: 1 }}  // Grow to normal size
                        exit={{ scale: 0, opacity: 0 }}     // Shrink back
                        transition={{ duration: 0.5 }}      // Speed of animation
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
