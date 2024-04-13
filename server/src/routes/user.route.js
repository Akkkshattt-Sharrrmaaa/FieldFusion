import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import {
    register,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    bookingHistory
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    register
);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/booking-history").get(verifyJWT, bookingHistory);

export default router;
