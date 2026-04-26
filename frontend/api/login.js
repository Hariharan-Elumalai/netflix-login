export default function handler(req, res) {
  // Handle CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Allow both GET (health check) and POST (login)
  if (req.method === "GET") {
    return res.status(200).json({ status: "ok", message: "API is running" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const MOCK_USERS = [
    { email: "user@netflix.com", password: "netflix123", name: "Netflix User" },
    { email: "test@test.com", password: "test123", name: "Test User" },
    { email: "admin@netflix.com", password: "admin123", name: "Admin" },
  ];

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token: "mock-jwt-token-" + Date.now(),
    });
  }

  return res.status(401).json({ success: false, message: "Incorrect email or password." });
}