import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";
import { createServer } from "http";
import Redis from "redis";
import winston from "winston";
import jwt from "jsonwebtoken";
import motosRoutes from "./routes/motos.js";
import { readMotos } from "./utils/helpers.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Redis
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});
redisClient.connect();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Swagger
const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "API Motos", version: "1.0.0" },
  paths: {
    "/api/motos": {
      get: { summary: "Listar motos", parameters: [
        { name: "page", in: "query", schema: { type: "integer" } },
        { name: "marca", in: "query", schema: { type: "string" } }
      ] }
    }
  }
};
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use("/api/motos", motosRoutes);

// Auth login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    logger.info("Login bem-sucedido", { username });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

// Socket.io - Notificações realtime
io.on("connection", (socket) => {
  logger.info("Cliente conectado", { socketId: socket.id });
  socket.on("disconnect", () => logger.info("Cliente desconectado"));
});

app.io = io;

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

export default app;
