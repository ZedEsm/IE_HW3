import express from "express";
import StudentController from "../../controllers/admin/student.controller.js";
import Auth from "../../middlewares/authentication.js";
import RoleHandler from "../../middlewares/role.handler.js";

const router = express.Router();


router
    .route("/student/:id")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        StudentController.getStudentById
    )

router
    .route("/students")
    .get(
        [Auth.isAuthenticated, RoleHandler.isManager],
        StudentController.getAllStudents
    );

export default router;
