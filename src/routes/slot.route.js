import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    bookSlot
} from "../controllers/slot.controller.js"

const router = Router();

router.route("/book-slot").post(verifyJWT, bookSlot);

export default router;
