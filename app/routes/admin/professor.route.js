import express from "express";
import ProfessorController from "../../controllers/admin/professor.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/admin/Professor")
    .post(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        ProfessorController.create
    );

router
    .route("/admin/Professor/:id")
    .put(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        ProfessorController.update
    )
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        ProfessorController.getProfessorById
    )
    .delete(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        ProfessorController.delete
    );

router
    .route("/admin/Professors")
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        ProfessorController.getAllProfessors
    );

export default router;
