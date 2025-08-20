import React, { useEffect, useState, useMemo, useCallback } from "react";

/** ---------------- Countdown Component ---------------- */
function Countdown({ targetDate, title }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) return { expired: true };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    document.title = "League of Ordinary Gentlemen";

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      {timeLeft.expired ? (
        <div style={styles.expiredText}>Expired</div>
      ) : (
        <div style={styles.timerRow}>
          <span>{timeLeft.days}d</span>
          <span>{timeLeft.hours}h</span>
          <span>{timeLeft.minutes}m</span>
          <span>{timeLeft.seconds}s</span>
        </div>
      )}
    </div>
  );
}

/** ---------------- Main Component ---------------- */
export default function RosterBoard() {
  const [rosters, setRosters] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Fetch rosters
  useEffect(() => {
    fetch("https://qums3xo3mg.execute-api.us-east-2.amazonaws.com/prod/rosters")
      .then((res) => res.json())
      .then(setRosters)
      .catch((err) => console.error("Error fetching rosters:", err));
  }, []);

  // Contract badge styles
  const getContractBadgeStyle = useCallback((length) => {
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

    const colors = {
      1: { backgroundColor: "#F44336", color: "white" },
      2: { backgroundColor: "#FF9800", color: "white" },
      3: { backgroundColor: "#FFEB3B", color: "black" },
      4: { backgroundColor: "#4CAF50", color: "white" },
    };

    return { ...base, ...(colors[length] || { backgroundColor: "#6B7280", color: "white" }) };
  }, []);

  // Ticker messages
  const tickerMessages = useMemo(
    () => [
      "🚨 Draft 8/23/25 8PM EST",
      "🏆 Contract Selections Due by Midnight EST 8/31/25",
      "Draft Order: 1. @Jalto • 2. @davemc410 • 3. @2and5 • 4. @Beresky • 5. @millievanilly • 6. @BWheezy87",
      "7. @joeyjoejoejr19 • 8. @neffneffneff • 9. @mosschamp10 • 10. @Kerplunk13 • 11. @MagnumPower • 12. @mjs1985",
    ],
    []
  );

  // Rotate ticker messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % tickerMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [tickerMessages]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={styles.page}>
        {/* Title */}
        <h1 style={styles.mainTitle}>League of Ordinary Gentlemen</h1>

        {/* Sleeper logo */}
        <div style={styles.logoWrapper}>
          <img
            src="https://sleeper.com/_next/image?url=%2Fweb-public%2Fimages%2Flogos%2Flogo-full-horizontal-white.png&w=384&q=75"
            alt="Sleeper Logo"
            className="pulse"
            style={{ height: "40px" }}
          />
        </div>

        {/* Countdown Section */}
        <div style={styles.countdownWrapper}>
          <Countdown targetDate="2025-08-23T20:00:00" title="2025 League Draft" />
          <Countdown targetDate="2025-08-30T00:00:00" title="Contract Signing Period Ends" />
        </div>

        {/* Ticker */}
        <div style={styles.ticker}>
          <span
            key={currentMessageIndex}
            style={{ opacity: 0, animation: "fade 4s linear forwards" }}
          >
            {tickerMessages[currentMessageIndex]}
          </span>
        </div>

        {/* Rosters */}
        <h2 style={styles.sectionTitle}>Rosters and Contracts</h2>

        {rosters.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>Loading rosters...</p>
        ) : (
          <div style={styles.rosterGrid}>
            {rosters.map((team) => (
              <div key={team.roster_id} style={styles.rosterCard}>
                <h3 style={styles.rosterOwner}>{team.owner_name || "Unnamed Team"}</h3>
                <ul style={styles.playerList}>
                  {team.players?.length ? (
                    team.players.map((player) => (
                      <li key={player.player_id} style={{ marginBottom: "0.75rem" }}>
                        <div style={{ fontWeight: "600" }}>{player.full_name}</div>
                        <div style={styles.playerInfo}>
                          <span>{player.position} - {player.team}</span>
                          <span style={getContractBadgeStyle(player.contract_length)}>
                            {player.contract_length ? `${player.contract_length} yr` : "N/A"}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li style={{ fontStyle: "italic", opacity: 0.6 }}>No players</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer style={styles.footer}>© 2025 – Office of the Commissioner</footer>

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
          }
        `}</style>
      </div>
    </>
  );
}

/** ---------------- Styles ---------------- */
const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(to right, #1e1f21, #5f4b8b)",
    color: "#ffffff",
    minHeight: "100vh",
    width: "100vw",
    padding: "2rem 1rem",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  mainTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    animation: "float 4s ease-in-out infinite",
    color: "#7289DA",
    marginBottom: "1rem",
    userSelect: "none",
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  countdownWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  ticker: {
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
  },
  sectionTitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#7289DA",
    marginBottom: "1.5rem",
    animation: "float 4s ease-in-out infinite",
    userSelect: "none",
  },
  rosterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    padding: "0 1rem",
  },
  rosterCard: {
    backgroundColor: "#292B32",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },
  rosterOwner: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.75rem",
    color: "#ffffff",
  },
  playerList: {
    paddingLeft: "1.25rem",
    color: "#cccccc",
    margin: 0,
    listStyle: "none",
  },
  playerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    opacity: 0.8,
  },
  footer: {
    marginTop: "3rem",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#aaa",
  },
  card: {
    backgroundColor: "#292B32",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    minWidth: "250px",
    textAlign: "center",
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#fff",
  },
  expiredText: {
    fontSize: "1rem",
    color: "#F44336",
  },
  timerRow: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
};
