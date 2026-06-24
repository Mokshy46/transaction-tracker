import { useEffect, useState } from "react";
import axios from "../api";

function Ranking() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios
      .get("/ranking/")
      .then((res) => setRankings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🏆 Leaderboard
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Score = Total Amount + (Transactions × 100)
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Score</th>
              </tr>
            </thead>

            <tbody>
              {rankings.map((user, index) => (
                <tr
                  key={user.user}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    #{index + 1}
                  </td>

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4 font-bold text-blue-600">
                    {user.score}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default Ranking;