
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Demo secret only. Use environment variables in production.
const SECRET = process.env.JWT_SECRET || "experiment8-demo-secret";

const demoUser = {
  id: 1,
  email: "student@example.com",
  password: "student123"
};

const data = {
  applications: [],
  savedJobs: [],
  profiles: [{ id: 1, name: "Job Seeker" }],
  alerts: []
};

// A. Applicant login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== demoUser.email ||
    password !== demoUser.password
  ) {
    console.warn("[8A] Login failed:", email);
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
    { userId: demoUser.id, email: demoUser.email },
    SECRET,
    { expiresIn: "15m" }
  );

  console.log("[8A] Login successful:", email);
  console.log("[8B] Authentication token generated");

  res.json({
    message: "Login successful",
    token,
    user: { id: demoUser.id, email: demoUser.email }
  });
});

// Token verification middleware
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ")
    ? header.slice(7)
    : null;

  if (!token) {
    console.warn("[8F] Unauthorized: token missing");
    return res.status(401).json({ message: "Token required" });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    console.warn("[8F] Invalid or expired token");
    return res.status(401).json({
      message: "Token invalid or expired"
    });
  }
}

// C and D: Protected resource operations
app.get("/protected/:resource", authenticate, (req, res) => {
  const resource = req.params.resource;

  if (!Object.hasOwn(data, resource)) {
    return res.status(404).json({ message: "Resource not found" });
  }

  console.log("[8C] Protected GET:", resource);
  res.json(data[resource]);
});

app.post("/protected/:resource", authenticate, (req, res) => {
  const resource = req.params.resource;

  if (!Object.hasOwn(data, resource)) {
    return res.status(404).json({ message: "Resource not found" });
  }

  const item = { id: Date.now(), ...req.body };
  data[resource].push(item);

  console.log("[8D] Protected POST:", resource, item);
  res.status(201).json(item);
});

app.patch("/protected/:resource/:id", authenticate, (req, res) => {
  const resource = req.params.resource;

  if (!Object.hasOwn(data, resource)) {
    return res.status(404).json({ message: "Resource not found" });
  }

  const item = data[resource].find(
    (entry) => String(entry.id) === req.params.id
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  Object.assign(item, req.body);
  console.log("[8D] Protected PATCH:", resource, item);
  res.json(item);
});

app.delete("/protected/:resource/:id", authenticate, (req, res) => {
  const resource = req.params.resource;

  if (!Object.hasOwn(data, resource)) {
    return res.status(404).json({ message: "Resource not found" });
  }

  const before = data[resource].length;
  data[resource] = data[resource].filter(
    (entry) => String(entry.id) !== req.params.id
  );

  if (data[resource].length === before) {
    return res.status(404).json({ message: "Item not found" });
  }

  console.log("[8D] Protected DELETE:", resource, req.params.id);
  res.json({ message: "Deleted successfully" });
});

app.listen(3002, () => {
  console.log("Experiment 8 API running at http://localhost:3002");
});
