import { useState } from "react";
import axios from "axios";

const EmailAuth = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const sendOTP = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/send-otp", { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error sending OTP");
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/verify-otp", { email, otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "OTP verification failed");
        }
    };

    return (
        <div>
            <h2>Email OTP Verification</h2>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={sendOTP}>Send OTP</button>
            <br />
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={verifyOTP}>Verify OTP</button>
            <p>{message}</p>
        </div>
    );
};

export default EmailAuth;
