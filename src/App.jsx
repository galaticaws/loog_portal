import React, { useEffect, useState } from "react";

function Countdown({ targetDate, title }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { expired: true };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      style={{
        backgroundColor: "#292B32",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
        minWidth: "250px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          margin: "0 0 0.5rem 0",
          fontSize: "1.1rem",
          fontWeight: "600",
          color: "#fff",
        }}
      >
        {title}
      </h3>
      {timeLeft.expired ? (
        <div style={{ fontSize: "1rem", color: "#F44336" }}>Expired</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          <span>{timeLeft.days}d</span>
          <span>{timeLeft.hours}h</span>
          <span>{timeLeft.minutes}m</span>
          <span>{timeLeft.seconds}s</span>
        </div>
      )}
    </div>
  );
}

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

  // Sleeper badge colors
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
        return { ...base, backgroundColor: "#F44336", color: "white" };
      case 2:
        return { ...base, backgroundColor: "#FF9800", color: "white" };
      case 3:
        return { ...base, backgroundColor: "#FFEB3B", color: "black" };
      case 4:
        return { ...base, backgroundColor: "#4CAF50", color: "white" };
      default:
        return { ...base, backgroundColor: "#6B7280", color: "white" };
    }
  };

  // Ticker messages
  const tickerMessages = [
    "🚨 Draft 8/23/25 8PM EST",
    "🏆 Contract Selections Due by Midnight EST 8/31/25",
    "Draft Order: 1. @Jalto • 2. @davemc410 • 3. @2and5 • 4. @Beresky • 5. @millievanilly • 6. @BWheezy87",
    "7. @joeyjoejoejr19 • 8. @neffneffneff • 9. @mosschamp10 • 10. @Kerplunk13 • 11. @MagnumPower • 12. @mjs1985"
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        (prev) => (prev + 1) % tickerMessages.length
      );
    }, 4000); // 4 seconds per message
    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
        {/* Title */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
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
            League of Ordinary Gentlemen
          </h1>
        </div>

        {/* Sleeper logo */}
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

        {/* Countdown Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Countdown
            targetDate="2025-08-23T20:00:00"
            title="2025 League Draft"
          />
          <Countdown
            targetDate="2025-08-30T00:00:00"
            title="Contract Signing Period Ends"
          />
        </div>

        {/* Sleeper-themed Ticker */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            marginBottom: "2rem",
            textAlign: "center",
            minHeight: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFEB3B",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          <span
            key={currentMessageIndex}
            style={{
              opacity: 0,
              animation: "fade 4s linear",
              animationFillMode: "forwards",
            }}
          >
            {tickerMessages[currentMessageIndex]}
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            animation: "float 4s ease-in-out infinite",
            color: "#7289DA",
            margin: 0,
            userSelect: "none",
          }}
        >
          Rosters and Contracts
        </h1>
        <br />

        {/* Rosters */}
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
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div style={{ fontWeight: "600" }}>
                          {player.full_name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.9rem",
                            opacity: 0.8,
                          }}
                        >
                          <span>
                            {player.position} - {player.team}
                          </span>
                          <span
                            style={getContractBadgeStyle(player.contract_length)}
                          >
                            {player.contract_length
                              ? `${player.contract_length} yr`
                              : "N/A"}
                          </span>
                        </div>
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

        {/* Footer */}
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

        {/* Animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes pulseLogo {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.85; }
          }

          @keyframes fade {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
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
