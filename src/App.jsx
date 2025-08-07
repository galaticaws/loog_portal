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

  // Exact Sleeper badge colors for contract years
  const getContractBadgeStyle = (length) => {
    const base = {
      padding: "2px 8px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: "600",
      display: "inline-block",
      minWidth: "36px",
      textAlign: "center",
      boxShadow: "inset 0 1px 0 rgba(0,0,0,0.15)",
      userSelect: "none",
    };

    switch (length) {
      case 1:
        return { ...base, backgroundColor: "#F44336", color: "white" }; // Red
      case 2:
        return { ...base, backgroundColor: "#FF9800", color: "white" }; // Orange
      case 3:
        return { ...base, backgroundColor: "#FFEB3B", color: "black" }; // Yellow
      case 4:
        return { ...base, backgroundColor: "#4CAF50", color: "white" }; // Green
      default:
        return { ...base, backgroundColor: "#6B7280", color: "white" }; // Gray fallback
    }
  };

  return (
    <>
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          background: "linear-gradient(to right, #1e1f21, #5f4b8b)",
          color: "#ffffff",
          minHeight: "100vh",
          width: "100vw",
          padding: "2rem 1rem",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
              animation: "float 4s ease-in-out infinite",
              color: "#7289DA",
              margin: 0,
              userSelect: "none",
            }}
          >
            League of Ordinary Gentlemen Rosters
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <img
            src="https://sleeper.com/_next/image?url=%2Fweb-public%2Fimages%2Flogos%2Flogo-full-horizontal-white.png&w=384&q=75"
            alt="Sleeper Logo"
            className="pulse"
            style={{ height: "40px" }}
          />
        </div>

        {rosters.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>
            Loading rosters...
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              padding: "0 1rem",
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
                <ul
                  style={{
                    paddingLeft: "1.25rem",
                    color: "#cccccc",
                    margin: 0,
                    listStyle: "none",
                  }}
                >
                  {team.players && team.players.length > 0 ? (
                    team.players.map((player) => (
                      <li
                        key={player.player_id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span>
                          {player.full_name} ({player.position} - {player.team})
                        </span>
                        <span style={getContractBadgeStyle(player.contract_length)}>
                          {player.contract_length ? `${player.contract_length} yr` : "N/A"}
                        </span>
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

        {/* Embedded animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes pulseLogo {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.85;
            }
          }

          .pulse {
            animation: pulseLogo 3s ease-in-out infinite;
            will-change: transform;
          }
        `}</style>
      </div>
    </>
  );
}
