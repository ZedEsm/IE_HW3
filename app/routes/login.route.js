import express from "express";
import LoginController from "../controllers/login.controller.js";
import Auth from "../middlewares/authentication.js";


const router = express.Router();

router.post("/login", LoginController.login);

router.route("/logout").post([Auth.isAuthenticated],LoginController.logout);


export default router;
