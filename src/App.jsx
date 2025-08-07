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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sleeper Fantasy Rosters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rosters.map((team, idx) => (
          <div key={team.roster_id} className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">{team.owner_name || "Unnamed Team"}</h2>
            <ul className="text-sm text-gray-700">
              {team.players && team.players.length > 0 ? (
                team.players.map((playerId) => (
                  <li key={playerId}>Player ID: {playerId}</li>
                ))
              ) : (
                <li className="italic text-gray-400">No players</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
