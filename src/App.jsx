import React, { useEffect, useState } from "react";

export default function RosterBoard() {
  const [rosters, setRosters] = useState([]);

  useEffect(() => {
    fetch(
      "https://qums3xo3mg.execute-api.us-east-2.amazonaws.com/prod/rosters"
    )
      .then((res) => res.json())
      .then((data) => setRosters(data))
      .catch((err) => console.error("Error fetching rosters:", err));
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        color: "#fff",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          marginBottom: "0.5rem",
          animation: "float 4s ease-in-out infinite",
          userSelect: "none",
        }}
      >
        League of Ordinary Gentlemen Rosters <span role="img" aria-label="football">🏈</span>
      </h1>

      <div
        style={{
          maxHeight: "50vh",
          overflowY: "auto",
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "12px",
          padding: "1rem",
          color: "rgba(255, 255, 255, 0.9)",
          textAlign: "left",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
        }}
      >
        {rosters.length === 0 ? (
          <p>Loading rosters...</p>
        ) : (
          rosters.map((team) => (
            <div
              key={team.roster_id}
              style={{
                marginBottom: "1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                paddingBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "1.25rem",
                  marginBottom: "0.5rem",
                }}
              >
                {team.owner_name || "Unnamed Team"}
              </h2>
              <ul style={{ marginLeft: "1rem", listStyleType: "disc" }}>
                {team.players && team.players.length > 0 ? (
                  team.players.map((player) => (
                    <li key={player.player_id}>
                      {player.full_name} ({player.position} - {player.team})
                    </li>
                  ))
                ) : (
                  <li style={{ fontStyle: "italic", opacity: 0.7 }}>
                    No players
                  </li>
                )}
              </ul>
            </div>
          ))
        )}
      </div>

      <div
        className="footer"
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "rgba(255, 255, 255, 0.85)",
          userSelect: "none",
        }}
      >
        <span>&#169;</span> 2025 - Office of the Commissioner
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
