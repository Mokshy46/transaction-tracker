import { useState } from "react";
import axios from "../api";

function CreateTransaction() {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitTransaction = async () => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("Please enter a User ID");
      return;
    }

    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      await axios.post("/transaction/", {
        user,
        amount,
        transaction_id: crypto.randomUUID(),
      });

      setSuccess("Transaction created successfully");

      setUser("");
      setAmount("");
    } catch (error) {
      if (error.response?.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError("Failed to create transaction");
      }

      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Transaction
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              User ID
            </label>

            <input
              type="number"
              placeholder="Enter User ID"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
              {success}
            </div>
          )}

          <button
            onClick={submitTransaction}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Transaction
          </button>

        </div>
      </div>
    </div>
  );
}

export default CreateTransaction;