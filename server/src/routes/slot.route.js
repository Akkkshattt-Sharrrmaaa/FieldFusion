import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    bookSlot,
    getAllSlots,
    getAvailableSlots,
    mail
} from "../controllers/slot.controller.js"

const router = Router();

router.route("/book-slot").post(verifyJWT, bookSlot);
router.route("/get-all-slots").get(getAllSlots);
router.route("/get-available-slots").post(getAvailableSlots);
router.route("/mail").post(mail);

export default router;