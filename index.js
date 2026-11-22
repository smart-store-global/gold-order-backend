const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = [
  "https://smart-store-global.github.io",
  "https://smart-store-global.github.io/Gold-Oder-Mining-Com"
];

app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true
}));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

let users = {
  1: {
    id: 1,
    name: "Demo User",
    email: "demo@goldorder.com",
    withdrawalAddress: ""
  }
};

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "ok",
    company: "Gold Order Mining Company"
  });
});

app.post("/api/v1/auth/refresh-token", (req, res) => {
  res.json({
    success: true,
    data: {
      accessToken: "new-sample-access-token"
    }
  });
});

app.get("/api/v1/user/getSingle/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id] || {
    id: Number(id) || 1,
    name: "Gold Member",
    email: "member@goldorder.com",
    withdrawalAddress: ""
  };
  res.json({
    success: true,
    data: user
  });
});

app.patch("/api/v1/user/update-withdrawal-address/:userId", (req, res) => {
  const { userId } = req.params;
  const current = users[userId] || { id: Number(userId) || 1 };
  users[userId] = {
    ...current,
    ...req.body
  };

  res.json({
    success: true,
    message: "Withdrawal address updated",
    data: users[userId]
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Gold Order Mining Company API running on port ${PORT}`);
});