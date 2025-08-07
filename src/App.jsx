import React, { useEffect, useState } from "react";

export default function RosterBoard() {
  const [rosters, setRosters] = useState([]);

  useEffect(() => {
    fetch("https://qums3xo3mg.execute-api.us-east-2.amazonaws.com/prod/rosters")
      .then((res) => res.json())
      .then((data) => setRosters(data))
      .catch((err) => console.error("Error fetching rosters:", err));
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#1E1F24",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "2rem",
          animation: "float 4s ease-in-out infinite",
          color: "#7289DA",
        }}
      >
        League of Ordinary Gentlemen Rosters 🏈
      </h1>

      {rosters.length === 0 ? (
        <p style={{ textAlign: "center", color: "#ccc" }}>Loading rosters...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {rosters.map((team) => (
            <div
              key={team.roster_id}
              style={{
                backgroundColor: "#292B32",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#ffffff",
                }}
              >
                {team.owner_name || "Unnamed Team"}
              </h2>
              <ul style={{ paddingLeft: "1.25rem", color: "#cccccc" }}>
                {team.players && team.players.length > 0 ? (
                  team.players.map((player) => (
                    <li key={player.player_id}>
                      {player.full_name} ({player.position} - {player.team})
                    </li>
                  ))
                ) : (
                  <li style={{ fontStyle: "italic", opacity: 0.6 }}>
                    No players
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      <footer
        style={{
          marginTop: "3rem",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#aaa",
        }}
      >
        © 2025 – Office of the Commissioner
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
