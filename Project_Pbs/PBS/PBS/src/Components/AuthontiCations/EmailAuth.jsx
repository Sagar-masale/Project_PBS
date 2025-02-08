import { useContext, useState } from "react";
import axios from "axios";
import Loading from "../PageLoader/Loading"; // Ensure this component works properly
import ProfileContext from "../Context/ProfileContext";

const EmailAuth = ({closeEmailAuth, onOtpVerified }) => {
    const { userData } = useContext(ProfileContext);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("send"); // "send" or "verify"
    
    const email = userData?.email || "";

    const sendOTP = async () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);
        setMessage(""); // Clear previous messages

        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/send-otp", { email });
            setMessage(response.data.message || `OTP sent to ${email}`);
            setStep("verify"); // Move to OTP verification step
        } catch (error) {
            setMessage(error.response?.data?.message || "Error sending OTP");
        } finally {
            setLoading(false); // Ensure loading stops
        }
    };

    const verifyOTP = async () => {
        if (loading) return;
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/verify-otp", { email, otp });
            setMessage(response.data.message || "OTP verified successfully!");
            onOtpVerified ();
        } catch (error) {
            setMessage(error.response?.data?.message || "OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
      <>
       <div className="Auth-Container flex justify-content-center align-items-center   w-full h-[100vh]">
       <div className="flex flex-col  items-center p-6 bg-white shadow-lg rounded-xl mb-52 w-[50%] h-[fit-content]">
       <span class="material-symbols-outlined relative ml-auto cursor-pointer" onClick={closeEmailAuth}>
        close
        </span>
            <h2 className="text-xl font-semibold text-gray-800">OTP Verification</h2>
            
            {step === "send" ? (
                <div className="w-full text-center">
                    <p className="text-sm text-gray-600 mt-2">
                        We will send a OTP to your registered email:
                    </p>
                    <p className="text-lg font-semibold text-[#4f3267]">{email}</p>
                    
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
                    <p className="text-sm text-gray-600 mt-2">
                        Enter the OTP sent to your email:
                    </p>
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

            {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        </div>
       </div>
      </>
    );
};

export default EmailAuth;
