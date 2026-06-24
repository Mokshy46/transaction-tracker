import { Routes, Route, Link } from "react-router-dom";

import CreateTransaction from "./components/CreateTransaction";
import Summary from "./components/Summary";
import Ranking from "./components/Ranking";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-600">
            Transaction Tracker
          </h1>

          <div className="flex gap-6 font-medium">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Create Transaction
            </Link>

            <Link
              to="/summary"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              User Summary
            </Link>

            <Link
              to="/ranking"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Leaderboard
            </Link>
          </div>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<CreateTransaction />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;