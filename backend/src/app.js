import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { clientRoutes } from "./api/routes/client.routes.js";
import { companyRoutes } from "./api/routes/company.routes.js";
import { authRoutes } from "./api/routes/auth.routes.js";
import "./api/utils/database.js"; //! connection with mongodb
import { adminRoutes } from "./api/routes/admin.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// * Routes
app.use("/client", clientRoutes);
app.use("/company", companyRoutes);
app.use("/auth", authRoutes);
app.use("admin", adminRoutes);

//? Express Error Middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log("in express error middleware", error, "in the end");
  const status = error.status || 500;
  const message = error.message || "server internal error";

  res.status(status).json({ status: "error", message: message });
});

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
