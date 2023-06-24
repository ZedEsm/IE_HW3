import express from "express";
import EducationAssistantController from "../../controllers/educational-assistant/educationAssistant.controller.js";
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
        [Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.getAllTerms
    );

router
    .route("/term/:id")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.getTermById
    );

router
    .route("/term/:id")
    .put(
        [Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.updateTermById
    );

router
    .route("/term/:id")
    .delete(
        [Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.deleteTermById
    );

router
    .route("/term/:id/preregistration")
    .post(
        [Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.providingSCPreregistration
    );

router
    .route("/term/:id/preregistration_courses")
    .get([Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.getSCPreregistered
    );

router
    .route("/term/:id/preregistration/:cid")
    .delete([Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.deleteSCPreregistration
    );

router
    .route("/term/:id/registration")
    .post([Auth.isAuthenticated, RoleHandler.isManager],
        EducationAssistantController.providingSCRegistration
    )
export default router;
