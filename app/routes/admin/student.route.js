import express from "express";
import StudentController from "../../controllers/admin/student.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();

router
    .route("/admin/student")
    .post(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.create
    );

router
    .route("/admin/student/:id")
    .put([Auth.isAuthenticated, RoleHandler.isAdmin], StudentController.update)
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.getStudentById
    )
    .delete(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.delete
    );

router
    .route("/admin/students")
    .get(
        [Auth.isAuthenticated, RoleHandler.isAdmin],
        StudentController.getAllStudents
    );

export default router;
