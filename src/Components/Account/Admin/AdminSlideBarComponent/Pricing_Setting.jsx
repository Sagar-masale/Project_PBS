import React,{useState, useContext} from 'react';
import axios from 'axios';
import MetalContext from '../../../Context/MetalRateContext';
import toast from 'react-hot-toast';
import {RefreshCcw} from "lucide-react";
function Pricing_Setting() {
  const { metalRates } = useContext(MetalContext);
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/admins/set-metal-rate", { gold, silver });
    toast.success("Metal rates updated");
  };

  return (
<>
  <div className="max-w-lg mx-auto mt-10 backdrop-blur-md bg-white/60 border border-purple-100 shadow-[0_4px_30px_rgba(139,92,246,0.3)] ring-1 ring-purple-300 rounded-2xl p-8 my-10">
    <h2 className="text-2xl font-bold text-purple-900 mb-6 tracking-wide">
      🪙 Update Metal Rates
    </h2>

    {/* Current Rates */}
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 text-sm text-purple-800 shadow-smdow">
      <p className="mb-2">
        <span className="font-semibold">Current Gold Rate:</span> ₹{metalRates?.gold || 0} /gram
      </p>
      <p>
        <span className="font-semibold">Current Silver Rate:</span> ₹{metalRates?.silver || 0} /gram
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-purple-800 mb-1">
          New Gold Price (per gram)
        </label>
        <input
          type="number"
          value={gold}
          onChange={(e) => setGold(e.target.value)}
          className="w-full border border-purple-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner"
          placeholder="e.g., 5850"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-800 mb-1">
          New Silver Price (per gram)
        </label>
        <input
          type="number"
          value={silver}
          onChange={(e) => setSilver(e.target.value)}
          className="w-full border border-purple-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner"
          placeholder="e.g., 75"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r flex gap-2 justify-center align-middle from-purple-600 to-purple-800 text-white py-2.5 rounded-xl font-semibold tracking-wide hover:from-purple-700 hover:to-purple-900 transition-all shadow-lg"
      >
        <RefreshCcw className="animate-spin-reverse  text-white w-6 h-6"  /> Update Rates
      </button>
    </form>
  </div>
</>

  )
}

export default Pricing_Setting
