import React, { useEffect, useState } from 'react';

export default function RosterBoard() {
  const [rosters, setRosters] = useState([]);

  useEffect(() => {
    fetch("https://qums3xo3mg.execute-api.us-east-2.amazonaws.com/prod/rosters")
      .then(res => res.json())
      .then(data => setRosters(data))
      .catch(err => console.error("Error fetching rosters:", err));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-between text-white py-10 px-4"
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      }}
    >
      <header>
        <h1 className="text-4xl font-bold text-center mb-10 animate-bounce-slow">
          League of Ordinary Gentlemen Rosters <span role="img" aria-label="football">🏈</span>
        </h1>
      </header>

      <main className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rosters.map((team) => (
            <div
              key={team.roster_id}
              className="bg-white text-gray-800 rounded-2xl shadow-lg p-5 transition-transform hover:scale-105"
            >
              <h2 className="text-xl font-bold mb-3">
                {team.owner_name || "Unnamed Team"}
              </h2>
              <ul className="space-y-1 text-sm">
                {team.players && team.players.length > 0 ? (
                  team.players.map((player) => (
                    <li key={player.player_id}>
                      {player.full_name} ({player.position} - {player.team})
                    </li>
                  ))
                ) : (
                  <li className="italic text-gray-400">No players</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center text-sm text-white mt-10">
        &copy; 2025 - Office of the Commissioner
      </footer>

      {/* Custom animation for bouncing title */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
}
