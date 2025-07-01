import React,{useState} from 'react';
import axios from 'axios';

function Pricing_Setting() {
    const [gold, setGold] = useState("");
    const [silver, setSilver] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/admins/set-metal-rate", { gold, silver });
    alert("Metal rates updated");
  };

  return (
    <>
     <form onSubmit={handleSubmit} className="space-y-4 max-w-sm p-4">
      <input
        type="number"
        placeholder="Gold price per gram"
        value={gold}
        onChange={(e) => setGold(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <input
        type="number"
        placeholder="Silver price per gram"
        value={silver}
        onChange={(e) => setSilver(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">
        Update Rates
      </button>
    </form>
    </>
  )
}

export default Pricing_Setting
