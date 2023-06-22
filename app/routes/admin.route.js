import express from "express";
import AdminController from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/admin").post(AdminController.create);

router.route("/admin/:id").delete(AdminController.delete);

export default router;
