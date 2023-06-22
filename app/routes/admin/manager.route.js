import express from "express";
import StudentController from "../../controllers/admin/manager.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/admin/manager")
    .post(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.create
    );

router
    .route("/admin/manager/:id")
    .put([Auth.isAuthenticated, RoleHandler.isAdmin], StudentController.update)
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.getEducationManagerById
    )
    .delete(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.delete
    );

router
    .route("/admin/managers")
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.getAllEducationManagers
    );

export default router;
