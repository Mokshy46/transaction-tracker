import { useState } from "react";
import axios from "../api";

function Summary() {
  const [userId, setUserId] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    if (!userId) {
      setError("Please enter a User ID");
      setSummary(null);
      return;
    }

    try {
      const res = await axios.get(`/summary/${userId}/`);

      setSummary(res.data);
      setError("");
    } catch (error) {
      setSummary(null);

      if (error.response?.status === 404) {
        setError("User not found");
      } else {
        setError("Something went wrong");
      }

      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Summary
        </h2>

        <div className="flex gap-3 mb-4">
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={fetchSummary}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-blue-50 rounded-xl p-5 text-center">
              <h3 className="text-sm text-gray-500 mb-2">
                Score
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {summary.score}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 text-center">
              <h3 className="text-sm text-gray-500 mb-2">
                Total Amount
              </h3>
              <p className="text-3xl font-bold text-green-600">
                ₹{summary.total_amount}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 text-center">
              <h3 className="text-sm text-gray-500 mb-2">
                Transactions
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {summary.total_transactions}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;