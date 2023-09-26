import express from "express";
import ScheduleController from "../controllers/scheduleController.js";

const schedulerouter = express.Router();
schedulerouter.post("/schedule/move", ScheduleController.scheduleMove);

export default schedulerouter;
