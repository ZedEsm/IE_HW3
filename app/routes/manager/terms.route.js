import express from "express";
import EducationAssistantController from "../../controllers/educational-assistant/educationAssistant.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";
import studentEducationalController from "../../controllers/edAssistant_student_common/student_educational.controller.js"


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
        [Auth.isAuthenticated, RoleHandler.isManagerOrStudent],
        studentEducationalController.getAllTerms
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
        [Auth.isAuthenticated, RoleHandler.isManagerOrStudent],
        studentEducationalController.providingSCPreregistration
    );

router
    .route("/term/:id/preregistration_courses")
    .get([Auth.isAuthenticated, RoleHandler.isManagerOrStudent],
        studentEducationalController.getSCPreregistered
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

router
    .route("/term/:id/registration_courses")
    .get([Auth.isAuthenticated,RoleHandler.isManager],
        EducationAssistantController.getSCRegistered)

router
    .route("/term/:id/registration/:cid")
    .delete([Auth.isAuthenticated,RoleHandler.isManager],
        EducationAssistantController.deleteSCRegistration)
export default router;
