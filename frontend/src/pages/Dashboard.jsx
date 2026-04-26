import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const MOCK_CONTENT = {
  trending: [
    { id: 1, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", match: "98%" },
    { id: 2, title: "The Crown", genre: "Drama • History", rating: "TV-MA", match: "95%" },
    { id: 3, title: "Squid Game", genre: "Thriller • Drama", rating: "TV-MA", match: "97%" },
    { id: 4, title: "Wednesday", genre: "Comedy • Fantasy", rating: "TV-14", match: "93%" },
    { id: 5, title: "Ozark", genre: "Crime • Drama", rating: "TV-MA", match: "91%" },
    { id: 6, title: "The Witcher", genre: "Fantasy • Action", rating: "TV-MA", match: "89%" },
  ],
  newReleases: [
    { id: 7, title: "Avatar: Fire & Ash", genre: "Action • Adventure", rating: "PG-13", match: "96%" },
    { id: 8, title: "Dune: Messiah", genre: "Sci-Fi • Epic", rating: "PG-13", match: "94%" },
    { id: 9, title: "Night Agent S3", genre: "Thriller • Action", rating: "TV-MA", match: "90%" },
    { id: 10, title: "Emily in Paris S5", genre: "Romance • Comedy", rating: "TV-MA", match: "85%" },
    { id: 11, title: "Peaky Blinders Movie", genre: "Crime • Drama", rating: "TV-MA", match: "99%" },
    { id: 12, title: "Black Mirror S7", genre: "Sci-Fi • Thriller", rating: "TV-MA", match: "92%" },
  ],
};

const CARD_COLORS = [
  ["#1a1a2e", "#16213e"],
  ["#0f3460", "#533483"],
  ["#1b1b2f", "#2b2d42"],
  ["#162447", "#1f4068"],
  ["#2c003e", "#1b1b2f"],
  ["#0d0d0d", "#1a0a0a"],
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % MOCK_CONTENT.trending.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const heroShow = MOCK_CONTENT.trending[heroIndex];

  if (!user) return null;

  return (
    <div className="db-root">
      {/* Navbar */}
      <nav className="db-nav">
        <span className="db-logo">NETFLIX</span>
        <div className="db-nav-links">
          <a href="#" className="db-nav-link db-nav-link--active">Home</a>
          <a href="#" className="db-nav-link">TV Shows</a>
          <a href="#" className="db-nav-link">Movies</a>
          <a href="#" className="db-nav-link">New & Popular</a>
          <a href="#" className="db-nav-link">My List</a>
        </div>
        <div className="db-nav-right">
          <span className="db-nav-user">👤 {user.name}</span>
          <button className="db-logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="db-hero">
        <div className="db-hero-gradient" />
        <div className="db-hero-bg" style={{ background: `linear-gradient(135deg, ${CARD_COLORS[heroIndex][0]}, ${CARD_COLORS[heroIndex][1]})` }} />
        <div className="db-hero-content">
          <div className="db-hero-badge">🔥 #{heroIndex + 1} in India Today</div>
          <h1 className="db-hero-title">{heroShow.title}</h1>
          <div className="db-hero-meta">
            <span className="db-match">{heroShow.match} Match</span>
            <span className="db-rating-badge">{heroShow.rating}</span>
            <span>{heroShow.genre}</span>
          </div>
          <div className="db-hero-actions">
            <button className="db-play-btn">▶ Play</button>
            <button className="db-info-btn">ℹ More Info</button>
          </div>
        </div>
        <div className="db-hero-dots">
          {MOCK_CONTENT.trending.map((_, i) => (
            <button
              key={i}
              className={`db-dot ${i === heroIndex ? "db-dot--active" : ""}`}
              onClick={() => setHeroIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* Content Rows */}
      <div className="db-content">
        <ContentRow title="Trending Now" items={MOCK_CONTENT.trending} />
        <ContentRow title="New Releases" items={MOCK_CONTENT.newReleases} />
        <ContentRow title="Continue Watching" items={[...MOCK_CONTENT.trending].reverse()} />
      </div>
    </div>
  );
}

function ContentRow({ title, items }) {
  return (
    <section className="db-row">
      <h2 className="db-row-title">{title}</h2>
      <div className="db-row-scroll">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="db-card"
            style={{ background: `linear-gradient(135deg, ${CARD_COLORS[i % CARD_COLORS.length][0]}, ${CARD_COLORS[i % CARD_COLORS.length][1]})` }}
          >
            <div className="db-card-overlay">
              <div className="db-card-info">
                <h3 className="db-card-title">{item.title}</h3>
                <div className="db-card-meta">
                  <span className="db-match-small">{item.match}</span>
                  <span className="db-rating-small">{item.rating}</span>
                </div>
                <p className="db-card-genre">{item.genre}</p>
                <div className="db-card-actions">
                  <button className="db-card-play">▶</button>
                  <button className="db-card-add">+</button>
                  <button className="db-card-like">👍</button>
                </div>
              </div>
            </div>
            <div className="db-card-label">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
