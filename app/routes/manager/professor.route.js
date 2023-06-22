import express from "express";
import ProfessorController from "../../controllers/admin/professor.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/Professor/:id")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        ProfessorController.getProfessorById
    )

router
    .route("/Professors")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        ProfessorController.getAllProfessors
    );

export default router;
