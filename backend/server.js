const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Mock user database
const MOCK_USERS = [
  { email: "user@netflix.com", password: "netflix123", name: "Netflix User" },
  { email: "test@test.com", password: "test123", name: "Test User" },
  { email: "admin@netflix.com", password: "admin123", name: "Admin" },
];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

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
  } else {
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`✅ Netflix Mock Backend running on http://localhost:${PORT}`);
  console.log(`\nMock credentials:`);
  console.log(`  Email: user@netflix.com | Password: netflix123`);
  console.log(`  Email: test@test.com    | Password: test123`);
});
