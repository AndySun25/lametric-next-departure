import express from "express";
import { getNextNDepartures } from "./controller/realtimeDepartureController";

const router = express.Router();
router.get("/next", (req, res) => getNextNDepartures(req, res));

export default router;
