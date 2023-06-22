import express from "express";
import EducationAssistantController from "../../controllers/admin/educationAssistant.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();


router
    .route("/term")
    .post(
        [Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.create
    );

router
    .route("/terms")
    .get(
        [Auth.isAuthenticated,RoleHandler.isManager],
        EducationAssistantController.getAllTerms
    );

export default router;
