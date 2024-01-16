import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { adminRoutes } from "./api/routes/admin.routes.js";
import { authRoutes } from "./api/routes/auth.routes.js";
import { bookingRoutes } from "./api/routes/booking.routes.js";
import { chatRoutes } from "./api/routes/chat.routes.js";
import { clientRoutes } from "./api/routes/client.routes.js";
import { companyRoutes } from "./api/routes/company.routes.js";
import { employeeRoutes } from "./api/routes/employee.routes.js";
import { reviewRoutes } from "./api/routes/review.routes.js";
import "./api/utils/database.js"; //! connection with mongodb

import http from "http";
import { Server as SocketIO } from "socket.io";

import setupSocket from "./socket/index.js";
import ChatSocket from "./socket/chatHandler.js";

const app = express();
//passing same instance of http with express and socket.io
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your client's URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// * Routes

app.use("/client", clientRoutes);
app.use("/company", companyRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);
app.use("/review", reviewRoutes);
app.use("/chat", chatRoutes);
app.use("/booking", bookingRoutes);

//? Express Error Middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log("in express error middleware", error, "in the end");
  const status = error.status || 500;
  const message = error.message || "server internal error";

  res.status(status).json({ status: "error", message: message });
});

setupSocket(io);
ChatSocket(io);
server.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
