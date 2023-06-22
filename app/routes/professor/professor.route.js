import express from "express";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";
import ProfessorUpdateController from "../../controllers/professor/update.controller.js";

const router = express.Router();

router
    .route("/Professor/:id")
    .put(
        [Auth.isAuthenticated, RoleHandler.isProfessor],
        ProfessorUpdateController.update
    );


export default router;
